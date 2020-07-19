import React from "react";
import { PanGestureHandler } from "react-native-gesture-handler";
import { ViewProps } from "react-native";

export interface PullViewPros extends ViewProps {
    offsetHeight?: number,
    onRelease?: Function,
    topContent?: React.ReactNode,
    handleable?: boolean
}

export class PullView extends React.Component<PullViewPros, { handleable?: boolean }> {
    constructor(pros: PullViewPros) {
        super(pros);
        this.state = {
            handleable: pros.handleable === undefined ? true : pros.handleable
        }
    }

    UNSAFE_componentWillReceiveProps(props: PullViewPros) {
        if (props.handleable !== undefined) {
            this.setState({ handleable: props.handleable });
        }
    }

    render() {
        return <PanGestureHandler>
        </PanGestureHandler>
    }
}