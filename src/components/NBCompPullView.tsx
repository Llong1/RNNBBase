import React from "react";
import { PanGestureHandler, GestureHandlerGestureEventNativeEvent, PanGestureHandlerStateChangeEvent, PanGestureHandlerGestureEvent, PanGestureHandlerEventExtra, State, ScrollView, NativeViewGestureHandlerGestureEvent } from "react-native-gesture-handler";
import { Animated, ViewProps, Easing, GestureResponderEvent } from "react-native";
import { View, Text } from "native-base";
import { nbLog } from "../util";

export interface NBCompPullViewPros extends ViewProps {
    offsetHeight?: number,
    onRelease?: Function,
    topContent?: React.ReactNode,
    handleable?: boolean,
    triggerHeight?: number,
    onRefresh?: Function,
    pullNotLimit?: boolean
}

export class NBCompPullView extends React.Component<NBCompPullViewPros, { handleable?: boolean, isActive?: boolean, contentScrollY?: number, handlerScroll: boolean }> {
    _firstGesture?: GestureHandlerGestureEventNativeEvent & PanGestureHandlerEventExtra;
    _rheight: Animated.Value = new Animated.Value(0);
    _currentTransY: number = 0;
    _scrollOffsetY: number = 0;
    _scrollView?: ScrollView;

    constructor(pros: NBCompPullViewPros) {
        super(pros);
        this.state = {
            handleable: pros.handleable === undefined ? true : pros.handleable,
            isActive: true,
            contentScrollY: 0,
            handlerScroll: false
        }
    }

    UNSAFE_componentWillReceiveProps(props: NBCompPullViewPros) {
        if (props.handleable !== undefined) {
            this.setState({ handleable: props.handleable });
        }
    }

    _onHadlerStateChange(nativeEvent: PanGestureHandlerStateChangeEvent) {
        switch (nativeEvent.nativeEvent.state) {
            case State.UNDETERMINED:
                //console.log('等待手势')
                break;
            case State.BEGAN:
                this._firstGesture = nativeEvent.nativeEvent;
                break;
            case State.CANCELLED:
                break;
            case State.ACTIVE:
                //console.log('手势活跃')
                break;
            case State.END:
                console.log('手势结束')
                //此处校验手势位移
                this._checkNeedRefresh();
                break;
            case State.FAILED:
                //console.log('失败')
                break;
            default:
                //console.log('其他')
                break;
        }
    }

    private _checkNeedRefresh() {
        const th = this.props.triggerHeight || 60;

        Animated.timing(this._rheight, {
            toValue: 0,
            duration: this._currentTransY * 200 / 60,
            easing: Easing.ease,
            useNativeDriver: false
        }).start(() => {
            if (this._currentTransY >= th) {
                nbLog('下拉刷新组件：', '需要刷新视图', this._currentTransY);
                this._currentTransY = 0;
                if (this.props.onRefresh) {
                    this.props.onRefresh();
                }
            }
        })
    }

    _onGestureEvent(e: PanGestureHandlerGestureEvent) {
        if (e.nativeEvent.translationY < 0 && this._scrollOffsetY <= 0) {
            this.setState({
                handlerScroll: true
            }, () => {

            })
            return;
        }
        const nativeEvent: GestureHandlerGestureEventNativeEvent & PanGestureHandlerEventExtra = e.nativeEvent;
        const th = this.props.triggerHeight || 60;
        const { pullNotLimit } = this.props;
        if (pullNotLimit === undefined || pullNotLimit) {
            //可以无限拉伸
            this._currentTransY = nativeEvent.translationY > 0 ? nativeEvent.translationY : (nativeEvent.translationY >= 0 ? nativeEvent.translationY : 0);
        } else {
            this._currentTransY = nativeEvent.translationY > 0 ? (nativeEvent.translationY >= th ? th : nativeEvent.translationY) : (nativeEvent.translationY >= 0 ? nativeEvent.translationY : 0);
        }
        this._rheight.setValue(this._currentTransY);
    }

    render() {
        return <PanGestureHandler enabled={!this.state.handlerScroll} maxPointers={1} onHandlerStateChange={this._onHadlerStateChange.bind(this)} onGestureEvent={this._onGestureEvent.bind(this)}>
            <View>
                <Animated.View style={{ height: this._rheight, overflow: 'hidden' }}>
                    <View style={{ height: this.props.triggerHeight || 60, alignItems: 'center' }}>
                        <View style={{ flex: 1 }} />
                        <Text>下拉刷新！</Text>
                        <View style={{ flex: 1 }} />
                    </View>
                </Animated.View>
                <ScrollView ref={o => this._scrollView = o} onScroll={(e) => {
                    this._scrollOffsetY = e.nativeEvent.contentOffset.y;
                    if (this._scrollOffsetY <= 0) {
                        if (this.state.handlerScroll) {
                            this.setState({
                                handlerScroll: false
                            })
                        }
                    }
                }} enabled={this.state.handlerScroll} onGestureEvent={e => {
                    if (this.state.handlerScroll && this._scrollOffsetY === 0) {
                        this.setState({
                            handlerScroll: false
                        })
                    }
                }} >
                    {this.props.children}
                </ScrollView>
            </View>
        </PanGestureHandler>
    }
}