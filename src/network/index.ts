import Axios, { Method, AxiosRequestConfig, AxiosInstance, AxiosResponse } from "axios";
import { HeaderOptions, NBFileUploadItem } from "./types";
import { HeaderManager } from "./HeaderManager";
import { ResponseModel, StatusCode, NBGateway } from "../api";
import Constants from "../Constants";
import { showError, nbLog } from "../util";
import { NBUploadResponse } from "../models";

export * from "./HeaderManager";
export * from "./types";
export * from "./JsonApi";

export const createAxiosClient = (method: Method = 'GET', config?: AxiosRequestConfig, headers?: HeaderOptions): Promise<AxiosInstance> => {
    return HeaderManager.getHeaders().then(h => {
        const conf: AxiosRequestConfig = {
            baseURL: Constants.BaseDomain,
            method, headers: h ? {
                ...h,
                ...headers
            } : {
                    ...headers
                }
        };
        if (config) {
            if (config.headers) {
                conf.headers = {
                    ...conf.headers,
                    ...config.headers
                }
            }
            for (let name in config) {
                if (name === 'heders') continue;
                conf[name] = config[name];
            }
        }
        nbLog('网络模块', '创建HTTP实例', conf);
        return Axios.create(conf)
    }).catch((err) => {
        nbLog('网络模块', '创建HTTP实例失败', err);
        return Axios.create(Object.assign({ method, headers }, config))
    });
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

export const nbFileUpload = (file: NBFileUploadItem, onUploadProgress?: (progressEvent: { loaded: number, total: number }) => void, fieldName?: string, conf?: AxiosRequestConfig): Promise<NBUploadResponse> => {
    return NBGateway.getGateway().then(c => {
        let formData = new FormData();
        const f: NBFileUploadItem = Object.assign({ type: 'application/octet-stream' }, file);
        if (f.name === undefined) {
            f.name = file.uri.substring(file.uri.lastIndexOf('/') + 1);
        }
        formData.append(fieldName === undefined ? 'file' : fieldName, f);
        return createAxiosClient('post', {
            timeout: 600000,
            onUploadProgress,
            ...conf
        }, {
            "Content-Type": "multipart/form-data"
        }).then(a => {
            return a({
                url: c.gwUploadImage, data: formData
            })
        })
    }).then(nbFilterResponse).then((r: ResponseModel) => r.result)
}