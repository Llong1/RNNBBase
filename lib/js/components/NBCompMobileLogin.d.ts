import React from "react";
import { ViewProps } from "react-native";
import { NBLoginModel, NBRegisterModel } from "../models";
import { NBUserModel } from "../user";
export declare type NBRegisterMode = 'full' | 'no_nickname' | 'no_password';
export interface NBCompMobileLoginPros extends ViewProps {
    registerMode?: NBRegisterMode;
    loginBtnColor?: string;
    onLoginSuccess?: (user: {
        token?: string;
        user?: NBUserModel;
    }) => void;
    onLoginFail?: (error: any) => void;
    onRegisterSuccess?: (user: {
        token?: string;
        user?: NBUserModel;
    }) => void;
    onRegisterFail?: (error: any) => void;
    isRegisterAutoLogin?: boolean;
    showToastMsg?: boolean;
}
export interface NBCompMobileLoginState {
    loginParams?: NBLoginModel;
    registerParams?: NBRegisterModel;
    showRegister?: boolean;
    bySms?: boolean;
}
export declare class NBCompMobileLogin extends React.Component<NBCompMobileLoginPros, NBCompMobileLoginState> {
    state: {
        loginParams: {
            phone: string;
            password: string;
            code: string;
        };
        registerParams: {
            userPhone: string;
        };
        showRegister: boolean;
        bySms: boolean;
    };
    fetchSMS(phone: string): Promise<boolean>;
    submit(): void;
    render(): JSX.Element;
}
