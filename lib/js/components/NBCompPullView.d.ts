import React from "react";
import { GestureHandlerGestureEventNativeEvent, PanGestureHandlerStateChangeEvent, PanGestureHandlerGestureEvent, PanGestureHandlerEventExtra, ScrollView } from "react-native-gesture-handler";
import { Animated, ViewProps } from "react-native";
export interface NBCompPullViewPros extends ViewProps {
    offsetHeight?: number;
    onRelease?: Function;
    topContent?: React.ReactNode;
    handleable?: boolean;
    triggerHeight?: number;
    onRefresh?: Function;
    pullNotLimit?: boolean;
}
export declare class NBCompPullView extends React.Component<NBCompPullViewPros, {
    handleable?: boolean;
    isActive?: boolean;
    contentScrollY?: number;
    handlerScroll: boolean;
}> {
    _firstGesture?: GestureHandlerGestureEventNativeEvent & PanGestureHandlerEventExtra;
    _rheight: Animated.Value;
    _currentTransY: number;
    _scrollOffsetY: number;
    _scrollView?: ScrollView;
    constructor(pros: NBCompPullViewPros);
    UNSAFE_componentWillReceiveProps(props: NBCompPullViewPros): void;
    _onHadlerStateChange(nativeEvent: PanGestureHandlerStateChangeEvent): void;
    private _checkNeedRefresh;
    _onGestureEvent(e: PanGestureHandlerGestureEvent): void;
    render(): JSX.Element;
}
