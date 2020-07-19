import { NBGateway, ResponseModel } from "../api";
import Constants from "../Constants";
import { createAxiosClient, nbFilterResponse } from "../network";
import { NBUserID } from "../user";
import { CommunicationListModel, CommunicationHistoryListModel, InstantMessage } from "./types";
import { nbLog } from "../util";

export const getNBInstantUserList = (): Promise<Array<CommunicationListModel> | null> => {
    return NBGateway.getGateway().then(v => {
        nbLog('即时通讯库', 'API 获取通讯列表', `${Constants.BaseDomain}${v.gwInstantUserList}`);
        return createAxiosClient('GET').then(a => a({
            url: `${Constants.BaseDomain}${v.gwInstantUserList}`,
        }))
    }).then(nbFilterResponse)
        .then((r: ResponseModel) => r.result ? r.result.map((c: CommunicationListModel) => adapterNBCommunicationListModel(c)) : []);
}

export const getNBInstantMsgList = (id: NBUserID, pageNo?: number, pageSize?: number): Promise<Array<CommunicationHistoryListModel> | null> => {
    return NBGateway.getGateway().then(v => {
        nbLog('即时通讯库', 'API 获取聊天记录', `${Constants.BaseDomain}${v.gwInstantMsgList}?userId=${id}`);
        return createAxiosClient('GET').then(a => a({
            url: `${Constants.BaseDomain}${v.gwInstantMsgList}?userId=${id}&pageSize=${pageSize === undefined ? 10 : pageSize}&pageNumber=${pageNo === undefined ? 1 : pageNo}`
        })).then(nbFilterResponse)
            .then((r: ResponseModel) => r.result && r.result.data ? r.result.data.map((c: CommunicationHistoryListModel) => adapterNBCommunicationHistoryModel(c)) : [])
    })
}

export const adapterNBCommunicationListModel = (sourceModel: CommunicationListModel): CommunicationListModel => {
    const md: CommunicationListModel = { ...sourceModel };
    if (md.content && md.content.indexOf('fromId') !== -1) {
        let content: InstantMessage = JSON.parse(md.content);
        nbLog('即时通讯库', '转换通讯录记录model', md.content, content.msg.content);
        md.userName = md.userName || content.userName;
        md.createTime = content.pubtime || md.createTime;
        md.contentType = content.msg.mstType;
        md.content = content.msg.content;
    }
    return md;
}

export const adapterNBCommunicationHistoryModel = (sourceModel: CommunicationHistoryListModel): CommunicationHistoryListModel => {
    const md: CommunicationHistoryListModel = { ...sourceModel };
    if (md.content && md.content.indexOf('fromId') !== -1) {
        let content: InstantMessage = JSON.parse(md.content);
        nbLog('即时通讯库', '转换通讯录记录model', md.content, content.msg.content);
        md.userName = md.userName || content.userName;
        md.createTime = content.pubtime || md.createTime;
        md.contentType = content.msg.mstType;
        md.content = content.msg.content;
    }
    return md;
}