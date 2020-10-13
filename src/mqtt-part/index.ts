import Axios from "axios";
import { EventEmitter } from 'events';
import { EmitterSubscription, NativeEventEmitter, DeviceEventEmitter, NativeModules, Platform } from "react-native";
import Constants from "../Constants";
import { isEmptyObj, randomInt, showError, nbLog, isJsonString } from "../util";
import { InstantOptions, InstantMessage, InstantMessageEntity, InstantMessageEvent, MqttClientOptions, MqttConnectionOptions, MqttMessage } from "./types";
import { NBUserID, nbUserMemCache } from "../user";
import { NBGateway, ResponseModel, StatusCode } from "../api";
import { createAxiosClient, nbFilterResponse } from "../network";
import NBCompApp from "../components/NBCompApp";
import { NBPages } from "../components/types";
import moment from "moment";
import { Toast } from "native-base";
import NBBaseCtx from "../NBBaseCxt";

export * from "./types";
export * from "./InstantsApis";

const { NBBaseMQTTModule } = NativeModules;
const eventEmitter = new NativeEventEmitter(NBBaseMQTTModule);

export class MqttClient {
    private options: MqttClientOptions;
    constructor(options: MqttClientOptions) {
        this.options = {
            ...options,
            clientId: options.clientId === undefined ? `${Platform.OS}-${Platform.Version}-${randomInt(1, 99)}-${randomInt(100, 200000)}` : options.clientId
        };
    }

    public connect(ops?: MqttConnectionOptions): Promise<boolean> {
        let opss: any = { cleanSession: true, connectionTimeout: 10, keepAliveInterval: 20 };
        if (Constants.isDebug) {
            console.log('MQTTClient - Connect', this.options, ops);
        }
        return NBBaseMQTTModule.connectServer(this.options.serverUri, this.options.clientId || "", Object.assign(opss, ops === undefined ? {} : ops))
    }

    public publish(topic: string, msg: string, qos?: number, retained?: boolean): Promise<boolean> {
        if (Constants.isDebug) {
            console.log('MQTTClient - publish', this.options, topic, msg, qos, retained);
        }
        return NBBaseMQTTModule.publish(this.options.serverUri, this.options.clientId || "", topic, msg, qos === undefined ? 2 : qos, retained === undefined ? false : retained);
    }

    public subscribe(topic: string, qos?: number): Promise<boolean> {
        if (Constants.isDebug) {
            console.log('MQTTClient - subscribe', this.options, topic, qos);
        }
        return NBBaseMQTTModule.subscribe(this.options.serverUri, this.options.clientId || "", topic, qos === undefined ? 2 : qos);
    }

    public disconnect(): Promise<boolean> {
        if (Constants.isDebug) {
            console.log('MQTTClient - disconnect', this.options);
        }
        return NBBaseMQTTModule.disConnectServer(this.options.serverUri, this.options.clientId || "");
    }

    public isConencted(): Promise<boolean> {
        if (Constants.isDebug) {
            console.log('MQTTClient - isConencted', this.options);
        }

        return NBBaseMQTTModule.isConnected(this.options.serverUri, this.options.clientId || "");
    }

    public addListener(listener: (msg: MqttMessage) => void) {
        return eventEmitter.addListener('mqttMessage', listener);
    }
}

/**
 * 即时通讯client
 */
export class InstantMqttClient {
    private prefix?: string;
    private mqttClient?: MqttClient;
    private userId?: any;
    private isLogin?: boolean;
    private messageEmitter: EventEmitter;
    private instantOptions?: InstantOptions;
    private clientSub?: EmitterSubscription;
    public focusUserID?: NBUserID;
    constructor(options: MqttClientOptions, instantOptions?: InstantOptions, prefix?: string) {
        this.mqttClient = new MqttClient(options);
        this.prefix = prefix === undefined ? '' : prefix;
        this.messageEmitter = new EventEmitter();
        this.instantOptions = instantOptions;

        NBBaseCtx.defaultInstantClient = NBBaseCtx.defaultInstantClient || this;
    }

    public setHttpOptions(op: InstantOptions) {
        this.instantOptions = Object.assign(this.instantOptions || {}, op);
    }

    /**
     * 登录账户ID
     * @param userId 
     * @param options 
     */
    public login(userId: any, options?: MqttConnectionOptions): Promise<boolean> {
        this.userId = userId;
        if (this.clientSub) {
            this.clientSub.remove();
            this.clientSub = undefined;
        }
        this.clientSub = this.mqttClient.addListener(this.onMessage.bind(this));
        return this.mqttClient.isConencted().then(is => {
            return is ? this.mqttClient.subscribe(`${this.prefix === undefined ? '' : this.prefix}user_${this.userId}`).then(() => {
                this.isLogin = true;
                nbLog('即时通讯库', '建立通道成功：', this.userId);
                DeviceEventEmitter.emit('OnInstantLoginSuccess', this.userId);
                return Promise.resolve(true);
            }) : this.mqttClient.connect(options)
        });
    }

