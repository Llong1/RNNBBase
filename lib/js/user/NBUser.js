import AsyncStorage from '@react-native-community/async-storage';
import { createAxiosClient, HeaderManager } from '../network';
import Constants from '../Constants';
import { nbSQLiteCache } from '../cache';
import { StatusCode, NBGateway } from "../api";
import { isEmptyObj } from '../util';
import NBBaseCxt from '../NBBaseCxt';
var tokenKey = "_nbuser_app_token";
var userKey = "_nbuser_app_user";
var NBUserMemCache = /** @class */ (function () {
    function NBUserMemCache() {
        this._memCache = {};
    }
    NBUserMemCache.prototype.getMemUser = function (id) {
        return this._memCache[id];
    };
    NBUserMemCache.prototype.setMemUser = function (id, user) {
        this._memCache[id] = user;
    };
    NBUserMemCache.prototype.isLogin = function () {
        return this.currentUser && !isEmptyObj(this.token);
    };
    return NBUserMemCache;
}());
export var nbUserMemCache = new NBUserMemCache();
export var setNBUserAll = function (user) {
    if (user && user.token) {
        nbUserMemCache.currentUser = user.user;
        nbUserMemCache.token = user.token;
        NBBaseCxt.nbUser = user;
        return Promise.all([
            HeaderManager.updateHeaders({
                token: user.token
            }),
            AsyncStorage.multiSet([[userKey, JSON.stringify(user.user)], [tokenKey, user.token || '']])
        ]).then(function () { return true; });
    }
    return AsyncStorage.multiSet([[userKey, JSON.stringify(user.user)], [tokenKey, user.token || '']]).then(function () { return true; });
};
export var getLastNBUserALL = function () {
    return getLastNBUserInfo().then(function (u) {
        if (u) {
            return getLastUserToken().then(function (token) {
                return {
                    user: u,
                    token: token
                };
            });
        }
        return null;
    });
};
export var getNBUserInfo = function (id, url) {
    var userKey = "_nb_user_" + id;
    var user = nbUserMemCache.getMemUser(id);
    return user ? Promise.resolve(user) : nbSQLiteCache.readCache(userKey).then(function (v) {
        if (v && v.item) {
            return v.item;
        }
        return NBGateway.getGateway().then(function (v) {
            if (Constants.isDebug) {
                console.log("\u7528\u6237\u57FA\u7840\u5E93 \u83B7\u53D6\u7528\u6237\u57FA\u7840\u4FE1\u606F\uFF1A" + id);
            }
            return createAxiosClient('GET').then(function (axis) {
                return axis({
                    url: url === undefined ? "" + Constants.BaseDomain + v.gwUserInfo + "?id=" + id : url + "?id=" + id
                });
            }).then(function (r) {
                if (r && r.data) {
                    var rsp_1 = r.data;
                    if (Constants.isDebug) {
                        console.log('用户基础库 用户基础信息', rsp_1.result);
                    }
                    if (rsp_1.status.code === StatusCode.SUCCESS) {
                        if (rsp_1.result) {
                            nbUserMemCache.setMemUser(id, rsp_1.result);
                            return nbSQLiteCache.saveCache(userKey, {
                                key: userKey,
                                item: rsp_1.result,
                                expire: 1000 * 60 * 60
                            }).then(function () { return rsp_1.result; })["catch"](function () { return rsp_1.result; });
                        }
                    }
                }
                return null;
            });
        });
    });
};
export var getLastNBUserInfo = function () {
    return AsyncStorage.getItem(userKey).then(function (s) {
        if (s && s.length > 0)
            return JSON.parse(s);
        return null;
    });
};
export var saveLastNBUserInfo = function (user) {
    if (user === undefined) {
        return AsyncStorage.removeItem(userKey).then(function () { return true; });
    }
    return AsyncStorage.setItem(userKey, JSON.stringify(user)).then(function () { return true; });
};
export var saveLastUserToken = function (token) {
    if (token === undefined) {
        return AsyncStorage.removeItem(tokenKey).then(function () { return Promise.resolve(true); });
    }
    return AsyncStorage.setItem(tokenKey, token).then(function () { return Promise.resolve(true); });
};
export var getLastUserToken = function () {
    return AsyncStorage.getItem(tokenKey);
};
export var logoutNBUser = function () {
    return Promise.all([
        saveLastNBUserInfo(),
        saveLastUserToken(),
        HeaderManager.updateHeaders({
            token: ''
        })
    ]).then(function () { return true; });
};
