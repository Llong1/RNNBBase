import XPay from 'react-native-puti-pay';
import { Platform } from 'react-native';
import { init } from "react-native-amap-geolocation";
import { HeaderManager } from "./network";
import AsyncStorage from '@react-native-community/async-storage';
import { nbLog } from './util';
var nbConfigKey = "__nb_config";
var Constants = /** @class */ (function () {
    function Constants() {
    }
    Constants.readLocalConf = function () {
        return AsyncStorage.getItem(nbConfigKey).then(function (s) {
            return s ? JSON.parse(s) : null;
        });
    };
    Constants.setConf = function (cof) {
        return new Promise(function (res, rej) {
            var conf = Object.assign(Constants.config, cof);
            nbLog('NB库常量设置', conf);
            AsyncStorage.setItem(nbConfigKey, JSON.stringify(conf)).then(function () {
                Constants.BaseDomain = conf.baseDomain;
                if (conf.isDebug !== undefined) {
                    Constants.isDebug = conf.isDebug;
                }
                if (conf.alipaySandbox !== undefined) {
                    //支付宝开启沙箱模式 仅限安卓
                    if (Platform.OS === 'android') {
                        XPay.setAlipaySandbox(conf.alipaySandbox);
                    }
                }
                if (conf.headers) {
                    Constants.headers = conf.headers;
                    HeaderManager.updateHeaders(conf.headers);
                }
                if (conf.payWxId !== undefined) {
                    XPay.setWxId(conf.payWxId);
                }
                if (conf.alipayScheme !== undefined) {
                    XPay.setAlipayScheme(conf.alipayScheme);
                }
                if (conf.amapAndroidKey && conf.amapIOSKey) {
                    init({
                        android: conf.amapAndroidKey,
                        ios: conf.amapIOSKey
                    }).then(res)["catch"](rej);
                }
                else {
                    res();
                }
            })["catch"](rej);
        });
    };
    Constants.isDebug = false;
    Constants.headers = {};
    Constants.config = {
        isDebug: __DEV__
    };
    return Constants;
}());
export default Constants;
