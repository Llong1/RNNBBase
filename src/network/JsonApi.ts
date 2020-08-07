import Axios, { AxiosInstance, AxiosRequestConfig, Method } from "axios";
import { HeaderManager } from "./HeaderManager";
import Constants from "../Constants";
import { showError } from "../util";

/**
 * 
 * @param method 
 * @param cHeaders 
 * @param c 
 */
export const createNBNetworkApi = (method?: Method, cHeaders?: any, c?: AxiosRequestConfig): Promise<AxiosInstance> => {
    return HeaderManager.getHeaders().then((h: any) => {
        const headers = { ...h, ...cHeaders };
        const conf: AxiosRequestConfig = {
            baseURL: Constants.BaseDomain,
            method: method || 'GET',
            transformResponse: (data: any): any => {
                return data
            },
            headers,
            ...c
        };

        console.log('网络', '创建网络配置', conf);
        return Axios.create(conf);
    })
}

/**
 * get请求参数拼接
 * @param url 
 * @param params 
 */
export const appendGetUrl = (url: string, params?: any) => {
    let u = url;
    if (params) {
        let index = 0;
        for (let name in params) {
            let v = params[name];
            if (v !== undefined) {
                if (index === 0) {
                    u = `${u}?${name}=${encodeURIComponent(v)}`;
                } else {
                    u = `${u}&${name}=${encodeURIComponent(v)}`;
                }
            }
            index++;
        }
    }
    return u;
}

/**
 * api调用
 * @param api 
 * @param method 
 * @param params 
 * @param headers 
 */
export function callApi<T>(api: string, method?: Method, params?: any, headers?: any): Promise<T | null> {
    console.log('接口调用', '访问api', api, method, params);
    return createNBNetworkApi(method, headers).then((a) => {
        if (method) {
            switch (method) {
                case 'post':
                    return a.post(api, params);
                case 'POST':
                    return a.post(api, params);
                default:
                    return a({ url: api, params })
            }
        } else {
            return a.get(appendGetUrl(api, params));
        }
    }).then(r => {
        let d: any = r.data ? (typeof r.data === 'string' ? JSON.parse(r.data) : r.data) : null;
        if (d) {
            if (d.status) {
                if (d.status.code === 1000) {
                    d = d.result;
                } else {
                    let message = d.status.message;
                    if (Constants.isDebug) {
                        message = `${this.name}：${d.status.message}，错误码：${d.status.code}`;
                    }
                    showError(message!);
                    return Promise.reject(message);
                }
            }
        }
        return d;
    });
}