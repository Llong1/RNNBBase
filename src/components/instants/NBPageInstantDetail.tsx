import moment from "moment";
import { Container, Content, Footer, Header, Input, Text, View } from "native-base";
import React from "react";
import { Dimensions, Platform, ScrollView, TouchableOpacity, EmitterSubscription } from "react-native";
import { SvgXml } from "react-native-svg";
import { CommunicationHistoryListModel, CommunicationListModel, getNBInstantMsgList, InstantMessage, InstantMqttClient } from "../../mqtt-part";
import { NBIconArrowLeft } from "../../styles";
import { nbUserMemCache, NBUserModel } from "../../user";
import { isEmptyObj, nbLog, showError } from "../../util";
import NBUserLogo from "../NBUserLogo";
import { BaseAppPage, BaseAppPagePros, NBPages } from "../types";
import NBCompApp from "../NBCompApp";

const Screens = Dimensions.get('window');

class IMDetail extends React.Component<{ detail: InstantMessage, isSelf?: boolean, isLast?: boolean }> {
    render() {
        const { detail, isSelf, isLast } = this.props;
        if (isSelf) {
            return <View style={{ flexDirection: 'row', paddingRight: 20, width: Screens.width, paddingTop: 10, paddingBottom: 10, marginBottom: isLast ? 56 : 0 }}>
                <View style={{ marginRight: 10, flex: 1 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1 }} />
                        <Text style={{ color: 'rgba(189, 189, 189, 1)', fontSize: 10, lineHeight: 12 }}>{detail.pubtime}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1 }} />
                        <Text style={{ minHeight: 41, minWidth: 70, marginLeft: 20, backgroundColor: 'rgba(80, 62, 157, 1)', color: 'white', fontSize: 13, borderBottomRightRadius: 22, borderTopLeftRadius: 22, borderBottomLeftRadius: 22, padding: 10 }}>{detail.msg.content}</Text>
                    </View>
                </View>
                <View style={{ width: 40 }}>
                    <NBUserLogo id={detail.fromId} width={40} />
                </View>
            </View>
        }
        return <View style={{ flexDirection: 'row', paddingLeft: 20, paddingTop: 10, paddingBottom: 10, marginBottom: isLast ? 22 : 0 }}>
            <View style={{ width: 40 }}>
                <NBUserLogo id={detail.fromId} width={40} />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={{ color: 'rgba(189, 189, 189, 1)', fontSize: 10, lineHeight: 12 }}>{detail.pubtime}</Text>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Text style={{ minHeight: 41, minWidth: 70, marginRight: 20, backgroundColor: 'rgba(226, 226, 231, 1)', color: 'rgba(94, 99, 125, 1)', fontSize: 13, borderBottomRightRadius: 22, borderTopRightRadius: 22, borderBottomLeftRadius: 22, padding: 10 }}>{detail.msg.content}</Text>
                    <View style={{ flex: 1 }} />
                </View>
            </View>
        </View>
    }
}

export interface NBPageInstantDetailProps extends BaseAppPagePros {
    themeColor?: string,
    instantUser?: CommunicationListModel,
    instantClient?: InstantMqttClient,
    user?: NBUserModel
}

