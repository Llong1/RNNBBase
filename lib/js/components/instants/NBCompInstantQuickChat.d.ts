import React from "react";
import { ViewProps } from "react-native";
import { InstantMqttClient } from "../../mqtt-part";
import { NBUserID } from "../../user";
export interface NBCompInstantQuickChatProps extends ViewProps {
    id: NBUserID;
    userName?: string;
    client?: InstantMqttClient;
    themeColor?: string;
    children?: any;
    size?: number;
}
export declare class NBCompInstantQuickChat extends React.Component<NBCompInstantQuickChatProps, {
    id: NBUserID;
    userName?: string;
}> {
    constructor(props: NBCompInstantQuickChatProps);
    render(): JSX.Element;
}
