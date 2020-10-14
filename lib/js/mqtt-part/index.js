var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import moment from "moment";
import { Toast } from "native-base";
import { DeviceEventEmitter, NativeEventEmitter, NativeModules, Platform } from "react-native";
import { NBGateway } from "../api";
import NBCompApp from "../components/NBCompApp";
import { NBPages } from "../components/types";
import Constants from "../Constants";
import NBBaseCtx from "../NBBaseCxt";
import { createAxiosClient, nbFilterResponse } from "../network";
import { nbUserMemCache } from "../user";
import { isJsonString, nbLog, randomInt } from "../util";
export * from "./InstantsApis";
export * from "./tools";
var NBBaseMQTTModule = NativeModules.NBBaseMQTTModule;
var eventEmitter = new NativeEventEmitter(NBBaseMQTTModule);
var MqttClient = /** @class */ (function () {
    function MqttClient(options) {
        this.options = __assign(__assign({}, options), { clientId: options.clientId === undefined ? Platform.OS + "-" + Platform.Version + "-" + randomInt(1, 99) + "-" + randomInt(100, 200000) : options.clientId });
    }
    MqttClient.prototype.connect = function (ops) {
        var opss = { cleanSession: true, connectionTimeout: 10, keepAliveInterval: 20 };
        if (Constants.isDebug) {
            console.log('MQTTClient - Connect', this.options, ops);
        }
        return NBBaseMQTTModule.connectServer(this.options.serverUri, this.options.clientId || "", Object.assign(opss, ops === undefined ? {} : ops));
    };
    MqttClient.prototype.publish = function (topic, msg, qos, retained) {
        if (Constants.isDebug) {
            console.log('MQTTClient - publish', this.options, topic, msg, qos, retained);
        }
        return NBBaseMQTTModule.publish(this.options.serverUri, this.options.clientId || "", topic, msg, qos === undefined ? 2 : qos, retained === undefined ? false : retained);
    };
    MqttClient.prototype.subscribe = function (topic, qos) {
        if (Constants.isDebug) {
            console.log('MQTTClient - subscribe', this.options, topic, qos);
        }
        return NBBaseMQTTModule.subscribe(this.options.serverUri, this.options.clientId || "", topic, qos === undefined ? 2 : qos);
    };
    MqttClient.prototype.disconnect = function () {
        if (Constants.isDebug) {
            console.log('MQTTClient - disconnect', this.options);
        }
        return NBBaseMQTTModule.disConnectServer(this.options.serverUri, this.options.clientId || "");
    };
    MqttClient.prototype.isConencted = function () {
        if (Constants.isDebug) {
            console.log('MQTTClient - isConencted', this.options);
        }
        return NBBaseMQTTModule.isConnected(this.options.serverUri, this.options.clientId || "");
    };
    MqttClient.prototype.addListener = function (listener) {
        return eventEmitter.addListener('mqttMessage', listener);
    };
    return MqttClient;
}());
export { MqttClient };
/**
 * 即时通讯client
 */
