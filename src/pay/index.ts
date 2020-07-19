import { DeviceEventEmitter, EmitterSubscription } from 'react-native';
import XPay from 'react-native-puti-pay';
import { showError, showMsg } from '../util';
import { payType } from "./types";

export * from "./types";

export interface NBPayResult {
    orderInfo: any
}

export interface NBAlipayResult extends NBPayResult {
    memo: string,
    result?: string,
    resultStatus: string,
    message?: string,
    success: boolean
}

export type NBPayEvent = 'NBPayAlipayResponse' | 'NBPayWxpayResponse';

export const payOrder = (orderinfo: any, callback: Function = (res: any) => console.log(res), type: payType = 'alipay') => {
    if (type === 'alipay') {
        XPay.alipay(orderinfo, callback)
    } else if (type === 'wxpay') {
        XPay.wxPay(orderinfo, callback)
    }
}

export const payAliOrderByEmitter = (orderInfo: string, showNotice?: boolean) => {
    XPay.alipay(orderInfo, (info: {
        memo: string,
        result?: string,
        resultStatus: string
    }) => {
        const message = info.resultStatus === '9000' ? JSON.parse(info.result!) : (info.resultStatus === '6001' ? '取消支付' : info.memo);
        if (info.resultStatus !== '9000' && (showNotice === undefined || showNotice)) {
            showError(info.resultStatus === '6001' ? '取消支付' : (info.memo && typeof info.memo === 'string'? info.memo: ''));
        }
        if (info.resultStatus === '9000' && (showNotice === undefined || showNotice)) {
            showMsg('支付成功！');
        }
        DeviceEventEmitter.emit('NBPayAlipayResponse', {
            ...info,
            orderInfo,
            success: info.resultStatus === '9000',
            message
        })
    })
}

/**
 * 添加
 * @param func 
 */
export const addAlipayEmitter = (func: (resulte: NBAlipayResult) => void): EmitterSubscription => {
    return DeviceEventEmitter.addListener('NBPayAlipayResponse', func);
}