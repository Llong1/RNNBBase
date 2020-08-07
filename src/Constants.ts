import XPay from 'react-native-puti-pay';
import { Platform } from 'react-native';
import { init } from "react-native-amap-geolocation";
import { HeaderManager } from "./network";
import { NBConfig } from "./models";
import AsyncStorage from '@react-native-community/async-storage';
import { nbLog } from './util';

const nbConfigKey = "__nb_config";

export default class Constants {
    public static BaseDomain?: string;
    public static isDebug: boolean = false;
    public static headers?: any = {};
    public static config?: NBConfig = {
        isDebug: __DEV__
    };

    public static readLocalConf(): Promise<NBConfig | null> {
        return AsyncStorage.getItem(nbConfigKey).then(s => {
            return s ? JSON.parse(s) : null;
        })
    }

    public static setConf(cof: NBConfig): Promise<void> {
        if (cof.baseDomain !== undefined) {
            Constants.BaseDomain = cof.baseDomain;
        }
        return new Promise((res, rej) => {
            const conf: NBConfig = Object.assign(Constants.config, cof);
            nbLog('NB库常量设置', conf);
            AsyncStorage.setItem(nbConfigKey, JSON.stringify(conf)).then(() => {
                if (conf.isDebug !== undefined) {
                    Constants.isDebug = conf.isDebug;
                }

                if (conf.alipaySandbox !== undefined) {
                    //支付宝开启沙箱模式 仅限安卓
                    if (Platform.OS === 'android') {
                        XPay.setAlipaySandbox(conf.alipaySandbox)
                    }
                }

                if (conf.headers) {
                    Constants.headers = conf.headers;
                    HeaderManager.updateHeaders(conf.headers);
                }

                if (conf.payWxId !== undefined) {
                    XPay.setWxId(conf.payWxId)
                }

                if (conf.alipayScheme !== undefined) {
                    XPay.setAlipayScheme(conf.alipayScheme)
                }

                if (conf.amapAndroidKey && conf.amapIOSKey) {
                    init({
                        android: conf.amapAndroidKey,
                        ios: conf.amapIOSKey
                    }).then(res).catch(rej);
                } else {
                    res();
                }
            }).catch(rej);
        })
    }
}