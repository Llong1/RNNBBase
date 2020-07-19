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
import { View } from "native-base";
import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { getNBUserInfo } from "../user";
var NBUserLogo = /** @class */ (function (_super) {
    __extends(NBUserLogo, _super);
    function NBUserLogo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            user: undefined
        };
        return _this;
    }
    NBUserLogo.prototype.componentDidMount = function () {
        var _this = this;
        var id = this.props.id;
        if (id) {
            getNBUserInfo(id).then(function (v) {
                _this.setState({ user: v });
            });
        }
    };
    NBUserLogo.prototype.render = function () {
        var _a = this.props, id = _a.id, width = _a.width, onPress = _a.onPress, isRound = _a.isRound, url = _a.url;
        var w = width === undefined ? 70 : width;
        var user = this.state.user;
        var userLogo = null;
        var borderRadius = isRound === undefined ? w : (isRound ? w : 0);
        if (user) {
            userLogo = <Image source={{
                uri: user.userLogo
            }} style={{ width: w, height: w, borderRadius: borderRadius }} resizeMode="stretch"/>;
        }
        return onPress === undefined ? <View style={{
            width: w,
            height: w,
            borderRadius: borderRadius,
            overflow: 'hidden'
        }}>
            {userLogo}
        </View> : <TouchableOpacity onPress={function () {
            onPress(user);
        }} style={{
            width: w,
            height: w,
            borderRadius: borderRadius,
            overflow: 'hidden'
        }}>
                {userLogo}
            </TouchableOpacity>;
    };
    return NBUserLogo;
}(React.Component));
export default NBUserLogo;
