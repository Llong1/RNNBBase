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
import Constants from "../Constants";
export var makeHeaders = function (pros) {
    if (pros === void 0) { pros = DefualtHeaders; }
    var headers = {};
    return pros ? Object.assign(Object.assign(headers, DefualtHeaders), pros) : Object.assign(headers, DefualtHeaders);
};
export var DefualtHeaders = {
    'Content-Type': 'application/json;charset=UTF-8',
    'Transfer-Encoding': 'chunked',
    'Content-Encoding': 'gzip',
    Vary: 'Accept-Encoding',
    Server: 'jar'
};
export var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["SUCCESS"] = 1000] = "SUCCESS";
    StatusCode[StatusCode["FAIL"] = 1001] = "FAIL";
    StatusCode[StatusCode["SYS_BUSY"] = 1002] = "SYS_BUSY";
    StatusCode[StatusCode["UNLOGIN"] = 1003] = "UNLOGIN";
    StatusCode[StatusCode["PARAMINVALID"] = 1004] = "PARAMINVALID"; //参数错误
})(StatusCode || (StatusCode = {}));
export var makeRequest = function (api, params, method, headers) {
    if (params === void 0) { params = {}; }
    if (method === void 0) { method = 'GET'; }
    if (headers === void 0) { headers = {}; }
};
export var postUploadFile = function (api, files, headers) {
    if (headers === void 0) { headers = { 'Content-Type': 'multipart/form-data' }; }
    var forms = new FormData();
    for (var name in files) {
        forms.append(name, files[name]);
    }
    var hds = __assign({ 'Content-Type': 'multipart/form-data' }, headers);
    if (Constants.isDebug) {
        console.log('文件上传：', api, files, hds);
    }
    var instance = Axios.create({
        headers: hds,
        timeout: 600000
    });
    return instance.post(api.startsWith('http') ? api : Constants.BaseDomain + "/" + api, forms, {
        headers: hds,
        timeout: 600000
    }).then(function (v) { return v.data; });
};
