import React from "react";
import { ViewProps } from "react-native";
import { Form, Item, Input, Button, Text } from "native-base";
import CutDownTimer from "./CutDownTimer";
import { isMobile } from "../util";

export type LoginType = 'smsCode' | 'password';

export interface LoginParams {
    mobile?: string,
    password?: string,
    smsCode?: string,
    loginType?: LoginType
}

export interface LoginMobileProps extends ViewProps {
    submit?: (params: LoginParams) => boolean,
    loginType?: LoginType,
    onReset?: () => void,
    onFetchSmsCode?: (mobile: string) => boolean
}

export class LoginMobile extends React.Component<LoginMobileProps, { type: LoginType, loginParams?: LoginParams, isLogining?: boolean }> {
    constructor(props: LoginMobileProps) {
        super(props);
        this.state = {
            type: props.loginType || 'smsCode',
            loginParams: {},
            isLogining: false,
        }
    }

    UNSAFE_componentWillReceiveProps(props: LoginMobileProps) {
        if (props.loginType && props.loginType !== this.state.type) {
            this.setState({
                type: props.loginType
            })
        }
    }

    render() {
        return <Form>
            <Item success={isMobile(this.state.loginParams.mobile)}>
                <Input placeholder="请输入手机号码" keyboardType="numeric" onChangeText={(mobile: string) => {
                    this.setState({
                        loginParams: {
                            ...this.state.loginParams,
                            mobile
                        }
                    })
                }} />
            </Item>
            <Item>
                {
                    this.state.type === 'password' ? <Input placeholder="请输入密码" secureTextEntry onChangeText={(password: string) => {
                        this.setState({
                            loginParams: {
                                ...this.state.loginParams,
                                password
                            }
                        })
                    }} /> : <>
                            <Input placeholder="请输入验证码" keyboardType="numeric" onChangeText={(smsCode: string) => {
                                this.setState({
                                    loginParams: {
                                        ...this.state.loginParams,
                                        smsCode
                                    }
                                })
                            }} />
                            <CutDownTimer validateInput={() => {
                                if (this.state.loginParams && isMobile(this.state.loginParams.mobile)) {
                                    if (this.props.onFetchSmsCode) {
                                        return this.props.onFetchSmsCode(this.state.loginParams.mobile);
                                    }
                                }
                                return false;
                            }} />
                        </>
                }
            </Item>


            <Button full style={{ marginTop: 15 }} onPress={() => {
                if (this.props.submit) {
                    this.props.submit({
                        loginType: this.state.type,
                        ...this.state.loginParams
                    })
                }
            }}>
                <Text>登录</Text>
            </Button>
        </Form>
    }
}