export default class NBPageInstantDetail extends BaseAppPage<NBPageInstantDetailProps, {
    msg?: string, msgList?: Array<InstantMessage>
}> {
    state = {
        msg: '',
        msgList: []
    }

    _scrollView?: ScrollView;
    _msgEmitter?: EmitterSubscription;

    componentDidMount() {
        const instantClient: InstantMqttClient = this.props.route.params.instantClient || NBCompApp.instantConfig.instantClient;
        const { instantUser } = this.props.route.params;
        instantClient.focusUserID = instantUser.userId;
        getNBInstantMsgList(instantUser.userId).then((v: Array<CommunicationHistoryListModel> | null) => {
            if (v) {
                v.reverse().map((v: CommunicationHistoryListModel) => {
                    this.appendInstantMsg({
                        toId: v.toUserId,
                        fromId: v.userId,
                        msg: {
                            msgType: v.contentType,
                            content: v.content
                        },
                        userName: v.userName,
                        pubtime: v.createTime
                    })
                })
                this._msgEmitter = instantClient.addInstantListener('OnInstantReceiveMessage', this.appendInstantMsg.bind(this));
            } else {
                this._msgEmitter = instantClient.addInstantListener('OnInstantReceiveMessage', this.appendInstantMsg.bind(this));
            }
        })
    }

    componentWillUnmount() {
        const instantClient: InstantMqttClient = this.props.route.params.instantClient;
        instantClient.focusUserID = undefined;
        if (this._msgEmitter) {
            this._msgEmitter.remove();
        }
        nbLog('即时通讯组件库', '移除即时通讯监听');
    }

    private appendInstantMsg(msg: InstantMessage) {
        const _this = this;
        const str = NBCompApp.navigation.getCurrentRoute();
        if (str === undefined || str.name !== NBPages.InstantPage || _this === undefined || _this === null) {
            nbLog('即时通讯组件库', '非聊天详情页面，不响应');
            const instantClient: InstantMqttClient = this.props.route.params.instantClient;
            return;
        }
        const { instantUser } = this.props.route.params;
        if (instantUser.userId === msg.fromId || instantUser.userId === msg.toId) {
            const msgList = [...this.state.msgList];
            msgList.push(msg);
            this.setState({
                msgList
            }, () => {
                requestAnimationFrame(() => {
                    try {
                        const h = msgList.length * Screens.height / 2;
                        nbLog('即时通讯组件库', '新增消息', msg, '滚动位移', h);
                        _this._scrollView.scrollTo({
                            y: h
                        })
                    } catch (e) {

                    }
                })
            });
        }
    }

    render() {
        const { themeColor, instantUser, instantClient } = this.props.route.params;
        const currentUser: NBUserModel | undefined = this.props.user || nbUserMemCache.currentUser;
        const backgroundColor = themeColor === undefined ? 'rgba(247, 247, 247, 1)' : themeColor;
        return <Container style={{ backgroundColor }}>
            <Header style={{ backgroundColor: 'rgba(45, 45, 45, 1)', padding: 0 }}>
                <View style={{ flexDirection: 'row', width: Dimensions.get('screen').width, paddingLeft: 16, marginTop: Platform.OS === 'android' ? 10 : 0, paddingRight: 56 }}>
                    <NBIconArrowLeft onPress={() => {
                        this.goBackPage()
                    }} />
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ marginLeft: 20, color: 'white', fontSize: 16, lineHeight: 22 }}>{instantUser.userName}</Text>
                    </View>
                </View>
            </Header>
            <Content style={{ flex: 1 }} scrollEnabled={false}>
                <ScrollView ref={o => this._scrollView = this._scrollView || o} showsVerticalScrollIndicator={false} style={{ height: Screens.height - 112 }}>
                    {
                        this.state.msgList.map((item: InstantMessage, index: number) => {
                            let comp = NBCompApp.instantConfig.msgDetailRender ? NBCompApp.instantConfig.msgDetailRender(item, index) : null;
                            if (comp) {
                                return comp;
                            }
                            return <IMDetail key={`${index}`} detail={item} isSelf={currentUser === undefined ? false : currentUser.id === item.fromId} isLast={index >= this.state.msgList.length - 1} />
                        })
                    }
                </ScrollView>
            </Content>
            <Footer style={{ backgroundColor: 'rgba(247, 247, 247, 1)' }}>
                <View style={{ flex: 1, paddingLeft: 19, paddingRight: 19, paddingBottom: 28 }}>
                    <View style={{ backgroundColor: 'rgba(226, 226, 231, 1)', borderRadius: 10, flexDirection: 'row', height: 43 }}>
                        <Input style={{ flex: 1, margin: 0, padding: 0, height: 43 }} placeholder="说点什么..." value={this.state.msg} onChangeText={(msg) => {
                            this.setState({ msg })
                        }} />
                        <TouchableOpacity onPress={() => {
                            if (!isEmptyObj(this.state.msg) && currentUser) {
                                if (this.state.msg.length > 500) {
                                    showError('超出长度限制');
                                    this.setState({ msg: '' });
                                    return;
                                }
                                instantClient.sendMessage(instantUser.userId, {
                                    mstType: 'text',
                                    content: this.state.msg
                                }).then(is => {
                                    this.appendInstantMsg({
                                        fromId: currentUser.id,
                                        toId: instantUser.userId,
                                        msg: {
                                            content: this.state.msg,
                                            msgType: 'text'
                                        },
                                        userName: currentUser.userName,
                                        pubtime: moment().format('YYYY-MM-DD HH:mm:ss')
                                    })
                                    this.setState({ msg: '' })
                                });
                            }
                        }} style={{ width: 32, height: 32, alignItems: 'center', backgroundColor: 'rgba(94, 99, 125, 1)', borderRadius: 5, marginRight: 10, marginTop: 5 }}>
                            <View style={{ flex: 1 }} />
                            <SvgXml xml={`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="14" height="14" style="fill: rgba(255, 255, 255, 1);"><path d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"></path></svg>`} />
                            <View style={{ flex: 1 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Footer>
        </Container>
    }
}