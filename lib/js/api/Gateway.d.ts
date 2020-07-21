export interface GatewayConfig {
    gwUserInfo?: string;
    gwInstantSendMsg?: string;
    gwUserLogin?: string;
    gwUserRegister?: string;
    gwFetchSms?: string;
    gwInstantUserList?: string;
    gwInstantMsgList?: string;
    gwUploadImage?: string;
}
export declare const nbDefaultGateway: GatewayConfig;
export declare class NBGateway {
    static getGateway(): Promise<GatewayConfig>;
    static setGateway(conf: GatewayConfig): Promise<boolean>;
}
