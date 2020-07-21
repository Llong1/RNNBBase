import { AsyncStorage } from "react-native";
import { nbConfig_Gateway_key } from "../config";
import Constants from "../Constants";

export interface GatewayConfig {
    gwUserInfo?: string,
    gwInstantSendMsg?: string,
    gwUserLogin?: string,
    gwUserRegister?: string,
    gwFetchSms?: string,
    gwInstantUserList?: string,
    gwInstantMsgList?: string,
    gwUploadImage?: string,
}

export const nbDefaultGateway: GatewayConfig = {
    gwUserInfo: `/api/user/info`,
    gwInstantSendMsg: `/api/mqtt/msg`,
    gwUserLogin: `/common/login`,
    gwUserRegister: `/common/register`,
    gwFetchSms: '/common/message/code',
    gwInstantUserList: '/api/communication/user/list',
    gwInstantMsgList: '/api/communication/history/list',
    gwUploadImage: '/common/upload/file'
}

export class NBGateway {
    public static getGateway(): Promise<GatewayConfig> {
        return AsyncStorage.getItem(nbConfig_Gateway_key).then(s => {
            if (s) {
                return JSON.parse(s);
            }

            return {
                ...nbDefaultGateway
            }
        })
    }

    public static setGateway(conf: GatewayConfig): Promise<boolean> {
        return AsyncStorage.setItem(nbConfig_Gateway_key, JSON.stringify(Object.assign({ ...nbDefaultGateway }, conf))).then(() => true);
    }
}