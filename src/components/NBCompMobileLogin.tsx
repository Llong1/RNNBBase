import { Input, Text, View } from "native-base";
import React from "react";
import { StyleSheet, TouchableOpacity, ViewProps } from "react-native";
import Constants from "../Constants";
import { NBGateway, ResponseModel, StatusCode } from "../api";
import { NBLoginModel, NBRegisterModel } from "../models";
import { createAxiosClient } from "../network";
import { NBIconArrowRight, NBIconLock, NBIconPhone, NBIconSafeCode, NBIconUser } from "../styles";
import { NBUserModel, setNBUserAll, nbUserMemCache } from "../user";
import { isMobile, showError, showMsg } from "../util";
import CutDownTimer from "./CutDownTimer";
import { NBCompTouchText } from "./NBCompTouchText";

export type NBRegisterMode = 'full' | 'no_nickname' | 'no_password';

export interface NBCompMobileLoginPros extends ViewProps {
    registerMode?: NBRegisterMode,
    loginBtnColor?: string,
    onLoginSuccess?: (user: { token?: string, user?: NBUserModel }) => void,
    onLoginFail?: (error: any) => void,
    onRegisterSuccess?: (user: { token?: string, user?: NBUserModel }) => void,
    onRegisterFail?: (error: any) => void,
    isRegisterAutoLogin?: boolean,
    showToastMsg?: boolean
}

export interface NBCompMobileLoginState {
    loginParams?: NBLoginModel,
    registerParams?: NBRegisterModel
    showRegister?: boolean,
    bySms?: boolean
}

export class NBCompMobileLogin extends React.Component<NBCompMobileLoginPros, NBCompMobileLoginState> {
    state = {
        loginParams: {
            phone: '',
            password: '',
            code: ''
        },
        registerParams: {
            userPhone: ''
        },
        showRegister: false,
        bySms: true
    }

    public fetchSMS(phone: string) {
        return NBGateway.getGateway().then(v => {
            return createAxiosClient('GET').then(a => a({
                url: `${Constants.BaseDomain}${v.gwFetchSms}?phone=${phone}`,
            }).then(d => d.data)).then((r: ResponseModel) => {
                if (r.status.code === StatusCode.SUCCESS) {
                    showMsg('获取验证码成功！')

                    return true;
                }
                return false;
            })
        })
    }

    public submit() {
        const { onLoginSuccess, onLoginFail, onRegisterSuccess, onRegisterFail, showToastMsg } = this.props;
        const show = showToastMsg === undefined ? true : showToastMsg;
        if (this.state.showRegister) {
            NBGateway.getGateway()
                .then(c => {
                    return createAxiosClient('POST').then(a => a({
                        url: `${Constants.BaseDomain}${c.gwUserRegister}`,
                        params: this.state.registerParams
                    })).then(vv => {
                        return vv.data;
                    })
                })
                .then((v: ResponseModel) => {
                    if (v.status.code === StatusCode.SUCCESS) {
                        if (onRegisterSuccess) {
                            onRegisterSuccess(v.result);
                        }

                        return true;
                    } else {
                        onRegisterFail && onRegisterFail(v.status);
                        if (show) {
                            let message = v.status.message;
                            if (Constants.isDebug) {
                                message = `${message}，错误码：${v.status.code}`;
                            }
                            showError(message!);
                        }
                        return false;
                    }
                }).then(is => {
                    if (is && show) {
                        showMsg('注册成功！');
                    }
                })
            return;
        }
        NBGateway.getGateway()
            .then(v => {
                return createAxiosClient('POST').then(a => a({
                    url: `${Constants.BaseDomain}${v.gwUserLogin}`,
                    params: this.state.loginParams
                })).then(vv => {
                    return vv.data;
                })
            }).then((v: ResponseModel) => {
                if (v.status.code === StatusCode.SUCCESS) {
                    if (onLoginSuccess) {
                        onLoginSuccess(v.result);
                    }
                    nbUserMemCache.currentUser = v.result.user;
                    return setNBUserAll(v.result);
                } else {
                    onLoginFail && onLoginFail(v.status);
                    if (show) {
                        let message = v.status.message;
                        if (Constants.isDebug) {
                            message = `${message}，错误码：${v.status.code}`;
                        }
                        showError(message!);
                    }
                    return false;
                }
            }).then(is => {
                if (is && show) {
                    showMsg('登录成功！');
                }
            }).catch(err => {
                onLoginFail && onLoginFail(err);
                if (show) {
                    showError(`登录出错：${typeof err === 'string' ? err : err.message}`);
                }
            })
    }

