import { useNavigation } from "@react-navigation/native";
import { Text, View } from "native-base";
import React from "react";
import { EmitterSubscription, FlatList, ViewProps } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CommunicationListModel, getNBInstantUserList, InstantMessage, InstantMqttClient } from "../../mqtt-part";
import { nbLog } from "../../util";
import NBUserLogo from "../NBUserLogo";
import { NBCompState } from "../types";
import NBCompApp from "../NBCompApp";

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

const _ItemWrapper = (props: { item: CommunicationListModel, instantClient?: InstantMqttClient, themeColor?: string, comp?: any }) => {
    const navi = useNavigation();
    return <TouchableOpacity onPress={() => {
        navi.navigate('nbInstantDetail', {
            instantUser: props.item,
            themeColor: props.themeColor,
            instantClient: props.instantClient
        });
    }}>
        {props.comp}
    </TouchableOpacity>
}

export interface NBCompInstantUserListProps extends ViewProps {
    instant?: InstantMqttClient,
    onItemPress?: NBCompInstantItemPress,
    themeColor?: string,
    renderItem?: (item: CommunicationListModel, index: number) => React.ReactElement | null
}

export interface NBCompInstantUserListState extends NBCompState {
    userList?: Array<CommunicationListModel>
}

export class NBCompInstantUserList extends React.PureComponent<NBCompInstantUserListProps, NBCompInstantUserListState> {

    constructor(props: NBCompInstantUserListProps) {
        super(props);
        this.state = {
            userList: []
        };

        NBCompApp.configInstant(props.instant);
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
            contentType: msg.msg.msgType,
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
        const { onItemPress, themeColor, instant, renderItem } = this.props;
        return <FlatList style={[{ flex: 1 }, this.props.style]} data={this.state.userList} renderItem={(info: { item: CommunicationListModel, index: number }) => {
            let comp = renderItem(info.item, info.index);
            if (!comp) {
                return <NBCompInstantItem item={info.item} instantClient={instant} isLast={info.index === this.state.userList.length - 1} themeColor={themeColor} onPres={onItemPress} />
            }
            return <_ItemWrapper item={info.item} instantClient={instant} themeColor={themeColor} comp={comp} />;
        }} />
    }
}