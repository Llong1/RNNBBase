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
import { DefualtHeaders } from "./types";
import Axios from "axios";
import { HeaderManager } from "../network";
import { showError } from "../util";
import Constants from "../Constants";
var BaseRequest = /** @class */ (function () {
    function BaseRequest(pros) {
        this.cacheStore = null;
        this.method = 'GET';
        this.timeout = 5000;
        this.responseType = 'json';
        if (pros !== undefined && pros !== null) {
            if (pros.headers) {
                this.headers = Object.assign(DefualtHeaders, pros.headers);
            }
            else {
                this.headers = DefualtHeaders;
            }
            if (pros.baseHost !== undefined) {
                this.baseHost = pros.baseHost;
            }
            else {
                this.baseHost = Constants.BaseDomain;
            }
            if (pros.method) {
                this.method = pros.method;
            }
            if (pros.timeout) {
                this.timeout = pros.timeout;
            }
        }
        else {
            this.baseHost = Constants.BaseDomain;
            this.headers = DefualtHeaders;
        }
        this.initRequest();
    }
    BaseRequest.prototype.request = function (req) {
        var _this = this;
        var self = this;
        if (this.baseHost === undefined || this.baseHost === null || this.baseHost === '') {
            if (Constants.BaseDomain) {
                this.baseHost = Constants.BaseDomain;
            }
        }
        return Promise.resolve(this.baseHost ? this.baseHost : Constants.readLocalConf().then(function (c) { return c.baseDomain; })).then(function (baseHost) {
            if (!baseHost)
                return Promise.reject('未设置有效的根域名！');
            _this.baseHost = baseHost;
            return new Promise(function (res, rej) {
                var params = req || {};
                if (self.cacheStore) {
                    self.cacheStore.read(params).then(function (v) {
                        if (v) {
                            res(v);
                        }
                        else {
                            HeaderManager.getHeaders()
                                .then(function (h) {
                                self.headers = __assign(__assign({}, h), self.headers);
                                var p = self.build(params);
                                if (Constants.isDebug) {
                                    console.log(_this.name, '准备请求：', p);
                                }
                                Axios.request(p)
                                    .then(function (v) {
                                    self.resolveData(params, v.data, res, rej);
                                })["catch"](rej);
                            })["catch"](function (err) {
                                var p = self.build(params);
                                if (Constants.isDebug) {
                                    console.log(_this.name, '准备请求：', p);
                                }
                                Axios.request(p)
                                    .then(function (v) {
                                    self.resolveData(params, v.data, res, rej);
                                })["catch"](rej);
                            });
                        }
                    });
                }
                else {
                    HeaderManager.getHeaders()
                        .then(function (h) {
                        self.headers = __assign(__assign({}, h), self.headers);
                        var p = self.build(params);
                        if (Constants.isDebug) {
                            console.log(_this.name, '准备请求：', p);
                        }
                        Axios.request(p)
                            .then(function (v) {
                            self.resolveData(params, v.data, res, rej);
                        })["catch"](rej);
                    })["catch"](function (err) {
                        var p = self.build(params);
                        if (Constants.isDebug) {
                            console.log(_this.name, '准备请求：', p);
                        }
                        Axios.request(p)
                            .then(function (v) {
                            self.resolveData(params, v.data, res, rej);
                        })["catch"](rej);
                    });
                }
            });
        });
    };
    BaseRequest.prototype.resolveData = function (req, r, res, rej) {
        if (r.status.code === 1000) {
            res(r.result);
            this.onData(req, r.result);
        }
        else {
            var message = r.status.message;
            if (Constants.isDebug) {
                message = this.name + "\uFF1A" + r.status.message + "\uFF0C\u9519\u8BEF\u7801\uFF1A" + r.status.code;
            }
            showError(message);
            rej(message);
            this.onRespError(r);
        }
    };
    BaseRequest.prototype.onData = function (req, d) {
        if (d) {
            if (this.cacheStore) {
                this.cacheStore.save(req, d);
            }
        }
    };
    BaseRequest.prototype.onRespError = function (r) {
        console.log(this.name, r.status);
    };
    BaseRequest.prototype.build = function (req) {
        var conf = {};
        if (this.api) {
            if (this.api.startsWith('http')) {
                conf.url = this.api;
            }
            else {
                if (this.baseHost.endsWith('/')) {
                    conf.url = "" + this.baseHost + this.api;
                }
                else {
                    if (this.api.startsWith('/')) {
                        conf.url = "" + this.baseHost + this.api;
                    }
                    else {
                        conf.url = this.baseHost + "/" + this.api;
                    }
                }
            }
        }
        else {
            throw new Error('无效的请求链接！');
        }
        this.setupHeaders(conf, Constants.headers);
        this.setupHeaders(conf, this.headers);
        this.setupHeaders(conf, req._headers);
        conf.method = this.method;
        conf.responseType = this.responseType;
        conf.timeout = this.timeout;
        this.appendParams(conf, req);
        return conf;
    };
    BaseRequest.prototype.appendParams = function (conf, req) {
        var _a;
        if (req) {
            if (this.method === 'GET' || this.method === 'get') {
                var url = ((_a = conf.url) === null || _a === void 0 ? void 0 : _a.endsWith('?')) ? conf.url : conf.url + "?";
                var i = 0;
                for (var name in req) {
                    if (name === '_headers')
                        continue;
                    var v = req[name];
                    if (v) {
                        if (i > 0) {
                            url = url + "&" + name + "=" + decodeURIComponent(v);
                        }
                        else {
                            url = "" + url + name + "=" + decodeURIComponent(v);
                        }
                        i++;
                    }
                }
                conf.url = url;
            }
            else {
                var params = {};
                for (var name in req) {
                    if (name === '_headers')
                        continue;
                    var v = req[name];
                    if (v) {
                        params[name] = v;
                    }
                }
                conf.params = params;
            }
        }
    };
    BaseRequest.prototype.setupHeaders = function (conf, headers) {
        if (headers) {
            if (conf.headers) {
                conf.headers = __assign(__assign({}, conf.headers), headers);
            }
            else {
                conf.headers = headers;
            }
        }
    };
    return BaseRequest;
}());
export default BaseRequest;
