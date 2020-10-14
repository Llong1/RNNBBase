import { HeaderOptions } from "../network";
export interface DataModel {
}
export interface NBLoginModel {
    phone: string;
    password?: string;
    code?: string;
}
export interface NBRegisterModel {
    password?: string;
    userPhone: string;
    code?: string;
    userName?: string;
}
export interface NBConfig extends AppConfig {
    baseDomain?: string;
    isDebug?: boolean;
    payWxId?: any;
    alipayScheme?: string;
    alipaySandbox?: boolean;
    amapAndroidKey?: string;
    amapIOSKey?: string;
    headers?: HeaderOptions;
}
export interface NBRootState {
}
export interface NBUploadResponse {
    finalPath?: string;
    filename?: string;
    key?: string;
    hash?: string;
    fileType?: string;
}
/**
 * 应用配置
 */
export interface AppConfig {
    appid?: string;
    appsecr?: string;
}
