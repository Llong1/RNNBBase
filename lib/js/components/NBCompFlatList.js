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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { View, Text } from "native-base";
import React from "react";
import { Animated, Easing, FlatList } from "react-native";
import { callApi } from "../network";
import { nbLog } from "../util";
var NBCompFlatList = /** @class */ (function (_super) {
    __extends(NBCompFlatList, _super);
    function NBCompFlatList(props) {
        var _this = _super.call(this, props) || this;
        _this.fetchParams = {};
        _this.page = 1;
        _this._rheight = new Animated.Value(0);
        _this._bHeight = new Animated.Value(0);
        _this.state = {
            data: props.data ? __spreadArrays(props.data) : [],
            hasMore: false,
            refreshing: false
        };
        return _this;
    }
    NBCompFlatList.prototype.componentDidMount = function () {
        if (this.props.autoRefresh === undefined || this.props.autoRefresh) {
            this.fetchData(this.props.params || {});
        }
    };
    NBCompFlatList.prototype.fetchData = function (fetchParams, page, size) {
        var _this = this;
        if (!this.props.api) {
            nbLog('下拉刷新列表组件', '请设置api属性！');
            return;
        }
        var params = __assign(__assign(__assign({}, this.props.params), this.fetchParams), fetchParams);
        var pnf = this.props.pageNoField ? this.props.pageNoField : 'pageNumber';
        var pns = this.props.pageNoField ? this.props.pageNoField : 'pageSize';
        params[pnf] = page === undefined ? 1 : page;
        params[pns] = size === undefined ? (this.props.pageSize ? this.props.pageSize : 10) : size;
        this.page = params[pnf];
        this.size = params[pns];
        this.fetchParams = params;
        nbLog('下拉刷新列表组件', '下拉刷新参数：', this.props.api, params);
        return this.onRefreshStart(this.page > 1).then(function () {
            return callApi(_this.props.api, _this.props.method ? _this.props.method : 'post', params).then(function (r) {
                _this.total = r.total;
                return _this.appendData(r.data, params[pnf] === 1);
            }).then(function () {
                return _this.onRefreshFinish(undefined, _this.page > 1);
            })["catch"](function (err) {
                return _this.onRefreshFinish(err, _this.page > 1);
            });
        });
    };
    NBCompFlatList.prototype.UNSAFE_componentWillReceiveProps = function (props) {
        if (props.params) {
            this.fetchData(props.params, 1);
        }
        if (props.data) {
            var data = __spreadArrays(props.data);
            this.setState({
                data: data
            });
        }
    };
    NBCompFlatList.prototype.appendData = function (d, refresh) {
        if (d) {
            var data_1 = [];
            if (refresh !== undefined && refresh) {
            }
            else {
                if (this.state.data) {
                    data_1 = __spreadArrays(this.state.data);
                }
            }
            d.forEach(function (v) {
                data_1.push(v);
            });
            this.setState({ data: data_1 }, function () {
                return Promise.resolve(true);
            });
        }
        else {
            return Promise.resolve(true);
        }
    };
    NBCompFlatList.prototype.scrollToEnd = function (params) {
        this.flatList.scrollToEnd(params);
    };
    NBCompFlatList.prototype.onRefreshStart = function (isLoadMore) {
        var _this = this;
        return new Promise(function (res, rej) {
            if (isLoadMore !== undefined && isLoadMore) {
                Animated.timing(_this._bHeight, {
                    toValue: 60,
                    duration: 400,
                    easing: Easing.ease,
                    useNativeDriver: false
                }).start(function () {
                    res(true);
                });
            }
            else {
                Animated.timing(_this._rheight, {
                    toValue: 60,
                    duration: 400,
                    easing: Easing.ease,
                    useNativeDriver: false
                }).start(function () {
                    _this.setState({
                        refreshing: true
                    }, function () {
                        res(true);
                    });
                });
            }
        });
    };
    NBCompFlatList.prototype.onRefreshFinish = function (fetchError, isLoadMore) {
        var _this = this;
        return new Promise(function (res, rej) {
            if (isLoadMore !== undefined && isLoadMore) {
                Animated.timing(_this._bHeight, {
                    toValue: 0,
                    duration: 400,
                    easing: Easing.ease,
                    useNativeDriver: false
                }).start(function () {
                    _this.setState({
                        refreshing: false,
                        fetchError: fetchError
                    }, function () {
                        res(true);
                    });
                });
            }
            else {
                Animated.timing(_this._rheight, {
                    toValue: 0,
                    duration: 400,
                    easing: Easing.ease,
                    useNativeDriver: false
                }).start(function () {
                    _this.setState({
                        refreshing: false,
                        fetchError: fetchError
                    }, function () {
                        res(true);
                    });
                });
            }
        });
    };
    NBCompFlatList.prototype.render = function () {
        var _this = this;
        return <View style={this.props.style}>
            <Animated.View style={{ height: this._rheight, overflow: 'hidden' }}>
                <View style={{ height: 60, alignItems: 'center', backgroundColor: this.props.refreshTextBackgroundColor || 'rgba(196, 225, 242, 1)' }}>
                    <View style={{ flex: 1 }}/>
                    <Text>刷新中</Text>
                    <View style={{ flex: 1 }}/>
                </View>
            </Animated.View>
            <FlatList ref={function (o) { return _this.flatList = o; }} onRefresh={function () {
            _this.fetchData(_this.fetchParams, 1, _this.size);
        }} refreshing={this.state.refreshing} data={this.state.data} renderItem={this.props.renderItem} ListHeaderComponent={this.props.ListHeaderComponent} horizontal={this.props.horizontal === undefined ? false : this.props.horizontal} onEndReached={function (info) {
            if (_this.state.data.length < _this.total && _this.total > 0) {
                _this.page = _this.page === undefined || _this.page === NaN ? 1 : _this.page;
                _this.fetchData(_this.fetchParams, _this.page + 1);
            }
        }} onEndReachedThreshold={this.props.onEndReachedThreshold === undefined ? this.props.onEndReachedThreshold : 1}/>
            <Animated.View style={{ height: this._bHeight, overflow: 'hidden' }}>
                <View style={{ height: 60, alignItems: 'center', backgroundColor: this.props.refreshTextBackgroundColor || 'rgba(196, 225, 242, 1)' }}>
                    <View style={{ flex: 1 }}/>
                    <Text>加载更多</Text>
                    <View style={{ flex: 1 }}/>
                </View>
            </Animated.View>
        </View>;
    };
    return NBCompFlatList;
}(React.Component));
export { NBCompFlatList };
