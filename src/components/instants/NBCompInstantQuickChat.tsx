import React from "react";
import { ViewProps } from "react-native";
import { InstantMqttClient } from "../../mqtt-part";
import { NBUserID, getNBUserInfo, NBUserModel } from "../../user";
import { isEmptyObj, showError } from "../../util";
import { NBIconMessageX } from "../../styles";
import NBBaseCxt from "../../NBBaseCxt";
import NBCompApp from "../NBCompApp";
import { NBPages } from "../types";

export interface NBCompInstantQuickChatProps extends ViewProps {
    id: NBUserID,
    userName?: string,
    client?: InstantMqttClient
    themeColor?: string,
    children?: any,
    size?: number
}

export class NBCompInstantQuickChat extends React.Component<NBCompInstantQuickChatProps, { id: NBUserID, userName?: string }> {
    constructor(props: NBCompInstantQuickChatProps) {
        super(props);
        this.state = {
            id: props.id,
            userName: props.userName
        }
    }

    render() {
        return <NBIconMessageX size={this.props.size || 22} style={[{}, this.props.style]} onPress={() => {
            const client: InstantMqttClient = this.props.client === undefined ? NBBaseCxt.defaultInstantClient : this.props.client;
            if (!client) {
                showError('未设置即时通讯客户端或未初始化即时通讯客户端！');
                return;
            }

            const { id, userName } = this.props;
            if (isEmptyObj(userName)) {
                getNBUserInfo(id).then(v => {
                    NBCompApp.navigation.navigate(NBPages.InstantPage, {
                        instantUser: {
                            userId: id,
                            userName: v.userName
                        },
                        themeColor: this.props.themeColor,
                        instantClient: client
                    })
                })
            } else {
                NBCompApp.navigation.navigate(NBPages.InstantPage, {
                    instantUser: {
                        userId: id,
                        userName
                    },
                    themeColor: this.props.themeColor,
                    instantClient: client
                })
            }
        }} />
    }
}