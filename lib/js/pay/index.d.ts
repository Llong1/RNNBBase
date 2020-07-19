import { EmitterSubscription } from 'react-native';
import { payType } from "./types";
export * from "./types";
export interface NBPayResult {
    orderInfo: any;
}
export interface NBAlipayResult extends NBPayResult {
    memo: string;
    result?: string;
    resultStatus: string;
    message?: string;
    success: boolean;
}
export declare type NBPayEvent = 'NBPayAlipayResponse' | 'NBPayWxpayResponse';
export declare const payOrder: (orderinfo: any, callback?: Function, type?: payType) => void;
export declare const payAliOrderByEmitter: (orderInfo: string, showNotice?: boolean) => void;
/**
 * 添加
 * @param func
 */
export declare const addAlipayEmitter: (func: (resulte: NBAlipayResult) => void) => EmitterSubscription;
