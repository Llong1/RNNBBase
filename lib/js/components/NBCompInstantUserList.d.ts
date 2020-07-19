import React from "react";
import { ViewProps, EmitterSubscription } from "react-native";
import { CommunicationListModel, InstantMessage, InstantMqttClient } from "../mqtt-part";
import { NBCompState } from "./types";
export declare type NBCompInstantItemPress = (item: CommunicationListModel) => void;
export interface NBCompInstantUserListProps extends ViewProps {
    instant?: InstantMqttClient;
    isFlatList?: boolean;
    onItemPress?: NBCompInstantItemPress;
    navigation?: any;
    themeColor?: string;
}
export interface NBCompInstantUserListState extends NBCompState {
    userList?: Array<CommunicationListModel>;
}
export declare class NBCompInstantUserList extends React.PureComponent<NBCompInstantUserListProps, NBCompInstantUserListState> {
    state: {
        userList: any[];
    };
    _msgEmitter?: EmitterSubscription;
    componentDidMount(): void;
    componentWillUnmount(): void;
    protected onInstantMessage(msg: InstantMessage): void;
    render(): JSX.Element;
}
