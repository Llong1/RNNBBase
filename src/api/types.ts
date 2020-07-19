import Axios, { Method } from "axios";
import Constants from "../Constants";
import { DataModel } from "../models";

interface HeaderPros {
    'Content-Type'?: string,
    'Transfer-Encoding'?: string,
    'Content-Encoding'?: string,
    Vary?: string,
    Server?: string
}

export const makeHeaders = (pros: HeaderPros = DefualtHeaders): HeaderPros => {
    let headers: HeaderPros = {};
    return pros ? Object.assign(Object.assign(headers, DefualtHeaders), pros) : Object.assign(headers, DefualtHeaders);
}

export const DefualtHeaders = {
    'Content-Type': 'application/json;charset=UTF-8',
    'Transfer-Encoding': 'chunked',
    'Content-Encoding': 'gzip',
    Vary: 'Accept-Encoding',
    Server: 'jar'
}

export enum StatusCode {
    SUCCESS = 1000, //操作成功
    FAIL, //操作失败
    SYS_BUSY, //系统繁忙
    UNLOGIN, //用户未登录
    PARAMINVALID //参数错误
}

export interface RequestParams {
    _headers?: any
}

export interface Status {
    code: StatusCode,
    message: string | undefined | null
}

export interface ResponseModel {
    status: Status,
    result?: any
}

export interface PaginationDataModel<T extends DataModel> extends DataModel {
    total: number,
    data?: Array<T> | undefined | null
}

export declare class CacheStorage<D> {
    save(req: RequestParams, data?: D | null): Promise<D>;
    read(req: RequestParams): Promise<D>;
}

export const makeRequest = (api: string, params: any = {}, method: Method = 'GET', headers: any = {}) => {

}

export const postUploadFile = (api: string, files: any, headers: any = { 'Content-Type': 'multipart/form-data' }) => {
    let forms = new FormData();
    for (let name in files) {
        forms.append(name, files[name]);
    }
    let hds = {
        'Content-Type': 'multipart/form-data',
        ...headers
    }
    if (Constants.isDebug) {
        console.log('文件上传：', api, files, hds);
    }
    const instance = Axios.create({
        headers: hds,
        timeout: 600000
    });
    return instance.post(api.startsWith('http') ? api : `${Constants.BaseDomain}/${api}`, forms, {
        headers: hds,
        timeout: 600000
    }).then(v => v.data);
}