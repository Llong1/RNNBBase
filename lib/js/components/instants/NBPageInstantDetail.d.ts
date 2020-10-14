/// <reference types="react" />
import { ScrollView, EmitterSubscription } from "react-native";
import { CommunicationListModel, InstantMessage, InstantMqttClient } from "../../mqtt-part";
import { NBUserModel } from "../../user";
import { BaseAppPage, BaseAppPagePros } from "../types";
export interface NBPageInstantDetailProps extends BaseAppPagePros {
    themeColor?: string;
    instantUser?: CommunicationListModel;
    instantClient?: InstantMqttClient;
    user?: NBUserModel;
}
export default class NBPageInstantDetail extends BaseAppPage<NBPageInstantDetailProps, {
    msg?: string;
    msgList?: Array<InstantMessage>;
}> {
    state: {
        msg: string;
        msgList: any[];
    };
    _scrollView?: ScrollView;
    _msgEmitter?: EmitterSubscription;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private appendInstantMsg;
    render(): JSX.Element;
}
