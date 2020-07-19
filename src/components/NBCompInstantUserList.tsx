import { useNavigation } from "@react-navigation/native";
import { Text, View } from "native-base";
import React from "react";
import { ViewProps, EmitterSubscription } from "react-native";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import { CommunicationListModel, getNBInstantUserList, InstantMessage, InstantMqttClient } from "../mqtt-part";
import NBUserLogo from "./NBUserLogo";
import { NBCompState } from "./types";
import { nbLog } from "../util";

export type NBCompInstantItemPress = (item: CommunicationListModel) => void;

const NBCompInstantItem = (props: {
    item: CommunicationListModel, onPres?: NBCompInstantItemPress, isLast?: boolean,
    themeColor?: string,
    instantClient?: InstantMqttClient,
}) => {
    const { item, isLast, onPres, themeColor, instantClient } = props;
    const navi = useNavigation();
    return <TouchableOpacity onPress={() => {
        if (onPres) {
            onPres(item);
        } else {
            navi.navigate('nbInstantDetail', {
                instantUser: item,
                themeColor,
                instantClient
            });
        }
    }}>
        <View style={{ height: 70, backgroundColor: 'white', borderBottomColor: 'rgba(247, 247, 247, 1)', borderBottomWidth: isLast ? 0 : 1, flexDirection: 'row', paddingLeft: 15, paddingRight: 15 }}>
            <View style={{ width: 40, marginRight: 10, marginTop: 15 }}>
                <NBUserLogo id={item.userId} width={40} />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, marginTop: 15 }}>{item.userName || '匿名'}</Text>
                <Text style={{ fontSize: 12, lineHeight: 15, color: 'rgba(140, 140, 140, 1)' }}>{item.content}</Text>
            </View>
            <View>
                <Text style={{ fontSize: 12, marginTop: 15, lineHeight: 15, color: 'rgba(140, 140, 140, 1)' }}>{item.createTime}</Text>
            </View>
        </View>
    </TouchableOpacity>
}

export interface NBCompInstantUserListProps extends ViewProps {
    instant?: InstantMqttClient,
    isFlatList?: boolean,
    onItemPress?: NBCompInstantItemPress,
    navigation?: any,
    themeColor?: string
}

export interface NBCompInstantUserListState extends NBCompState {
    userList?: Array<CommunicationListModel>
}

export class NBCompInstantUserList extends React.PureComponent<NBCompInstantUserListProps, NBCompInstantUserListState> {
    state = {
        userList: []
    }
    _msgEmitter?: EmitterSubscription;
    componentDidMount() {
        const { instant } = this.props;
        this._msgEmitter = instant.addInstantListener('OnInstantReceiveMessage', this.onInstantMessage.bind(this));

        getNBInstantUserList().then((userList: Array<CommunicationListModel> | null) => {
            this.setState({ userList })
        }).catch(err => {
            console.log(err)
        })
    }

    componentWillUnmount() {
        if (this._msgEmitter) {
            this._msgEmitter.remove();
        }
        nbLog('即时通讯组件库', '移除即时通讯监听');
    }

    protected onInstantMessage(msg: InstantMessage) {
        let userList: Array<CommunicationListModel> = [];
        userList.push({
            userId: msg.fromId,
            userName: msg.userName,
            content: msg.msg.content,
            contentType: msg.msg.mstType,
            createTime: msg.pubtime
        });

        this.state.userList.forEach((v: CommunicationListModel) => {
            if (v.userId != msg.fromId) {
                userList.push(v);
            }
        })

        this.setState({ userList });
    }

    render() {
        const { isFlatList, onItemPress, themeColor, instant } = this.props;
        return isFlatList !== undefined && isFlatList ? <FlatList data={this.state.userList} renderItem={(i: { item: CommunicationListModel, index: number }) => {
            return <NBCompInstantItem item={i.item} instantClient={instant} isLast={i.index === this.state.userList.length - 1} themeColor={themeColor} onPres={onItemPress} />
        }} /> : <View>
                {
                    this.state.userList.map((v: CommunicationListModel, index: number) => <NBCompInstantItem item={v} instantClient={instant} isLast={index === this.state.userList.length - 1} themeColor={themeColor} onPres={onItemPress} />)
                }
            </View>
    }
}