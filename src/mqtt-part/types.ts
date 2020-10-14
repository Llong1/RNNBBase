import { DataModel, AppConfig } from "../models";
import { ReactText } from "react";
import { NBUserID } from "../user";

export interface MqttClientOptions {
    serverUri: string,
    clientId?: string
}

export interface MqttConnectionOptions {
    cleanSession?: boolean,
    connectionTimeout?: number,
    keepAliveInterval?: number,
    userName?: string,
    password?: string
}

export type MqttMessageType = "msgArrived" | "connectSuccess" | "connectLost";

export interface MqttMessage {
    serverUri: string,
    clientId: string,
    message: string,
    msgType: MqttMessageType
}

export type InstantMessageEvent = 'OnInstantLoginSuccess' | 'OnInstantReceiveMessage' | 'OnInstantReceiveUnknowMessage';
export type InstantMessageType = 'text' | 'assets' | 'html';

export type IgnoreInstatnMessage = 'ping heart' | 'response heart';

export interface InstantMessageEntity {
    msgType?: InstantMessageType,
    content?: string
}

export interface InstantMessage {
    fromId: ReactText,
    toId: ReactText,
    msg: InstantMessageEntity,
    pubtime?: string,
    userName?: string
}

export interface InstantOptions {
    showAppNotice?: boolean,
    showNotification?: boolean
}

export interface CommunicationListModel extends DataModel {
    userId: NBUserID,
    userName?: string,
    userLogo?: string,
    content?: string,
    contentType?: InstantMessageType,
    createTime?: string
}

export interface CommunicationHistoryListModel extends DataModel {
    userId: NBUserID,
    userName: string,
    userLogo: string,
    toUserId: number,
    toUserName: string,
    toUserLogo: string,
    content: string,
    contentType: InstantMessageType,
    createTime: string
}

/**
 * 即时通讯 api配置
 */
export interface InstantsApiConfig {
    /**
     * 消息列表查询api
     */
    communicationListApi?: string,
    /**
     * 通讯录列表查询api
     */
    contactListApi?: string,
    /**
     * 历史记录查询api
     */
    historyListApi?: string
}

/**
 * 即时通讯配置
 */
export interface InstantsConfig extends AppConfig {
    apiConfig?: InstantsApiConfig,
}