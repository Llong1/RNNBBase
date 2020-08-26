var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { Input, Text, View } from "native-base";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Constants from "../Constants";
import { NBGateway, StatusCode } from "../api";
import { createAxiosClient } from "../network";
import { NBIconArrowRight, NBIconLock, NBIconPhone, NBIconSafeCode, NBIconUser } from "../styles";
import { setNBUserAll, nbUserMemCache } from "../user";
import { isMobile, showError, showMsg, nbLog } from "../util";
import CutDownTimer from "./CutDownTimer";
import { NBCompTouchText } from "./NBCompTouchText";
var NBCompMobileLogin = /** @class */ (function (_super) {
    __extends(NBCompMobileLogin, _super);
    function NBCompMobileLogin(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
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
        };
        return _this;
    }
    NBCompMobileLogin.prototype.componentDidMount = function () {
        if (this.props.loginParams && (this.props.autoLogin !== undefined && this.props.autoLogin)) {
            var self_1 = this;
            var t_1 = setTimeout(function () {
                clearTimeout(t_1);
                self_1.submit();
            }, 1000);
        }
    };
    NBCompMobileLogin.prototype.fetchSMS = function (phone) {
        return NBGateway.getGateway().then(function (v) {
            return createAxiosClient('GET').then(function (a) { return a({
                url: "" + Constants.BaseDomain + v.gwFetchSms + "?phone=" + phone
            }).then(function (d) { return d.data; }); }).then(function (r) {
                if (r.status.code === StatusCode.SUCCESS) {
                    showMsg('获取验证码成功！');
                    return true;
                }
                return false;
            });
        });
    };
    NBCompMobileLogin.prototype.submit = function () {
        var _this = this;
        var _a = this.props, onLoginSuccess = _a.onLoginSuccess, onLoginFail = _a.onLoginFail, onRegisterSuccess = _a.onRegisterSuccess, onRegisterFail = _a.onRegisterFail, showToastMsg = _a.showToastMsg;
        var show = showToastMsg === undefined ? true : showToastMsg;
        if (this.state.showRegister) {
            NBGateway.getGateway()
                .then(function (c) {
                return createAxiosClient('POST').then(function (a) { return a({
                    url: "" + Constants.BaseDomain + c.gwUserRegister,
                    params: _this.state.registerParams
                }); }).then(function (vv) {
                    return vv.data;
                });
            })
                .then(function (v) {
                if (v.status.code === StatusCode.SUCCESS) {
                    if (onRegisterSuccess) {
                        onRegisterSuccess(v.result);
                    }
                    return true;
                }
                else {
                    onRegisterFail && onRegisterFail(v.status);
                    if (show) {
                        var message = v.status.message;
                        if (Constants.isDebug) {
                            message = message + "\uFF0C\u9519\u8BEF\u7801\uFF1A" + v.status.code;
                        }
                        showError(message);
                    }
                    return false;
                }
            }).then(function (is) {
                if (is && show) {
                    showMsg('注册成功！');
                }
            });
            return;
        }
        var params = this.state.bySms ? {
            phone: this.state.loginParams.phone,
            code: this.state.loginParams.code
        } : {
            phone: this.state.loginParams.phone,
            password: this.state.loginParams.password
        };
        nbLog('用户登录模块', "" + (this.state.bySms ? '验证码登录 登录参数' : '密码登录 登录参数'), params);
        NBGateway.getGateway()
            .then(function (v) {
            return createAxiosClient('POST').then(function (a) { return a({
                url: "" + Constants.BaseDomain + (_this.state.bySms ? v.gwUserLogin : '/common/login/password'),
                params: params
            }); }).then(function (vv) {
                return vv.data;
            });
        }).then(function (v) {
            if (v.status.code === StatusCode.SUCCESS) {
                nbUserMemCache.currentUser = v.result.user;
                nbLog('用户登录模块', v.result);
                return setNBUserAll(v.result).then(function (is) {
                    if (onLoginSuccess) {
                        onLoginSuccess(v.result);
                    }
                    return is;
                });
            }
            else {
                onLoginFail && onLoginFail(v.status);
                if (show) {
                    var message = v.status.message;
                    if (Constants.isDebug) {
                        message = message + "\uFF0C\u9519\u8BEF\u7801\uFF1A" + v.status.code;
                    }
                    showError(message);
                }
                return false;
            }
        }).then(function (is) {
            if (is && show) {
                showMsg('登录成功！');
            }
        })["catch"](function (err) {
            onLoginFail && onLoginFail(err);
            if (show) {
                showError("\u767B\u5F55\u51FA\u9519\uFF1A" + (typeof err === 'string' ? err : err.message));
            }
        });
    };
    NBCompMobileLogin.prototype.render = function () {
        var _this = this;
        var loginBtnColor = this.props.loginBtnColor === undefined ? 'rgba(251, 109, 58, 1)' : this.props.loginBtnColor;
        var comp = null;
        if (this.state.showRegister) {
            comp = <View style={{ width: 312, padding: 27, backgroundColor: 'white', borderRadius: 10 }}>
                <Text style={{ fontSize: 24, marginBottom: 20 }}>注册</Text>
                <View style={styles.inputViewStyle}>
                    <NBIconUser style={{ marginLeft: 9, marginTop: 9 }}/>
                    <Input style={{ flex: 1, height: 43, lineHeight: 41, margin: 0, padding: 0 }} key="nick_name_input" keyboardType="default" placeholder="请输入您的真实姓名" onChangeText={function (userName) {
                _this.setState({
                    registerParams: __assign(__assign({}, _this.state.registerParams), { userName: userName })
                });
            }}/>
                </View>
                <View style={[styles.inputViewStyle, { marginTop: 20 }]}>
                    <NBIconPhone style={{ marginLeft: 9, marginTop: 9 }}/>
                    <Input style={{ flex: 1, height: 43, lineHeight: 41, margin: 0, padding: 0 }} key="reg_phone_input" keyboardType="numeric" value={this.state.registerParams.userPhone} placeholder="请输入手机号码" onChangeText={function (phone) {
                _this.setState({
                    registerParams: __assign(__assign({}, _this.state.registerParams), { userPhone: phone })
                });
            }}/>
                </View>
                <View style={[styles.inputViewStyle, { marginTop: 20 }]}>
                    <NBIconSafeCode style={{ marginLeft: 9, marginTop: 9 }}/>
                    <Input style={{ flex: 1, height: 43, lineHeight: 41, margin: 0, padding: 0 }} key="reg_code_input" keyboardType="numeric" placeholder="请输入验证码" onChangeText={function (code) {
                _this.setState({
                    registerParams: __assign(__assign({}, _this.state.registerParams), { code: code })
                });
            }}/>
                    <View style={{ marginRight: 6 }}>
                        <View style={{ flex: 1 }}/>
                        <CutDownTimer validateInput={function () {
                if (_this.state.registerParams && isMobile(_this.state.registerParams.userPhone)) {
                    _this.fetchSMS(_this.state.registerParams.userPhone);
                    return true;
                }
                return false;
            }}/>
                        <View style={{ flex: 1 }}/>
                    </View>
                </View>
                <View style={[styles.inputViewStyle, { marginTop: 20, marginBottom: 20 }]}>
                    <NBIconLock style={{ marginLeft: 9, marginTop: 9 }}/>
                    <Input style={{ flex: 1, height: 43, lineHeight: 41, margin: 0, padding: 0 }} secureTextEntry placeholder="请设置您的密码" onChangeText={function (password) {
                _this.setState({
                    registerParams: __assign(__assign({}, _this.state.registerParams), { password: password })
                });
            }}/>
                </View>
                <View style={{ flexDirection: 'row', paddingBottom: 20 }}>
                    <NBCompTouchText text="已注册？去登录" onPress={function () {
                _this.setState({
                    showRegister: false
                });
            }}/>
                </View>
            </View>;
        }
        else {
            comp = <View style={{ width: 312, padding: 27, backgroundColor: 'white', borderRadius: 10 }}>
                <Text style={{ fontSize: 24 }}>登录</Text>
                <View style={[styles.inputViewStyle, { marginTop: 20 }]}>
                    <NBIconPhone style={{ marginLeft: 9, marginTop: 9 }}/>
                    <Input style={{ flex: 1, height: 43, lineHeight: 41, margin: 0, padding: 0 }} key="phone_input" keyboardType="numeric" value={this.state.loginParams.phone} placeholder="请输入手机号码" onChangeText={function (phone) {
                _this.setState({
                    loginParams: __assign(__assign({}, _this.state.loginParams), { phone: phone })
                });
            }}/>
                </View>
                {this.state.bySms ? <View style={[styles.inputViewStyle, { marginTop: 20 }]}>
                        <NBIconSafeCode style={{ marginLeft: 9, marginTop: 9 }}/>
                        <Input style={{ flex: 1, height: 43, lineHeight: 41, margin: 0, padding: 0 }} key="login_code_input" keyboardType="numeric" placeholder="请输入验证码" onChangeText={function (code) {
                _this.setState({
                    loginParams: __assign(__assign({}, _this.state.loginParams), { code: code })
                });
            }}/>
                        <View style={{ marginRight: 6 }}>
                            <View style={{ flex: 1 }}/>
                            <CutDownTimer validateInput={function () {
                if (_this.state.loginParams && isMobile(_this.state.loginParams.phone)) {
                    _this.fetchSMS(_this.state.loginParams.phone);
                    return true;
                }
                return false;
            }}/>
                            <View style={{ flex: 1 }}/>
                        </View>
                    </View> : <View style={[styles.inputViewStyle, { marginTop: 20 }]}>
                            <NBIconLock style={{ marginLeft: 9, marginTop: 9 }}/>
                            <Input style={{ flex: 1, height: 43, lineHeight: 41, margin: 0, padding: 0 }} secureTextEntry onChangeText={function (password) {
                _this.setState({
                    loginParams: __assign(__assign({}, _this.state.loginParams), { password: password })
                });
            }} placeholder="请设置您的密码"/>
                        </View>}
                <View style={{ marginTop: 20, flexDirection: 'row', paddingBottom: 20 }}>
                    <NBCompTouchText text={this.state.bySms ? "密码登录" : "短信登录"} onPress={function () {
                _this.setState({
                    bySms: !_this.state.bySms
                });
            }}/>
                    <NBCompTouchText text="没有账号？去注册" style={{ marginLeft: 15 }} onPress={function () {
                _this.setState({
                    showRegister: true
                });
            }}/>
                </View>
            </View>;
        }
        return <View>
            {comp}
            <View style={{ alignItems: 'center', marginTop: -32 }}>
                <TouchableOpacity disabled={!isMobile(this.state.showRegister ? this.state.registerParams.userPhone : this.state.loginParams.phone)} onPress={this.submit.bind(this)} style={{ backgroundColor: loginBtnColor, width: 64, height: 64, borderRadius: 64, alignItems: 'center', overflow: 'hidden', padding: 0, margin: 0 }}>
                    <View style={{ width: 64, height: 64, alignItems: 'center' }}>
                        <View style={{ flex: 1 }}/>
                        <NBIconArrowRight size={36} color="white"/>
                        <View style={{ flex: 1 }}/>
                    </View>
                </TouchableOpacity>
            </View>
        </View>;
    };
    return NBCompMobileLogin;
}(React.Component));
export { NBCompMobileLogin };
var styles = StyleSheet.create({
    inputViewStyle: { backgroundColor: 'rgba(247, 247, 247, 1)', borderRadius: 5, flexDirection: 'row', height: 43, overflow: "hidden" }
});
