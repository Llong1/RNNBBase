import React from "react";
import { PanGestureHandler, FlingGestureHandler } from "react-native-gesture-handler";
import { ViewProps } from "react-native";

export interface NBCPullViewPros extends ViewProps {
    offsetHeight?: number,
    handleable?: boolean
}

export default class NBCPullView extends React.Component {
    render() {
        return <PanGestureHandler>

        </PanGestureHandler>
    }
}