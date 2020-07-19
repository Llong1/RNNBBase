import React from "react";
import { ViewProps } from "react-native";
export declare type LoginType = 'smsCode' | 'password';
export interface LoginParams {
    mobile?: string;
    password?: string;
    smsCode?: string;
    loginType?: LoginType;
}
export interface LoginMobileProps extends ViewProps {
    submit?: (params: LoginParams) => boolean;
    loginType?: LoginType;
    onReset?: () => void;
    onFetchSmsCode?: (mobile: string) => boolean;
}
export declare class LoginMobile extends React.Component<LoginMobileProps, {
    type: LoginType;
    loginParams?: LoginParams;
    isLogining?: boolean;
}> {
    constructor(props: LoginMobileProps);
    UNSAFE_componentWillReceiveProps(props: LoginMobileProps): void;
    render(): JSX.Element;
}
