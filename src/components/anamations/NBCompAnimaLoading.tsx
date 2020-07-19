import React from "react";
import NBCompAnimaRouteView from "./NBCompAnimaRouteView";
import { NBIcons } from "../../styles";
import { ViewProps } from "react-native";
import { View, Text } from "native-base";

export class NBCompAnimaLoading extends React.Component<{ size?: number }> {
    render() {
        return <NBCompAnimaRouteView speed={2000}>
            <NBIcons.NBIconLoading size={this.props.size || 24} color="white" />
        </NBCompAnimaRouteView>
    }
}

export interface NBCompAnimaLoadingModalProps extends ViewProps {
    msg?: string,
    iconSize?: number
}

export class NBCompAnimaLoadingModal extends React.Component<NBCompAnimaLoadingModalProps> {
    render() {
        return <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', alignItems: 'center', borderRadius: 6, width: 120, height: 120, paddingTop: 12 }}>
            <NBCompAnimaLoading size={this.props.iconSize || 54} />
            <Text style={{ fontSize: 14, color: 'white', marginTop: 12 }}>{this.props.msg || "加载中..."}</Text>
        </View>
    }
}