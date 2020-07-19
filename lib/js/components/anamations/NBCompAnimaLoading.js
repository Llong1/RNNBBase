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
import NBCompAnimaRouteView from "./NBCompAnimaRouteView";
import { NBIcons } from "../../styles";
import { View, Text } from "native-base";
var NBCompAnimaLoading = /** @class */ (function (_super) {
    __extends(NBCompAnimaLoading, _super);
    function NBCompAnimaLoading() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NBCompAnimaLoading.prototype.render = function () {
        return <NBCompAnimaRouteView speed={2000}>
            <NBIcons.NBIconLoading size={this.props.size || 24} color="white"/>
        </NBCompAnimaRouteView>;
    };
    return NBCompAnimaLoading;
}(React.Component));
export { NBCompAnimaLoading };
var NBCompAnimaLoadingModal = /** @class */ (function (_super) {
    __extends(NBCompAnimaLoadingModal, _super);
    function NBCompAnimaLoadingModal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NBCompAnimaLoadingModal.prototype.render = function () {
        return <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', alignItems: 'center', borderRadius: 6, width: 120, height: 120, paddingTop: 12 }}>
            <NBCompAnimaLoading size={this.props.iconSize || 54}/>
            <Text style={{ fontSize: 14, color: 'white', marginTop: 12 }}>{this.props.msg || "加载中..."}</Text>
        </View>;
    };
    return NBCompAnimaLoadingModal;
}(React.Component));
export { NBCompAnimaLoadingModal };