var InstantMqttClient = /** @class */ (function () {
    function InstantMqttClient(options, instantOptions, prefix) {
        this.mqttClient = new MqttClient(options);
        this.prefix = prefix === undefined ? '' : prefix;
        // this.messageEmitter = new EventEmitter();
        this.instantOptions = instantOptions;
        // NBBaseCtx.defaultInstantClient = NBBaseCtx.defaultInstantClient || this;
        NBCompApp.configInstant(this);
    }
    InstantMqttClient.prototype.setHttpOptions = function (op) {
        this.instantOptions = Object.assign(this.instantOptions || {}, op);
    };
    /**
     * 登录账户ID
     * @param userId
     * @param options
     */
    InstantMqttClient.prototype.login = function (userId, options) {
        var _this = this;
        this.userId = userId;
        if (this.clientSub) {
            this.clientSub.remove();
            this.clientSub = undefined;
        }
        this.clientSub = this.mqttClient.addListener(this.onMessage.bind(this));
        return this.mqttClient.isConencted().then(function (is) {
            return is ? _this.mqttClient.subscribe((_this.prefix === undefined ? '' : _this.prefix) + "user_" + _this.userId).then(function () {
                _this.isLogin = true;
                nbLog('即时通讯库', '建立通道成功：', _this.userId);
                DeviceEventEmitter.emit('OnInstantLoginSuccess', _this.userId);
                return Promise.resolve(true);
            }) : _this.mqttClient.connect(options);
        });
    };
    InstantMqttClient.prototype.logout = function () {
        this.userId = undefined;
        if (this.clientSub) {
            this.clientSub.remove();
            this.clientSub = undefined;
        }
        if (NBBaseCtx.defaultInstantClient === this) {
            NBBaseCtx.defaultInstantClient = undefined;
        }
        return this.mqttClient.disconnect();
    };
    InstantMqttClient.prototype.sendMessage = function (toUserId, entity, userName) {
        var msg = {
            fromId: this.userId,
            toId: toUserId,
            pubtime: moment().format('YYYY-MM-DD HH:mm:ss'),
            msg: entity
        };
        if (userName) {
            msg.userName = userName;
        }
        else {
            if (nbUserMemCache.currentUser) {
                msg.userName = nbUserMemCache.currentUser.userName;
            }
        }
        var params = {
            toUserId: toUserId,
            msgType: 'chat',
            msgContentType: entity.msgType || 'text',
            message: JSON.stringify(msg)
        };
        return NBGateway.getGateway().then(function (v) {
            nbLog('即时通讯库', '准备发送消息', params);
            return createAxiosClient('POST').then(function (a) { return a({
                url: "" + Constants.BaseDomain + v.gwInstantSendMsg,
                params: params
            }); });
        }).then(nbFilterResponse).then(function (r) {
            nbLog('即时通讯库', '发送消息成功', params);
            return true;
        });
    };
    InstantMqttClient.prototype.addInstantListener = function (event, listener) {
        return DeviceEventEmitter.addListener(event, listener);
    };
    InstantMqttClient.prototype.showAppNotice = function (m) {
        var _this = this;
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
                text: m.msg.msgType === 'text' ? "" + (m.userName ? m.userName + ':' : '') + m.msg.content : '未知消息类型',
                buttonText: '去查看',
                buttonTextStyle: { color: "#FFF" },
                buttonStyle: { backgroundColor: "#FB6D3A" },
                duration: 3000,
                position: 'top',
                onClose: function (r) {
                    switch (r) {
                        case 'user':
                            _this.focusUserID = m.fromId;
                            NBCompApp.navigation.navigate(NBPages.InstantPage, {
                                instantUser: {
                                    userId: m.fromId,
                                    userName: m.userName
                                },
                                instantClient: _this
                            });
                            break;
                    }
                }
            });
        }
        else {
        }
    };
    InstantMqttClient.prototype.showNotifaction = function (m) {
    };
    InstantMqttClient.prototype.responseMessage = function (msg) {
        nbLog('即时通讯库', 'MQTT 原始数据', msg);
        if (isJsonString(msg.message)) {
            var m = JSON.parse(msg.message);
            if (m && m.fromId && m.toId && m.msg && m.msg.content) {
                nbLog('即时通讯库', '即时通讯 原始数据', m);
                DeviceEventEmitter.emit('OnInstantReceiveMessage', m);
                this.showAppNotice(m);
                this.showNotifaction(m);
            }
            else {
                DeviceEventEmitter.emit('OnInstantReceiveUnknowMessage', m);
            }
        }
        else {
            DeviceEventEmitter.emit('OnInstantReceiveUnknowMessage', msg.message);
        }
    };
    InstantMqttClient.prototype.onMessage = function (msg) {
        var _this = this;
        switch (msg.msgType) {
            case 'connectSuccess':
                this.mqttClient.subscribe((this.prefix === undefined ? '' : this.prefix) + "user_" + this.userId).then(function () {
                    _this.isLogin = true;
                    nbLog('即时通讯库', '建立通道成功：', _this.userId);
                    DeviceEventEmitter.emit('OnInstantLoginSuccess', _this.userId);
                });
                break;
            case 'msgArrived':
                this.responseMessage(msg);
                break;
            case 'connectLost':
                nbLog('即时通讯库', '失去链接，重新建立！');
                this.login(this.userId);
                break;
        }
    };
    return InstantMqttClient;
}());
export { InstantMqttClient };
