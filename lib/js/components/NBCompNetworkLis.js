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
import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Text } from "native-base";
import NetInfo from "@react-native-community/netinfo";
import { NBIconNotice, NBIcons } from "../styles";
var NBCompNetworkLis = /** @class */ (function (_super) {
    __extends(NBCompNetworkLis, _super);
    function NBCompNetworkLis(props) {
        var _this = _super.call(this, props) || this;
        _this._networkListener = function (state) {
            var trigger = _this.props.trigger === undefined ? true : _this.props.trigger;
            if (!_this.state.triggerSuccess) {
                if (state.isConnected) {
                    if (trigger) {
                        _this._invokeConnected().then(function (triggerSuccess) {
                            _this.setState({
                                triggerSuccess: triggerSuccess,
                                isConnected: true
                            });
                        })["catch"](function (err) {
                            console.warn(err);
                            _this.setState({
                                isConnected: true
                            });
                        });
                    }
                    else {
                        _this.setState({
                            isConnected: true
                        });
                    }
                }
                else {
                    _this.setState({
                        isConnected: state.isConnected
                    });
                }
            }
            else {
                _this.setState({
                    isConnected: state.isConnected
                });
            }
        };
        _this.state = {
            isConnected: true,
            triggerSuccess: false,
            trigger: props.trigger === undefined ? true : props.trigger
        };
        return _this;
    }
    NBCompNetworkLis.prototype.componentDidMount = function () {
        var _this = this;
        NetInfo.fetch().then(function (state) {
            if (state.isConnected) {
                _this._networkListener(state);
            }
            return true;
        }).then(function (v) {
            _this._networkSub = NetInfo.addEventListener(_this._networkListener.bind(_this));
        });
    };
    NBCompNetworkLis.prototype.componentWillUnmount = function () {
        if (this._networkSub) {
            this._networkSub();
            this._networkSub = undefined;
        }
    };
    NBCompNetworkLis.prototype.UNSAFE_componentWillReceiveProps = function (props) {
        var _this = this;
        if (props.trigger !== undefined && props.trigger) {
            var oldTrigger = this.state.trigger;
            if (oldTrigger) {
                return;
            }
            this._invokeConnected().then(function (triggerSuccess) {
                _this.setState({
                    triggerSuccess: triggerSuccess,
                    isConnected: true
                });
            });
        }
    };
    NBCompNetworkLis.prototype._invokeConnected = function () {
        var onConnected = this.props.onNetworkConnected;
        var trigger = this.props.trigger === undefined ? true : this.props.trigger;
        return new Promise(function (res, rej) {
            if (!trigger) {
                res(false);
                return;
            }
            if (onConnected === undefined) {
                res(true);
                return;
            }
            try {
                var ret = onConnected();
                if (ret === undefined) {
                    res(true);
                    return;
                }
                if (ret.then) {
                    ret.then(res)["catch"](rej);
                }
                else {
                    res(false);
                }
            }
            catch (error) {
                rej(error);
                return;
            }
        });
    };
    NBCompNetworkLis.prototype.render = function () {
        var _this = this;
        if (this.props.showView !== undefined && !this.props.showView) {
            return <View />;
        }
        if (this.state.isConnected) {
            return <View />;
        }
        var onPressTigger = this.props.onPressTigger;
        return <View style={[{ height: 43 }, this.props.style]}>
            <TouchableOpacity activeOpacity={0.8} onPress={function () {
            if (onPressTigger !== undefined && onPressTigger) {
                _this._invokeConnected().then(function (is) {
                    _this.setState({
                        triggerSuccess: is
                    });
                });
            }
        }}>
                <View style={[{ backgroundColor: 'rgba(245, 225, 228, 1)', height: 43, flexDirection: 'row', paddingLeft: 23 }]}>
                    <View>
                        <View style={{ flex: 1 }}/>
                        <NBIconNotice />
                        <View style={{ flex: 1 }}/>
                    </View>
                    <View style={{ marginLeft: 8 }}>
                        <View style={{ flex: 1 }}/>
                        <Text style={{ fontSize: 14, color: 'rgba(236, 101, 110, 1)' }}>当前网络不给力，请检查网络设置</Text>
                        <View style={{ flex: 1 }}/>
                    </View>
                    <View>
                        <View style={{ flex: 1 }}/>
                        <NBIcons.NBIconArrowRight size={20} color="rgba(236, 101, 110, 1)"/>
                        <View style={{ flex: 1 }}/>
                    </View>
                </View>
            </TouchableOpacity>
        </View>;
    };
    return NBCompNetworkLis;
}(React.Component));
export default NBCompNetworkLis;
