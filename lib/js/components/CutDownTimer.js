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
import { View, Text } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
var CutDownTimer = /** @class */ (function (_super) {
    __extends(CutDownTimer, _super);
    function CutDownTimer(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            limit: props.timeLimit || 60,
            isStarted: false
        };
        _this.isStoped = false;
        if (props.formatLabel) {
            _this._formatLabel = props.formatLabel;
        }
        else {
            _this._formatLabel = function (time, isStarted) {
                if (!isStarted) {
                    return "获取验证码";
                }
                return "\u91CD\u65B0\u53D1\u9001\u9A8C\u8BC1\u7801\uFF08" + time + "\uFF09s";
            };
        }
        return _this;
    }
    CutDownTimer.prototype.componentDidMount = function () {
        if (this.props.autoRun) {
            this.start();
        }
    };
    CutDownTimer.prototype.componentWillUnmount = function () {
        if (this.timeHolder) {
            clearTimeout(this.timeHolder);
            this.timeHolder = null;
        }
        this.isStoped = true;
    };
    CutDownTimer.prototype.start = function () {
        if (this.timeHolder) {
            clearTimeout(this.timeHolder);
            this.timeHolder = null;
        }
        this.isStoped = false;
        var self = this;
        var func = function () {
            if (self.timeHolder) {
                clearTimeout(self.timeHolder);
                self.timeHolder = null;
            }
            self.setState({
                isStarted: true
            });
            self.timeHolder = setTimeout(function () {
                if (self.isStoped) {
                    self.reset();
                    return;
                }
                var lm = self.state.limit - 1;
                if (lm >= 0) {
                    self.setState({
                        limit: lm
                    });
                    func();
                }
                else {
                    self.reset();
                }
            }, 1000);
        };
        func();
        if (this.props.onStart) {
            this.props.onStart();
        }
    };
    CutDownTimer.prototype.reset = function () {
        if (this.timeHolder) {
            clearTimeout(this.timeHolder);
            this.timeHolder = null;
        }
        this.setState({
            limit: this.props.timeLimit || 60,
            isStarted: false
        });
        this.isStoped = true;
        if (this.props.onEnd) {
            this.props.onEnd();
        }
    };
    CutDownTimer.prototype.render = function () {
        var _this = this;
        var props = this.props;
        return this.state.isStarted ? <View style={[{ alignItems: 'center' }, props.style]}>
            <Text style={{ fontSize: 12, color: 'black' }}>{this._formatLabel(this.state.limit, true)}</Text>
        </View> : <TouchableOpacity style={[{ alignItems: 'center' }, props.style]} onPress={function () {
            if (_this.props.validateInput) {
                if (_this.props.validateInput()) {
                    _this.start();
                }
            }
            else {
                _this.start();
            }
        }}>
                <Text style={{ fontSize: 12, color: 'black' }}>{this._formatLabel(this.state.limit, false)}</Text>
            </TouchableOpacity>;
    };
    return CutDownTimer;
}(React.Component));
export default CutDownTimer;
