var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React from "react";
import { PanGestureHandler, State, ScrollView } from "react-native-gesture-handler";
import { Animated, Easing } from "react-native";
import { View, Text } from "native-base";
import { nbLog } from "../util";
var NBCompPullView = /** @class */ (function (_super) {
    __extends(NBCompPullView, _super);
    function NBCompPullView(pros) {
        var _this = _super.call(this, pros) || this;
        _this._rheight = new Animated.Value(0);
        _this._currentTransY = 0;
        _this._scrollOffsetY = 0;
        _this.state = {
            handleable: pros.handleable === undefined ? true : pros.handleable,
            isActive: true,
            contentScrollY: 0,
            handlerScroll: false
        };
        return _this;
    }
    NBCompPullView.prototype.UNSAFE_componentWillReceiveProps = function (props) {
        if (props.handleable !== undefined) {
            this.setState({ handleable: props.handleable });
        }
    };
    NBCompPullView.prototype._onHadlerStateChange = function (nativeEvent) {
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
                console.log('手势结束');
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
    };
    NBCompPullView.prototype._checkNeedRefresh = function () {
        var _this = this;
        var th = this.props.triggerHeight || 60;
        Animated.timing(this._rheight, {
            toValue: 0,
            duration: this._currentTransY * 200 / 60,
            easing: Easing.bounce,
            useNativeDriver: false
        }).start(function () {
            if (_this._currentTransY >= th) {
                nbLog('下拉刷新组件：', '需要刷新视图', _this._currentTransY);
                _this._currentTransY = 0;
                if (_this.props.onRefresh) {
                    _this.props.onRefresh();
                }
            }
        });
    };
    NBCompPullView.prototype._onGestureEvent = function (e) {
        if (e.nativeEvent.translationY < 0 && this._scrollOffsetY <= 0) {
            this.setState({
                handlerScroll: true
            }, function () {
            });
            return;
        }
        var nativeEvent = e.nativeEvent;
        var th = this.props.triggerHeight || 60;
        var pullNotLimit = this.props.pullNotLimit;
        if (pullNotLimit === undefined || pullNotLimit) {
            //可以无限拉伸
            this._currentTransY = nativeEvent.translationY > 0 ? nativeEvent.translationY : (nativeEvent.translationY >= 0 ? nativeEvent.translationY : 0);
        }
        else {
            this._currentTransY = nativeEvent.translationY > 0 ? (nativeEvent.translationY >= th ? th : nativeEvent.translationY) : (nativeEvent.translationY >= 0 ? nativeEvent.translationY : 0);
        }
        this._rheight.setValue(this._currentTransY);
    };
    NBCompPullView.prototype.render = function () {
        var _this = this;
        return <PanGestureHandler enabled={!this.state.handlerScroll} maxPointers={1} onHandlerStateChange={this._onHadlerStateChange.bind(this)} onGestureEvent={this._onGestureEvent.bind(this)}>
            <View>
                <Animated.View style={{ height: this._rheight, overflow: 'hidden' }}>
                    <View style={{ height: this.props.triggerHeight || 60, alignItems: 'center' }}>
                        <View style={{ flex: 1 }}/>
                        <Text>下拉刷新！</Text>
                        <View style={{ flex: 1 }}/>
                    </View>
                </Animated.View>
                <ScrollView ref={function (o) { return _this._scrollView = o; }} onScroll={function (e) {
            _this._scrollOffsetY = e.nativeEvent.contentOffset.y;
            if (_this._scrollOffsetY <= 0) {
                if (_this.state.handlerScroll) {
                    _this.setState({
                        handlerScroll: false
                    });
                }
            }
        }} enabled={this.state.handlerScroll} onGestureEvent={function (e) {
            if (_this.state.handlerScroll && _this._scrollOffsetY === 0) {
                _this.setState({
                    handlerScroll: false
                });
            }
        }}>
                    {this.props.children}
                </ScrollView>
            </View>
        </PanGestureHandler>;
    };
    return NBCompPullView;
}(React.Component));
export { NBCompPullView };