    public logout() {
        this.userId = undefined;
        if (this.clientSub) {
            this.clientSub.remove();
            this.clientSub = undefined;
        }

        if (NBBaseCtx.defaultInstantClient === this) {
            NBBaseCtx.defaultInstantClient = undefined;
        }
        return this.mqttClient.disconnect();
    }

    public sendMessage(toUserId: NBUserID, entity: InstantMessageEntity, userName?: string): Promise<boolean> {
        const msg: InstantMessage = {
            fromId: this.userId,
            toId: toUserId,
            pubtime: moment().format('YYYY-MM-DD HH:mm:ss'),
            msg: entity
        }

        if (userName) {
            msg.userName = userName;
        } else {
            if (nbUserMemCache.currentUser) {
                msg.userName = nbUserMemCache.currentUser.userName;
            }
        }

        const params = {
            toUserId: toUserId,
            msgType: 'chat',
            msgContentType: entity.msgType || 'text',
            message: JSON.stringify(msg)
        };
        return NBGateway.getGateway().then(v => {
            nbLog('即时通讯库', '准备发送消息', params);
            return createAxiosClient('POST').then(a => a({
                url: `${Constants.BaseDomain}${v.gwInstantSendMsg}`,
                params
            }))
        }).then(nbFilterResponse).then(r => {
            nbLog('即时通讯库', '发送消息成功', params);
            return true;
        });
    }

    public addInstantListener(event: InstantMessageEvent, listener: (msg: InstantMessage | any) => void): EmitterSubscription {
        return DeviceEventEmitter.addListener(event, listener);
    }

    private showAppNotice(m: InstantMessage) {
        if (nbUserMemCache.currentUser === undefined || nbUserMemCache.currentUser === null || (nbUserMemCache.currentUser && nbUserMemCache.currentUser.id == m.fromId)) {
            nbLog('即时通讯库', '忽略APP内部提醒', m);
            return;
        }
        if (this.instantOptions === undefined || (this.instantOptions && (this.instantOptions.showAppNotice === undefined || this.instantOptions.showAppNotice))) {
            if (this.focusUserID !== undefined) {
                if (this.focusUserID === m.fromId) {
                    nbLog('即时通讯库', '正在关注当前用户，忽略提醒', m);
                    return;
                }
            }

            Toast.show({
                text: m.msg.msgType === 'text' ? `${m.userName ? m.userName + ':' : ''}${m.msg.content}` : '未知消息类型',
                buttonText: '去查看',
                buttonTextStyle: { color: "#FFF" },
                buttonStyle: { backgroundColor: "#FB6D3A" },
                duration: 3000,
                position: 'top',
                onClose: (r) => {
                    switch (r) {
                        case 'user':
                            this.focusUserID = m.fromId;
                            NBCompApp.navigation.navigate(NBPages.InstantPage, {
                                instantUser: {
                                    userId: m.fromId,
                                    userName: m.userName
                                },
                                instantClient: this
                            })
                            break;
                    }
                }
            })
        } else {

        }
    }

    private showNotifaction(m: InstantMessage) {

    }

    private responseMessage(msg: MqttMessage) {
        nbLog('即时通讯库', 'MQTT 原始数据', msg);
        if (isJsonString(msg.message)) {
            const m: InstantMessage = JSON.parse(msg.message);
            if (m && m.fromId && m.toId && m.msg && m.msg.content) {
                nbLog('即时通讯库', '即时通讯 原始数据', m);
                DeviceEventEmitter.emit('OnInstantReceiveMessage', m);
                this.showAppNotice(m);
                this.showNotifaction(m);
            } else {
                DeviceEventEmitter.emit('OnInstantReceiveUnknowMessage', m);
            }
        } else {
            DeviceEventEmitter.emit('OnInstantReceiveUnknowMessage', msg.message);
        }
    }

    private onMessage(msg: MqttMessage) {
        switch (msg.msgType) {
            case 'connectSuccess':
                this.mqttClient.subscribe(`${this.prefix === undefined ? '' : this.prefix}user_${this.userId}`).then(() => {
                    this.isLogin = true;
                    nbLog('即时通讯库', '建立通道成功：', this.userId);
                    DeviceEventEmitter.emit('OnInstantLoginSuccess', this.userId);
                })
                break;
            case 'msgArrived':
                this.responseMessage(msg);
                break;
            case 'connectLost':
                nbLog('即时通讯库', '失去链接，重新建立！');
                this.login(this.userId);
                break;
        }
    }
} 