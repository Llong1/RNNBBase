import { Method, AxiosRequestConfig, AxiosInstance, AxiosResponse } from "axios";
import { HeaderOptions } from "./types";
import { ResponseModel } from "../api";
export * from "./HeaderManager";
export * from "./types";
export declare const createAxiosClient: (method?: Method, config?: AxiosRequestConfig, headers?: HeaderOptions) => Promise<AxiosInstance>;
export declare const nbFilterResponse: (r: AxiosResponse<any>, filterError?: boolean) => Promise<ResponseModel>;
