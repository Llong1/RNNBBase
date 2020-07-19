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
import { Animated, Easing, View } from "react-native";
var NBCompAnimaRouteView = /** @class */ (function (_super) {
    __extends(NBCompAnimaRouteView, _super);
    function NBCompAnimaRouteView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.spinValue = new Animated.Value(0);
        _this.isStoped = false;
        //旋转方法
        _this.spin = function () {
            var speed = _this.props.speed;
            _this.spinValue.setValue(0);
            Animated.timing(_this.spinValue, {
                toValue: 1,
                duration: speed === undefined ? 4000 : speed,
                easing: Easing.linear,
                useNativeDriver: false
            }).start(function () {
                if (!_this.isStoped) {
                    _this.spin();
                }
            });
        };
        return _this;
    }
    NBCompAnimaRouteView.prototype.componentDidMount = function () {
        this.isStoped = false;
        this.spin();
    };
    NBCompAnimaRouteView.prototype.componentWillUnmount = function () {
        this.isStoped = true;
    };
    NBCompAnimaRouteView.prototype.render = function () {
        var spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'] //输出值
        });
        return <View style={[{ alignItems: 'center' }, this.props.style]}>
            <Animated.View style={{
            transform: [{ rotate: spin }]
        }}>
                {this.props.children}
            </Animated.View>
        </View>;
    };
    return NBCompAnimaRouteView;
}(React.PureComponent));
export default NBCompAnimaRouteView;
