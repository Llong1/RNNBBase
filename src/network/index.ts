import Axios, { Method, AxiosRequestConfig, AxiosInstance, AxiosResponse } from "axios";
import { HeaderOptions } from "./types";
import { HeaderManager } from "./HeaderManager";
import { ResponseModel, StatusCode } from "../api";
import Constants from "../Constants";
import { showError, nbLog } from "../util";

export * from "./HeaderManager";
export * from "./types";

export const createAxiosClient = (method: Method = 'GET', config?: AxiosRequestConfig, headers?: HeaderOptions): Promise<AxiosInstance> => {
    return headers === undefined ? HeaderManager.getHeaders().then(h => {
        nbLog('网络库 本地header设置', h);
        return Promise.resolve(Axios.create(Object.assign({
            method, headers: h
        }, config)))
    }) : Promise.resolve(Axios.create(Object.assign({
        method, headers
    }, config)));
}

export const nbFilterResponse = (r: AxiosResponse, filterError?: boolean): Promise<ResponseModel> => {
    let rr: ResponseModel = r.data;
    if (rr.status.code === StatusCode.SUCCESS) {
        return Promise.resolve(rr);
    } else {
        if (filterError !== undefined && filterError) {
            let message = rr.status.message;
            if (Constants.isDebug) {
                message = `${message}，错误码：${rr.status.code}`;
            }
            showError(message!);
        }
        return Promise.reject(rr.status);
    }
}