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
import { Text, View } from "native-base";
import { TouchableOpacity } from "react-native";
import { NBIconCubes } from "../../styles";
var BannerHeader = /** @class */ (function (_super) {
    __extends(BannerHeader, _super);
    function BannerHeader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BannerHeader.prototype.render = function () {
        var onPress = this.props.onPress;
        return (onPress ? <TouchableOpacity style={[{ height: 44 }, this.props.style]} onPress={function () {
            if (onPress) {
                onPress();
            }
        }}>
            <View style={{ backgroundColor: 'rgba(251, 109, 58, 1)', flexDirection: 'row', borderTopLeftRadius: 10, borderTopRightRadius: 10, height: 44 }}>
                <View style={{ flex: 1 }}/>
                <View style={{ marginBottom: 18 }}>
                    <View style={{ flex: 1 }}/>
                    <View style={{ width: 40, height: 1, backgroundColor: 'white' }}/>
                </View>
                <View>
                    <View style={{ flex: 1 }}/>
                    <NBIconCubes style={{ marginLeft: 5 }}/>
                    <View style={{ flex: 1 }}/>
                </View>
                <View>
                    <View style={{ flex: 1 }}/>
                    <Text style={{ lineHeight: 16, color: 'white', marginLeft: 5, marginRight: 5 }}>看看以下好货</Text>
                    <View style={{ flex: 1 }}/>
                </View>
                <View style={{ marginBottom: 18 }}>
                    <View style={{ flex: 1 }}/>
                    <View style={{ width: 40, height: 1, backgroundColor: 'white' }}/>
                </View>
                <View style={{ flex: 1 }}/>
            </View>
        </TouchableOpacity> : <View style={[{ backgroundColor: 'rgba(251, 109, 58, 1)', flexDirection: 'row', borderTopLeftRadius: 10, borderTopRightRadius: 10, height: 44 }, this.props.style]}>
                <View style={{ flex: 1 }}/>
                <View style={{ marginBottom: 18 }}>
                    <View style={{ flex: 1 }}/>
                    <View style={{ width: 40, height: 1, backgroundColor: 'white' }}/>
                </View>
                <View>
                    <View style={{ flex: 1 }}/>
                    <NBIconCubes style={{ marginLeft: 5 }}/>
                    <View style={{ flex: 1 }}/>
                </View>
                <View>
                    <View style={{ flex: 1 }}/>
                    <Text style={{ lineHeight: 16, color: 'white', marginLeft: 5, marginRight: 5 }}>看看以下好货</Text>
                    <View style={{ flex: 1 }}/>
                </View>
                <View style={{ marginBottom: 18 }}>
                    <View style={{ flex: 1 }}/>
                    <View style={{ width: 40, height: 1, backgroundColor: 'white' }}/>
                </View>
                <View style={{ flex: 1 }}/>
            </View>);
    };
    return BannerHeader;
}(React.Component));
export default BannerHeader;
