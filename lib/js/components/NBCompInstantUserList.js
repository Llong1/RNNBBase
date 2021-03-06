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
import { useNavigation } from "@react-navigation/native";
import { Text, View } from "native-base";
import React from "react";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import { getNBInstantUserList } from "../mqtt-part";
import NBUserLogo from "./NBUserLogo";
import { nbLog } from "../util";
var NBCompInstantItem = function (props) {
    var item = props.item, isLast = props.isLast, onPres = props.onPres, themeColor = props.themeColor, instantClient = props.instantClient;
    var navi = useNavigation();
    return <TouchableOpacity onPress={function () {
        if (onPres) {
            onPres(item);
        }
        else {
            navi.navigate('nbInstantDetail', {
                instantUser: item,
                themeColor: themeColor,
                instantClient: instantClient
            });
        }
    }}>
        <View style={{ height: 70, backgroundColor: 'white', borderBottomColor: 'rgba(247, 247, 247, 1)', borderBottomWidth: isLast ? 0 : 1, flexDirection: 'row', paddingLeft: 15, paddingRight: 15 }}>
            <View style={{ width: 40, marginRight: 10, marginTop: 15 }}>
                <NBUserLogo id={item.userId} width={40}/>
            </View>
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, marginTop: 15 }}>{item.userName || '匿名'}</Text>
                <Text style={{ fontSize: 12, lineHeight: 15, color: 'rgba(140, 140, 140, 1)' }}>{item.content}</Text>
            </View>
            <View>
                <Text style={{ fontSize: 12, marginTop: 15, lineHeight: 15, color: 'rgba(140, 140, 140, 1)' }}>{item.createTime}</Text>
            </View>
        </View>
    </TouchableOpacity>;
};
var NBCompInstantUserList = /** @class */ (function (_super) {
    __extends(NBCompInstantUserList, _super);
    function NBCompInstantUserList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            userList: []
        };
        return _this;
    }
    NBCompInstantUserList.prototype.componentDidMount = function () {
        var _this = this;
        var instant = this.props.instant;
        this._msgEmitter = instant.addInstantListener('OnInstantReceiveMessage', this.onInstantMessage.bind(this));
        getNBInstantUserList().then(function (userList) {
            _this.setState({ userList: userList });
        })["catch"](function (err) {
            console.log(err);
        });
    };
    NBCompInstantUserList.prototype.componentWillUnmount = function () {
        if (this._msgEmitter) {
            this._msgEmitter.remove();
        }
        nbLog('即时通讯组件库', '移除即时通讯监听');
    };
    NBCompInstantUserList.prototype.onInstantMessage = function (msg) {
        var userList = [];
        userList.push({
            userId: msg.fromId,
            userName: msg.userName,
            content: msg.msg.content,
            contentType: msg.msg.msgType,
            createTime: msg.pubtime
        });
        this.state.userList.forEach(function (v) {
            if (v.userId != msg.fromId) {
                userList.push(v);
            }
        });
        this.setState({ userList: userList });
    };
    NBCompInstantUserList.prototype.render = function () {
        var _this = this;
        var _a = this.props, isFlatList = _a.isFlatList, onItemPress = _a.onItemPress, themeColor = _a.themeColor, instant = _a.instant;
        return isFlatList !== undefined && isFlatList ? <FlatList data={this.state.userList} renderItem={function (i) {
            return <NBCompInstantItem item={i.item} instantClient={instant} isLast={i.index === _this.state.userList.length - 1} themeColor={themeColor} onPres={onItemPress}/>;
        }}/> : <View>
                {this.state.userList.map(function (v, index) { return <NBCompInstantItem item={v} instantClient={instant} isLast={index === _this.state.userList.length - 1} themeColor={themeColor} onPres={onItemPress}/>; })}
            </View>;
    };
    return NBCompInstantUserList;
}(React.PureComponent));
export { NBCompInstantUserList };
