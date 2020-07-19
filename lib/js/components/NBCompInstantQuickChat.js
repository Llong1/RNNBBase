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
import { getNBUserInfo } from "../user";
import { isEmptyObj, showError } from "../util";
import { NBIconMessageX } from "../styles";
import NBBaseCxt from "../NBBaseCxt";
import NBCompApp from "./NBCompApp";
import { NBPages } from "./types";
var NBCompInstantQuickChat = /** @class */ (function (_super) {
    __extends(NBCompInstantQuickChat, _super);
    function NBCompInstantQuickChat(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            id: props.id,
            userName: props.userName
        };
        return _this;
    }
    NBCompInstantQuickChat.prototype.render = function () {
        var _this = this;
        return <NBIconMessageX size={this.props.size || 22} style={[{}, this.props.style]} onPress={function () {
            var client = _this.props.client === undefined ? NBBaseCxt.defaultInstantClient : _this.props.client;
            if (!client) {
                showError('未设置即时通讯客户端或未初始化即时通讯客户端！');
                return;
            }
            var _a = _this.props, id = _a.id, userName = _a.userName;
            if (isEmptyObj(userName)) {
                getNBUserInfo(id).then(function (v) {
                    NBCompApp.navigation.navigate(NBPages.InstantPage, {
                        instantUser: {
                            userId: id,
                            userName: v.userName
                        },
                        themeColor: _this.props.themeColor,
                        instantClient: client
                    });
                });
            }
            else {
                NBCompApp.navigation.navigate(NBPages.InstantPage, {
                    instantUser: {
                        userId: id,
                        userName: userName
                    },
                    themeColor: _this.props.themeColor,
                    instantClient: client
                });
            }
        }}/>;
    };
    return NBCompInstantQuickChat;
}(React.Component));
export { NBCompInstantQuickChat };
