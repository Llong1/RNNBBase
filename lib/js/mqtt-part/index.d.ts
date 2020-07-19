import { EmitterSubscription } from "react-native";
import { InstantOptions, InstantMessage, InstantMessageEntity, InstantMessageEvent, MqttClientOptions, MqttConnectionOptions, MqttMessage } from "./types";
import { NBUserID } from "../user";
export * from "./types";
export * from "./InstantsApis";
export declare class MqttClient {
    private options;
    constructor(options: MqttClientOptions);
    connect(ops?: MqttConnectionOptions): Promise<boolean>;
    publish(topic: string, msg: string, qos?: number, retained?: boolean): Promise<boolean>;
    subscribe(topic: string, qos?: number): Promise<boolean>;
    disconnect(): Promise<boolean>;
    isConencted(): Promise<boolean>;
    addListener(listener: (msg: MqttMessage) => void): EmitterSubscription;
}
/**
 * 即时通讯client
 */
export declare class InstantMqttClient {
    private prefix?;
    private mqttClient?;
    private userId?;
    private isLogin?;
    private messageEmitter;
    private instantOptions?;
    private clientSub?;
    focusUserID?: NBUserID;
    constructor(options: MqttClientOptions, instantOptions?: InstantOptions, prefix?: string);
    setHttpOptions(op: InstantOptions): void;
    /**
     * 登录账户ID
     * @param userId
     * @param options
     */
    login(userId: any, options?: MqttConnectionOptions): Promise<boolean>;
    logout(): Promise<boolean>;
    sendMessage(toUserId: NBUserID, entity: InstantMessageEntity, userName?: string): Promise<boolean>;
    addInstantListener(event: InstantMessageEvent, listener: (msg: InstantMessage | any) => void): EmitterSubscription;
    private showAppNotice;
    private showNotifaction;
    private responseMessage;
    private onMessage;
}
