import { RequestParams, ResponseModel, CacheStorage, DefualtHeaders } from "./types";
import Axios, { AxiosRequestConfig, Method, ResponseType, AxiosResponse } from "axios";
import { HeaderManager } from "../network";
import { showError } from "../util";
import Constants from "../Constants";

interface BaseRequestPros {
    baseHost?: string,
    method?: Method,
    timeout?: number,
    headers?: any
}

export default abstract class BaseRequest<R extends RequestParams, RP = any> {
    protected cacheStore?: CacheStorage<RP> | null = null;
    protected baseHost?: string;
    protected api?: string;
    protected method: Method = 'GET';
    protected timeout: number = 5000;
    protected responseType: ResponseType = 'json';
    public headers?: any;
    protected name?: string;

    constructor(pros?: BaseRequestPros) {
        if (pros !== undefined && pros !== null) {
            if (pros.headers) {
                this.headers = Object.assign(DefualtHeaders, pros.headers);
            } else {
                this.headers = DefualtHeaders;
            }

            if (pros.baseHost !== undefined) {
                this.baseHost = pros.baseHost;
            } else {
                this.baseHost = Constants.BaseDomain;
            }

            if (pros.method) {
                this.method = pros.method;
            }

            if (pros.timeout) {
                this.timeout = pros.timeout;
            }
        } else {
            this.baseHost = Constants.BaseDomain;
            this.headers = DefualtHeaders;
        }

        this.initRequest();
    }

    protected abstract initRequest(): void;

    public request(req?: R): Promise<RP> {
        const self = this;
        if (this.baseHost === undefined || this.baseHost === null || this.baseHost === '') {
            if (Constants.BaseDomain) {
                this.baseHost = Constants.BaseDomain;
            }
        }
        return Promise.resolve(this.baseHost ? this.baseHost : Constants.readLocalConf().then(c => c.baseDomain)).then(baseHost => {
            if (!baseHost) return Promise.reject('未设置有效的根域名！');
            this.baseHost = baseHost;
            return new Promise((res, rej) => {
                let params: any = req || {};
                if (self.cacheStore) {
                    self.cacheStore.read(params).then(v => {
                        if (v) {
                            res(v)
                        } else {
                            HeaderManager.getHeaders()
                                .then(h => {
                                    self.headers = {
                                        ...h,
                                        ...self.headers
                                    };
                                    const p = self.build(params);
                                    if (Constants.isDebug) {
                                        console.log(this.name, '准备请求：', p);
                                    }
                                    Axios.request(p)
                                        .then((v: AxiosResponse) => {
                                            self.resolveData(params, v.data, res, rej);
                                        })
                                        .catch(rej);
                                })
                                .catch(err => {
                                    const p = self.build(params);
                                    if (Constants.isDebug) {
                                        console.log(this.name, '准备请求：', p);
                                    }
                                    Axios.request(p)
                                        .then((v: AxiosResponse) => {
                                            self.resolveData(params, v.data, res, rej);
                                        })
                                        .catch(rej);
                                })
                        }
                    })
                } else {
                    HeaderManager.getHeaders()
                        .then(h => {
                            self.headers = {
                                ...h,
                                ...self.headers
                            };
                            const p = self.build(params);
                            if (Constants.isDebug) {
                                console.log(this.name, '准备请求：', p);
                            }
                            Axios.request(p)
                                .then((v: AxiosResponse) => {
                                    self.resolveData(params, v.data, res, rej);
                                })
                                .catch(rej);
                        })
                        .catch(err => {
                            const p = self.build(params);
                            if (Constants.isDebug) {
                                console.log(this.name, '准备请求：', p);
                            }
                            Axios.request(p)
                                .then((v: AxiosResponse) => {
                                    self.resolveData(params, v.data, res, rej);
                                })
                                .catch(rej);
                        })
                }
            });
        })
    }

    protected resolveData(req: R, r: ResponseModel, res: Function, rej: Function) {
        if (r.status.code === 1000) {
            res(r.result);
            this.onData(req, r.result);
        } else {
            let message = r.status.message;
            if (Constants.isDebug) {
                message = `${this.name}：${r.status.message}，错误码：${r.status.code}`;
            }
            showError(message!);
            rej(message);
            this.onRespError(r);
        }
    }

    protected onData(req: R, d: RP): void {
        if (d) {
            if (this.cacheStore) {
                this.cacheStore.save(req, d);
            }
        }
    }

    protected onRespError(r: ResponseModel) {
        console.log(this.name, r.status);
    }

    protected build(req: R): AxiosRequestConfig {
        let conf: AxiosRequestConfig = {};
        if (this.api) {
            if (this.api.startsWith('http')) {
                conf.url = this.api;
            } else {
                if (this.baseHost.endsWith('/')) {
                    conf.url = `${this.baseHost}${this.api}`;
                } else {
                    if (this.api.startsWith('/')) {
                        conf.url = `${this.baseHost}${this.api}`;
                    } else {
                        conf.url = `${this.baseHost}/${this.api}`;
                    }
                }
            }
        } else {
            throw new Error('无效的请求链接！');
        }

        this.setupHeaders(conf, Constants.headers);
        this.setupHeaders(conf, this.headers);
        this.setupHeaders(conf, req._headers);
        conf.method = this.method;
        conf.responseType = this.responseType;
        conf.timeout = this.timeout;
        this.appendParams(conf, req);

        return conf;
    }

    protected appendParams(conf: AxiosRequestConfig, req: R) {
        if (req) {
            if (this.method === 'GET' || this.method === 'get') {
                let url = conf.url?.endsWith('?') ? conf.url : `${conf.url}?`;
                let i = 0;
                for (let name in req) {
                    if (name === '_headers')
                        continue;
                    let v: any = req[name];
                    if (v) {
                        if (i > 0) {
                            url = `${url}&${name}=${decodeURIComponent(v)}`;
                        } else {
                            url = `${url}${name}=${decodeURIComponent(v)}`;
                        }
                        i++;
                    }
                }
                conf.url = url;
            } else {
                let params: any = {};
                for (let name in req) {
                    if (name === '_headers')
                        continue;
                    let v: any = req[name];
                    if (v) {
                        params[name] = v;
                    }
                }
                conf.params = params;
            }
        }
    }

    protected setupHeaders(conf: AxiosRequestConfig, headers?: any) {
        if (headers) {
            if (conf.headers) {
                conf.headers = {
                    ...conf.headers,
                    ...headers,
                }
            } else {
                conf.headers = headers;
            }
        }
    }
}