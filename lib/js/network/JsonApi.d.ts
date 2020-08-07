import { AxiosInstance, AxiosRequestConfig, Method } from "axios";
/**
 *
 * @param method
 * @param cHeaders
 * @param c
 */
export declare const createNBNetworkApi: (method?: Method, cHeaders?: any, c?: AxiosRequestConfig) => Promise<AxiosInstance>;
/**
 * get请求参数拼接
 * @param url
 * @param params
 */
export declare const appendGetUrl: (url: string, params?: any) => string;
/**
 * api调用
 * @param api
 * @param method
 * @param params
 * @param headers
 */
export declare function callApi<T>(api: string, method?: Method, params?: any, headers?: any): Promise<T | null>;
