import { RequestParams, ResponseModel, CacheStorage } from "./types";
import { AxiosRequestConfig, Method, ResponseType } from "axios";
interface BaseRequestPros {
    baseHost?: string;
    method?: Method;
    timeout?: number;
    headers?: any;
}
export default abstract class BaseRequest<R extends RequestParams, RP = any> {
    protected cacheStore?: CacheStorage<RP> | null;
    protected baseHost?: string;
    protected api?: string;
    protected method: Method;
    protected timeout: number;
    protected responseType: ResponseType;
    headers?: any;
    protected name?: string;
    constructor(pros?: BaseRequestPros);
    protected abstract initRequest(): void;
    request(req?: R): Promise<RP>;
    protected resolveData(req: R, r: ResponseModel, res: Function, rej: Function): void;
    protected onData(req: R, d: RP): void;
    protected onRespError(r: ResponseModel): void;
    protected build(req: R): AxiosRequestConfig;
    protected appendParams(conf: AxiosRequestConfig, req: R): void;
    protected setupHeaders(conf: AxiosRequestConfig, headers?: any): void;
}
export {};
