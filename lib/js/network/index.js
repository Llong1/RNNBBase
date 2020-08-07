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
import { StatusCode, NBGateway } from "../api";
import Constants from "../Constants";
import { showError, nbLog } from "../util";
export * from "./HeaderManager";
export * from "./JsonApi";
export var createAxiosClient = function (method, config, headers) {
    if (method === void 0) { method = 'GET'; }
    return HeaderManager.getHeaders().then(function (h) {
        var conf = {
            baseURL: Constants.BaseDomain,
            method: method, headers: h ? __assign(__assign({}, h), headers) : __assign({}, headers)
        };
        if (config) {
            if (config.headers) {
                conf.headers = __assign(__assign({}, conf.headers), config.headers);
            }
            for (var name in config) {
                if (name === 'heders')
                    continue;
                conf[name] = config[name];
            }
        }
        nbLog('网络模块', '创建HTTP实例', conf);
        return Axios.create(conf);
    })["catch"](function (err) {
        nbLog('网络模块', '创建HTTP实例失败', err);
        return Axios.create(Object.assign({ method: method, headers: headers }, config));
    });
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
export var nbFileUpload = function (file, onUploadProgress, fieldName, conf) {
    return NBGateway.getGateway().then(function (c) {
        var formData = new FormData();
        var f = Object.assign({ type: 'application/octet-stream' }, file);
        if (f.name === undefined) {
            f.name = file.uri.substring(file.uri.lastIndexOf('/') + 1);
        }
        formData.append(fieldName === undefined ? 'file' : fieldName, f);
        return createAxiosClient('post', __assign({ timeout: 600000, onUploadProgress: onUploadProgress }, conf), {
            "Content-Type": "multipart/form-data"
        }).then(function (a) {
            return a({
                url: c.gwUploadImage, data: formData
            });
        });
    }).then(nbFilterResponse).then(function (r) { return r.result; });
};
