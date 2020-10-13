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
import { NBGateway } from "../api";
import Constants from "../Constants";
import { createAxiosClient, nbFilterResponse } from "../network";
import { nbLog } from "../util";
export var getNBInstantUserList = function () {
    return NBGateway.getGateway().then(function (v) {
        nbLog('即时通讯库', 'API 获取通讯列表', "" + Constants.BaseDomain + v.gwInstantUserList);
        return createAxiosClient('GET').then(function (a) { return a({
            url: "" + Constants.BaseDomain + v.gwInstantUserList
        }); });
    }).then(nbFilterResponse)
        .then(function (r) { return r.result ? r.result.map(function (c) { return adapterNBCommunicationListModel(c); }) : []; });
};
export var getNBInstantMsgList = function (id, pageNo, pageSize) {
    return NBGateway.getGateway().then(function (v) {
        nbLog('即时通讯库', 'API 获取聊天记录', "" + Constants.BaseDomain + v.gwInstantMsgList + "?userId=" + id);
        return createAxiosClient('GET').then(function (a) { return a({
            url: "" + Constants.BaseDomain + v.gwInstantMsgList + "?userId=" + id + "&pageSize=" + (pageSize === undefined ? 10 : pageSize) + "&pageNumber=" + (pageNo === undefined ? 1 : pageNo)
        }); }).then(nbFilterResponse)
            .then(function (r) { return r.result && r.result.data ? r.result.data.map(function (c) { return adapterNBCommunicationHistoryModel(c); }) : []; });
    });
};
export var adapterNBCommunicationListModel = function (sourceModel) {
    var md = __assign({}, sourceModel);
    if (md.content && md.content.indexOf('fromId') !== -1) {
        var content = JSON.parse(md.content);
        nbLog('即时通讯库', '转换通讯录记录model', md.content, content.msg.content);
        md.userName = md.userName || content.userName;
        md.createTime = content.pubtime || md.createTime;
        md.contentType = content.msg.msgType;
        md.content = content.msg.content;
    }
    return md;
};
export var adapterNBCommunicationHistoryModel = function (sourceModel) {
    var md = __assign({}, sourceModel);
    if (md.content && md.content.indexOf('fromId') !== -1) {
        var content = JSON.parse(md.content);
        nbLog('即时通讯库', '转换通讯录记录model', md.content, content.msg.content);
        md.userName = md.userName || content.userName;
        md.createTime = content.pubtime || md.createTime;
        md.contentType = content.msg.msgType;
        md.content = content.msg.content;
    }
    return md;
};
