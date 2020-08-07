import { Method, AxiosRequestConfig, AxiosInstance, AxiosResponse } from "axios";
import { HeaderOptions, NBFileUploadItem } from "./types";
import { ResponseModel } from "../api";
import { NBUploadResponse } from "../models";
export * from "./HeaderManager";
export * from "./types";
export * from "./JsonApi";
export declare const createAxiosClient: (method?: Method, config?: AxiosRequestConfig, headers?: HeaderOptions) => Promise<AxiosInstance>;
export declare const nbFilterResponse: (r: AxiosResponse<any>, filterError?: boolean) => Promise<ResponseModel>;
export declare const nbFileUpload: (file: NBFileUploadItem, onUploadProgress?: (progressEvent: {
    loaded: number;
    total: number;
}) => void, fieldName?: string, conf?: AxiosRequestConfig) => Promise<NBUploadResponse>;
