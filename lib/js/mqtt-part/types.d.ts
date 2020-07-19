import { DataModel } from "../models";
import { ReactText } from "react";
import { NBUserID } from "../user";
export interface MqttClientOptions {
    serverUri: string;
    clientId?: string;
}
export interface MqttConnectionOptions {
    cleanSession?: boolean;
    connectionTimeout?: number;
    keepAliveInterval?: number;
    userName?: string;
    password?: string;
}
export declare type MqttMessageType = "msgArrived" | "connectSuccess" | "connectLost";
export interface MqttMessage {
    serverUri: string;
    clientId: string;
    message: string;
    msgType: MqttMessageType;
}
export declare type InstantMessageEvent = 'OnInstantLoginSuccess' | 'OnInstantReceiveMessage' | 'OnInstantReceiveUnknowMessage';
export declare type InstantMessageType = 'text' | 'assets' | 'html';
export declare type IgnoreInstatnMessage = 'ping heart' | 'response heart';
export interface InstantMessageEntity {
    mstType?: InstantMessageType;
    content?: string;
}
export interface InstantMessage {
    fromId: ReactText;
    toId: ReactText;
    msg: InstantMessageEntity;
    pubtime?: string;
    userName?: string;
}
export interface InstantOptions {
    showAppNotice?: boolean;
    showNotification?: boolean;
}
export interface CommunicationListModel extends DataModel {
    userId: NBUserID;
    userName?: string;
    userLogo?: string;
    content?: string;
    contentType?: InstantMessageType;
    createTime?: string;
}
export interface CommunicationHistoryListModel extends DataModel {
    userId: NBUserID;
    userName: string;
    userLogo: string;
    toUserId: number;
    toUserName: string;
    toUserLogo: string;
    content: string;
    contentType: InstantMessageType;
    createTime: string;
}
