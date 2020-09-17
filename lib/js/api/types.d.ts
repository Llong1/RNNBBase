import { DataModel } from "../models";
interface HeaderPros {
    'Content-Type'?: string;
    'Transfer-Encoding'?: string;
    'Content-Encoding'?: string;
    Vary?: string;
    Server?: string;
}
export declare const makeHeaders: (pros?: HeaderPros) => HeaderPros;
export declare const DefualtHeaders: {
    'Content-Type': string;
    'Transfer-Encoding': string;
    'Content-Encoding': string;
    Vary: string;
    Server: string;
};
export declare enum StatusCode {
    SUCCESS = 1000,
    FAIL = 1001,
    SYS_BUSY = 1002,
    UNLOGIN = 1003,
    PARAMINVALID = 1004
}
export interface RequestParams {
    _headers?: any;
}
export interface Status {
    code: StatusCode;
    message: string | undefined | null;
}
export interface ResponseModel {
    status: Status;
    result?: any;
}
export interface PaginationDataModel<T extends DataModel> extends DataModel {
    total: number;
    data?: Array<T> | undefined | null;
}
export declare class CacheStorage<D> {
    save(req: RequestParams, data?: D | null): Promise<D>;
    read(req: RequestParams): Promise<D>;
}
export declare const postUploadFile: (api: string, files: any, headers?: any, retryLimit?: number) => Promise<any>;
export {};
