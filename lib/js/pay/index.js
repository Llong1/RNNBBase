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
import { DeviceEventEmitter } from 'react-native';
import XPay from 'react-native-puti-pay';
import { showError, showMsg } from '../util';
export var payOrder = function (orderinfo, callback, type) {
    if (callback === void 0) { callback = function (res) { return console.log(res); }; }
    if (type === void 0) { type = 'alipay'; }
    if (type === 'alipay') {
        XPay.alipay(orderinfo, callback);
    }
    else if (type === 'wxpay') {
        XPay.wxPay(orderinfo, callback);
    }
};
export var payAliOrderByEmitter = function (orderInfo, showNotice) {
    XPay.alipay(orderInfo, function (info) {
        var message = info.resultStatus === '9000' ? JSON.parse(info.result) : (info.resultStatus === '6001' ? '取消支付' : info.memo);
        if (info.resultStatus !== '9000' && (showNotice === undefined || showNotice)) {
            showError(info.resultStatus === '6001' ? '取消支付' : (info.memo && typeof info.memo === 'string' ? info.memo : ''));
        }
        if (info.resultStatus === '9000' && (showNotice === undefined || showNotice)) {
            showMsg('支付成功！');
        }
        DeviceEventEmitter.emit('NBPayAlipayResponse', __assign(__assign({}, info), { orderInfo: orderInfo, success: info.resultStatus === '9000', message: message }));
    });
};
/**
 * 添加
 * @param func
 */
export var addAlipayEmitter = function (func) {
    return DeviceEventEmitter.addListener('NBPayAlipayResponse', func);
};
