import React from "react";
import { Animated, ViewProps } from "react-native";
export interface NBCompAnimaRouteViewProps extends ViewProps {
    speed?: number;
}
export default class NBCompAnimaRouteView extends React.PureComponent<NBCompAnimaRouteViewProps> {
    spinValue: Animated.Value;
    isStoped: boolean;
    componentDidMount(): void;
    spin: () => void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
