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
import React from "react";
import { Form, Item, Input, Button, Text } from "native-base";
import CutDownTimer from "./CutDownTimer";
import { isMobile } from "../util";
var LoginMobile = /** @class */ (function (_super) {
    __extends(LoginMobile, _super);
    function LoginMobile(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            type: props.loginType || 'smsCode',
            loginParams: {},
            isLogining: false
        };
        return _this;
    }
    LoginMobile.prototype.UNSAFE_componentWillReceiveProps = function (props) {
        if (props.loginType && props.loginType !== this.state.type) {
            this.setState({
                type: props.loginType
            });
        }
    };
    LoginMobile.prototype.render = function () {
        var _this = this;
        return <Form>
            <Item success={isMobile(this.state.loginParams.mobile)}>
                <Input placeholder="请输入手机号码" keyboardType="numeric" onChangeText={function (mobile) {
            _this.setState({
                loginParams: __assign(__assign({}, _this.state.loginParams), { mobile: mobile })
            });
        }}/>
            </Item>
            <Item>
                {this.state.type === 'password' ? <Input placeholder="请输入密码" secureTextEntry onChangeText={function (password) {
            _this.setState({
                loginParams: __assign(__assign({}, _this.state.loginParams), { password: password })
            });
        }}/> : <>
                            <Input placeholder="请输入验证码" keyboardType="numeric" onChangeText={function (smsCode) {
            _this.setState({
                loginParams: __assign(__assign({}, _this.state.loginParams), { smsCode: smsCode })
            });
        }}/>
                            <CutDownTimer validateInput={function () {
            if (_this.state.loginParams && isMobile(_this.state.loginParams.mobile)) {
                if (_this.props.onFetchSmsCode) {
                    return _this.props.onFetchSmsCode(_this.state.loginParams.mobile);
                }
            }
            return false;
        }}/>
                        </>}
            </Item>


            <Button full style={{ marginTop: 15 }} onPress={function () {
            if (_this.props.submit) {
                _this.props.submit(__assign({ loginType: _this.state.type }, _this.state.loginParams));
            }
        }}>
                <Text>登录</Text>
            </Button>
        </Form>;
    };
    return LoginMobile;
}(React.Component));
export { LoginMobile };
