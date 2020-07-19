/// <reference types="react" />
import { CommunicationListModel, CommunicationHistoryListModel } from "./types";
export declare const getNBInstantUserList: () => Promise<CommunicationListModel[]>;
export declare const getNBInstantMsgList: (id: import("react").ReactText, pageNo?: number, pageSize?: number) => Promise<CommunicationHistoryListModel[]>;
export declare const adapterNBCommunicationListModel: (sourceModel: CommunicationListModel) => CommunicationListModel;
export declare const adapterNBCommunicationHistoryModel: (sourceModel: CommunicationHistoryListModel) => CommunicationHistoryListModel;