    render() {
        const loginBtnColor = this.props.loginBtnColor === undefined ? 'rgba(251, 109, 58, 1)' : this.props.loginBtnColor;
        let comp = null;
        if (this.state.showRegister) {
            comp = <View style={{ width: 312, padding: 27, backgroundColor: 'white', borderRadius: 10 }}>
                <Text style={{ fontSize: 24, marginBottom: 20 }}>注册</Text>
                <View style={styles.inputViewStyle}>
                    <NBIconUser style={{ marginLeft: 9, marginTop: 9 }} />
                    <Input style={{ flex: 1, height: 43, lineHeight: 41, margin: 0, padding: 0 }} placeholder="请输入您的真实姓名" onChangeText={(userName) => {
                        this.setState({
                            registerParams: {
                                ...this.state.registerParams,
                                userName
                            }
                        })
                    }} />
                </View>
                <View style={[styles.inputViewStyle, { marginTop: 20 }]}>
                    <NBIconPhone style={{ marginLeft: 9, marginTop: 9 }} />
                    <Input style={{ flex: 1, height: 43, lineHeight: 41, margin: 0, padding: 0 }} keyboardType="name-phone-pad" value={this.state.registerParams.userPhone} placeholder="请输入手机号码" onChangeText={(phone) => {
                        this.setState({
                            registerParams: {
                                ...this.state.registerParams,
                                userPhone: phone
                            }
                        })
                    }} />
                </View>
                <View style={[styles.inputViewStyle, { marginTop: 20 }]}>
                    <NBIconSafeCode style={{ marginLeft: 9, marginTop: 9 }} />
                    <Input style={{ flex: 1, height: 43, lineHeight: 41, margin: 0, padding: 0 }} placeholder="请输入验证码" onChangeText={(code) => {
                        this.setState({
                            registerParams: {
                                ...this.state.registerParams,
                                code
                            }
                        })
                    }} />
                    <View style={{ marginRight: 6 }}>
                        <View style={{ flex: 1 }} />
                        <CutDownTimer validateInput={() => {
                            if (this.state.registerParams && isMobile(this.state.registerParams.userPhone)) {
                                this.fetchSMS(this.state.registerParams.userPhone);
                                return true;
                            }
                            return false;
                        }} />
                        <View style={{ flex: 1 }} />
                    </View>
                </View>
                <View style={[styles.inputViewStyle, { marginTop: 20, marginBottom: 20 }]}>
                    <NBIconLock style={{ marginLeft: 9, marginTop: 9 }} />
                    <Input style={{ flex: 1, height: 43, lineHeight: 41, margin: 0, padding: 0 }} secureTextEntry placeholder="请设置您的密码" onChangeText={(password) => {
                        this.setState({
                            registerParams: {
                                ...this.state.registerParams,
                                password
                            }
                        })
                    }} />
                </View>
                <View style={{ flexDirection: 'row', paddingBottom: 20 }}>
                    <NBCompTouchText text="已注册？去登录" onPress={() => {
                        this.setState({
                            showRegister: false
                        })
                    }} />
                </View>
            </View>
        } else {
            comp = <View style={{ width: 312, padding: 27, backgroundColor: 'white', borderRadius: 10 }}>
                <Text style={{ fontSize: 24 }}>登录</Text>
                <View style={[styles.inputViewStyle, { marginTop: 20 }]}>
                    <NBIconPhone style={{ marginLeft: 9, marginTop: 9 }} />
                    <Input style={{ flex: 1, height: 43, lineHeight: 41, margin: 0, padding: 0 }} keyboardType="name-phone-pad" value={this.state.loginParams.phone} placeholder="请输入手机号码" onChangeText={(phone) => {
                        this.setState({
                            loginParams: {
                                ...this.state.loginParams,
                                phone
                            }
                        })
                    }} />
                </View>
                {
                    this.state.bySms ? <View style={[styles.inputViewStyle, { marginTop: 20 }]}>
                        <NBIconSafeCode style={{ marginLeft: 9, marginTop: 9 }} />
                        <Input style={{ flex: 1, height: 43, lineHeight: 41, margin: 0, padding: 0 }} placeholder="请输入验证码" onChangeText={(code) => {
                            this.setState({
                                loginParams: {
                                    ...this.state.loginParams,
                                    code
                                }
                            })
                        }} />
                        <View style={{ marginRight: 6 }}>
                            <View style={{ flex: 1 }} />
                            <CutDownTimer validateInput={() => {
                                if (this.state.loginParams && isMobile(this.state.loginParams.phone)) {
                                    this.fetchSMS(this.state.loginParams.phone);
                                    return true;
                                }
                                return false;
                            }} />
                            <View style={{ flex: 1 }} />
                        </View>
                    </View> : <View style={[styles.inputViewStyle, { marginTop: 20 }]}>
                            <NBIconLock style={{ marginLeft: 9, marginTop: 9 }} />
                            <Input style={{ flex: 1, height: 43, lineHeight: 41, margin: 0, padding: 0 }} secureTextEntry onChangeText={(password) => {
                                this.setState({
                                    loginParams: {
                                        ...this.state.loginParams,
                                        password
                                    }
                                })
                            }} placeholder="请设置您的密码" />
                        </View>
                }
                <View style={{ marginTop: 20, flexDirection: 'row', paddingBottom: 20 }}>
                    <NBCompTouchText text={this.state.bySms ? "密码登录" : "短信登录"} onPress={() => {
                        this.setState({
                            bySms: !this.state.bySms
                        })
                    }} />
                    <NBCompTouchText text="没有账号？去注册" style={{ marginLeft: 15 }} onPress={() => {
                        this.setState({
                            showRegister: true
                        })
                    }} />
                </View>
            </View>
        }
        return <View>
            {comp}
            <View style={{ alignItems: 'center', marginTop: -32 }}>
                <TouchableOpacity disabled={!isMobile(this.state.showRegister ? this.state.registerParams.userPhone : this.state.loginParams.phone)} onPress={this.submit.bind(this)} style={{ backgroundColor: loginBtnColor, width: 64, height: 64, borderRadius: 64, alignItems: 'center', overflow: 'hidden', padding: 0, margin: 0 }}>
                    <View style={{ width: 64, height: 64, alignItems: 'center' }}>
                        <View style={{ flex: 1 }} />
                        <NBIconArrowRight size={36} color="white" />
                        <View style={{ flex: 1 }} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    inputViewStyle: { backgroundColor: 'rgba(247, 247, 247, 1)', borderRadius: 5, flexDirection: 'row', height: 43, overflow: "hidden" }
})