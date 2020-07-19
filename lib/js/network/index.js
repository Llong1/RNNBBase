import Axios from "axios";
import { HeaderManager } from "./HeaderManager";
import { StatusCode } from "../api";
import Constants from "../Constants";
import { showError, nbLog } from "../util";
export * from "./HeaderManager";
export var createAxiosClient = function (method, config, headers) {
    if (method === void 0) { method = 'GET'; }
    return headers === undefined ? HeaderManager.getHeaders().then(function (h) {
        nbLog('网络库 本地header设置', h);
        return Promise.resolve(Axios.create(Object.assign({
            method: method, headers: h
        }, config)));
    }) : Promise.resolve(Axios.create(Object.assign({
        method: method, headers: headers
    }, config)));
};
export var nbFilterResponse = function (r, filterError) {
    var rr = r.data;
    if (rr.status.code === StatusCode.SUCCESS) {
        return Promise.resolve(rr);
    }
    else {
        if (filterError !== undefined && filterError) {
            var message = rr.status.message;
            if (Constants.isDebug) {
                message = message + "\uFF0C\u9519\u8BEF\u7801\uFF1A" + rr.status.code;
            }
            showError(message);
        }
        return Promise.reject(rr.status);
    }
};
