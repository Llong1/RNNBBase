import React from "react";
import { ViewProps } from "react-native";
import { NBLoginModel, NBRegisterModel } from "../models";
import { NBUserModel } from "../user";
export declare type NBRegisterMode = 'full' | 'no_nickname' | 'no_password';
export interface NBCompMobileLoginPros extends ViewProps {
    loginParams?: NBLoginModel;
    registerMode?: NBRegisterMode;
    autoLogin?: boolean;
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
    constructor(props: NBCompMobileLoginPros);
    componentDidMount(): void;
    fetchSMS(phone: string): Promise<boolean>;
    submit(): void;
    render(): JSX.Element;
}
