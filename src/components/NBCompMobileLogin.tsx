import { Input, Text, View } from "native-base";
import React from "react";
import { StyleSheet, TouchableOpacity, ViewProps, Platform } from "react-native";
import Constants from "../Constants";
import { NBGateway, ResponseModel, StatusCode } from "../api";
import { NBLoginModel, NBRegisterModel } from "../models";
import { createNBNetworkApi } from "../network";
import { NBIconArrowRight, NBIconLock, NBIconPhone, NBIconSafeCode, NBIconUser } from "../styles";
import { NBUserModel, setNBUserAll, nbUserMemCache } from "../user";
import { isMobile, showError, showMsg, nbLog } from "../util";
import CutDownTimer from "./CutDownTimer";
import { NBCompTouchText } from "./NBCompTouchText";

export type NBRegisterMode = 'full' | 'no_nickname' | 'no_password';

export interface NBCompMobileLoginPros extends ViewProps {
    loginParams?: NBLoginModel,
    registerMode?: NBRegisterMode,
    autoLogin?: boolean,
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


    constructor(props: NBCompMobileLoginPros) {
        super(props);
        this.state = {
            loginParams: props.loginParams || {
                phone: '',
                password: '',
                code: ''
            },
            bySms: props.loginParams !== undefined ? false : true,
            registerParams: {
                userPhone: ''
            },
            showRegister: false
        }
    }

    componentDidMount() {
        if (this.props.loginParams && (this.props.autoLogin !== undefined && this.props.autoLogin)) {
            const self = this;
            const t = setTimeout(() => {
                clearTimeout(t);
                self.submit();
            }, 1000);
        }
    }

    public fetchSMS(phone: string) {
        return NBGateway.getGateway().then(v => {
            return createNBNetworkApi('GET').then(a => a({
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
                    return createNBNetworkApi('POST').then(a => a({
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

        const params = this.state.bySms ? {
            phone: this.state.loginParams.phone,
            code: this.state.loginParams.code
        } : {
                phone: this.state.loginParams.phone,
                password: this.state.loginParams.password
            };
        nbLog('用户登录模块', `${this.state.bySms ? '验证码登录 登录参数' : '密码登录 登录参数'}`, params)
        NBGateway.getGateway()
            .then(v => {
                return createNBNetworkApi('POST').then(a => a({
                    url: `${Constants.BaseDomain}${this.state.bySms ? v.gwUserLogin : '/common/login/password'}`,
                    params
                })).then(vv => {
                    return vv.data;
                })
            }).then((v: ResponseModel) => {
                if (v.status.code === StatusCode.SUCCESS) {
                    nbUserMemCache.currentUser = v.result.user;
                    nbLog('用户登录模块', v.result);
                    return setNBUserAll(v.result).then(is => {
                        if (onLoginSuccess) {
                            onLoginSuccess(v.result);
                        }

                        return is;
                    });
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
        const inputStyle = Platform.OS === 'android' ? { flex: 1, height: 43, lineHeight: 41, margin: 0, padding: 0 } : { flex: 1, margin: 0, padding: 0 };
        if (this.state.showRegister) {
            comp = <View style={{ width: 312, padding: 27, backgroundColor: 'white', borderRadius: 10 }}>
                <Text style={{ fontSize: 24, marginBottom: 20 }}>注册</Text>
                <View style={styles.inputViewStyle}>
                    <NBIconUser style={{ marginLeft: 9, marginTop: 9 }} />
                    <Input style={inputStyle} key="nick_name_input" keyboardType="default" placeholder="请输入您的真实姓名" onChangeText={(userName) => {
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
                    <Input style={inputStyle} key="reg_phone_input" keyboardType="numeric" value={this.state.registerParams.userPhone} placeholder="请输入手机号码" onChangeText={(phone) => {
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
                    <Input style={inputStyle} key="reg_code_input" keyboardType="numeric" placeholder="请输入验证码" onChangeText={(code) => {
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
                    <Input style={inputStyle} secureTextEntry placeholder="请设置您的密码" onChangeText={(password) => {
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
                    <Input style={inputStyle} key="phone_input" keyboardType="numeric" value={this.state.loginParams.phone} placeholder="请输入手机号码" onChangeText={(phone) => {
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
                        <Input style={inputStyle} key="login_code_input" keyboardType="numeric" placeholder="请输入验证码" onChangeText={(code) => {
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
                            <Input style={inputStyle} secureTextEntry onChangeText={(password) => {
                                this.setState({
                                    loginParams: {
                                        ...this.state.loginParams,
                                        password
                                    }
                                })
                            }} placeholder="请输入您的密码" />
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