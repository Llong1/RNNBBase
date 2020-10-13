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
import Axios from "axios";
import { HeaderManager } from "./HeaderManager";
import Constants from "../Constants";
import { showError } from "../util";
/**
 *
 * @param method
 * @param cHeaders
 * @param c
 */
export var createNBNetworkApi = function (method, cHeaders, c) {
    return HeaderManager.getHeaders().then(function (h) {
        var conf = {
            baseURL: Constants.BaseDomain,
            method: method || 'GET', headers: h ? __assign(__assign({}, h), cHeaders) : __assign({}, cHeaders)
        };
        if (c) {
            if (c.headers) {
                conf.headers = __assign(__assign({}, conf.headers), c.headers);
            }
            for (var name in c) {
                if (name === 'heders')
                    continue;
                conf[name] = c[name];
            }
        }
        console.log('网络', '创建网络配置', conf);
        return Axios.create(conf);
    });
};
/**
 * get请求参数拼接
 * @param url
 * @param params
 */
export var appendGetUrl = function (url, params) {
    var u = url;
    if (params) {
        var index = 0;
        for (var name in params) {
            var v = params[name];
            if (v !== undefined) {
                if (index === 0) {
                    u = u + "?" + name + "=" + encodeURIComponent(v);
                }
                else {
                    u = u + "&" + name + "=" + encodeURIComponent(v);
                }
            }
            index++;
        }
    }
    return u;
};
/**
 * api调用
 * @param api
 * @param method
 * @param params
 * @param headers
 */
export function callApi(api, method, params, headers) {
    var _this = this;
    console.log('接口调用', '访问api', api, method, params);
    return createNBNetworkApi(method, headers).then(function (a) {
        if (method) {
            return a({ url: api, method: method, params: params });
        }
        else {
            return a.get(appendGetUrl(api, params));
        }
    }).then(function (r) {
        var d = r.data ? (typeof r.data === 'string' ? JSON.parse(r.data) : r.data) : null;
        if (d) {
            if (d.status) {
                if (d.status.code === 1000) {
                    d = d.result;
                }
                else {
                    var message = d.status.message;
                    if (Constants.isDebug) {
                        message = _this.name + "\uFF1A" + d.status.message + "\uFF0C\u9519\u8BEF\u7801\uFF1A" + d.status.code;
                    }
                    showError(message);
                    return Promise.reject(message);
                }
            }
        }
        return d;
    });
}
