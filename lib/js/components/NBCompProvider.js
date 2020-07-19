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
import { Modal, View } from "react-native";
import { addNBEventListener } from "../events";
import { NBCompAnimaLoadingModal } from "./anamations";
var NBCompProvider = /** @class */ (function (_super) {
    __extends(NBCompProvider, _super);
    function NBCompProvider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isLoading: false
        };
        return _this;
    }
    NBCompProvider.prototype.componentDidMount = function () {
        this.emitterSub = addNBEventListener('_nb_event_loading', this.show.bind(this));
    };
    NBCompProvider.prototype.componentWillUnmount = function () {
        if (this.emitterSub) {
            this.emitterSub.remove();
            this.emitterSub = undefined;
        }
    };
    NBCompProvider.prototype.show = function (e) {
        this.setState({
            isLoading: e.isLoading
        });
    };
    NBCompProvider.prototype.render = function () {
        return <View style={[{ flex: 1 }, this.props.style]}>
            <Modal visible={this.state.isLoading} transparent>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={{ flex: 1 }}/>
                    <NBCompAnimaLoadingModal />
                    <View style={{ flex: 1 }}/>
                </View>
            </Modal>
            {this.props.children}
        </View>;
    };
    return NBCompProvider;
}(React.Component));
export default NBCompProvider;
