import React from "react";
import { ViewProps } from "react-native";
import { NetInfoState, NetInfoSubscription } from "@react-native-community/netinfo";
declare type OnNetworkConnected = () => Promise<boolean>;
interface NBCompNetworkLisProps extends ViewProps {
    onNetworkConnected?: OnNetworkConnected;
    showView?: boolean;
    onPressTigger?: boolean;
    trigger?: boolean;
}
export default class NBCompNetworkLis extends React.Component<NBCompNetworkLisProps, {
    isConnected?: boolean;
    triggerSuccess?: boolean;
    trigger?: boolean;
}> {
    _networkSub?: NetInfoSubscription;
    isInvoking: boolean;
    constructor(props: NBCompNetworkLisProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    UNSAFE_componentWillReceiveProps(props: NBCompNetworkLisProps): void;
    _networkListener: (state: NetInfoState) => void;
    _invokeConnected(): Promise<boolean>;
    render(): JSX.Element;
}
export {};
