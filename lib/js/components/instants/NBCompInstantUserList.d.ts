import React from "react";
import { EmitterSubscription, ViewProps } from "react-native";
import { CommunicationListModel, InstantMessage, InstantMqttClient } from "../../mqtt-part";
import { NBCompState } from "../types";
export declare type NBCompInstantItemPress = (item: CommunicationListModel) => void;
export interface NBCompInstantUserListProps extends ViewProps {
    instant?: InstantMqttClient;
    onItemPress?: NBCompInstantItemPress;
    themeColor?: string;
    renderItem?: (item: CommunicationListModel, index: number) => React.ReactElement | null;
}
export interface NBCompInstantUserListState extends NBCompState {
    userList?: Array<CommunicationListModel>;
}
export declare class NBCompInstantUserList extends React.PureComponent<NBCompInstantUserListProps, NBCompInstantUserListState> {
    constructor(props: NBCompInstantUserListProps);
    _msgEmitter?: EmitterSubscription;
    componentDidMount(): void;
    componentWillUnmount(): void;
    protected onInstantMessage(msg: InstantMessage): void;
    render(): JSX.Element;
}
