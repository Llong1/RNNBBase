/// <reference types="react" />
import { NBUserModel, NBUserID, NBUserAll } from "./types";
declare class NBUserMemCache {
    private _memCache;
    currentUser?: NBUserModel;
    token?: string;
    getMemUser(id: NBUserID): NBUserModel | undefined | null;
    setMemUser(id: NBUserID, user: NBUserModel): void;
    isLogin(): boolean;
}
export declare const nbUserMemCache: NBUserMemCache;
export declare const setNBUserAll: (user: NBUserAll) => Promise<boolean>;
export declare const getLastNBUserALL: (notConfirm?: boolean) => Promise<NBUserAll>;
export declare const getNBUserInfo: (id: import("react").ReactText, url?: string) => Promise<NBUserModel>;
export declare const getLastNBUserInfo: () => Promise<NBUserModel>;
export declare const saveLastNBUserInfo: (user?: NBUserModel) => Promise<boolean>;
export declare const saveLastUserToken: (token?: string) => Promise<boolean>;
export declare const getLastUserToken: () => Promise<string>;
export declare const logoutNBUser: () => Promise<boolean>;
export {};
