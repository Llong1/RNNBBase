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
import { AsyncStorage } from "react-native";
import { nbConfig_Gateway_key } from "../config";
export var nbDefaultGateway = {
    gwUserInfo: "/api/user/info",
    gwInstantSendMsg: "/api/mqtt/msg",
    gwUserLogin: "/common/login",
    gwUserRegister: "/common/register",
    gwFetchSms: '/common/message/code',
    gwInstantUserList: '/api/communication/user/list',
    gwInstantMsgList: '/api/communication/history/list',
    gwUploadImage: '/common/upload/file'
};
var NBGateway = /** @class */ (function () {
    function NBGateway() {
    }
    NBGateway.getGateway = function () {
        return AsyncStorage.getItem(nbConfig_Gateway_key).then(function (s) {
            if (s) {
                return JSON.parse(s);
            }
            return __assign({}, nbDefaultGateway);
        });
    };
    NBGateway.setGateway = function (conf) {
        return AsyncStorage.setItem(nbConfig_Gateway_key, JSON.stringify(Object.assign(__assign({}, nbDefaultGateway), conf))).then(function () { return true; });
    };
    return NBGateway;
}());
export { NBGateway };
