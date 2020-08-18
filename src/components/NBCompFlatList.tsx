import { Method } from "axios";
import { View, Text } from "native-base";
import React from "react";
import { Animated, Easing, FlatList, ListRenderItem, ViewProps } from "react-native";
import { callApi } from "../network";
import { nbLog } from "../util";

export interface NBCompFlatListProps<T> extends ViewProps {
    api?: string,
    params?: any,
    method?: Method,
    pageNoField?: string,
    pageSizeField?: string,
    pageSize?: number,
    data?: ReadonlyArray<T> | null | undefined,
    renderItem: ListRenderItem<T> | null | undefined,
    ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null,
    horizontal?: boolean | null,
    autoRefresh?: boolean,
    refreshTextBackgroundColor?: string,
    onEndReachedThreshold?: number
}

export class NBCompFlatList<T = any> extends React.Component<NBCompFlatListProps<T>, {
    data: Array<T>,
    hasMore?: boolean,
    refreshing?: boolean,
    fetchError?: any
}> {

    private flatList?: FlatList;
    private total?: number;
    private fetchParams: any = {};
    private page?: number = 1;
    private size?: number;
    _rheight: Animated.Value = new Animated.Value(0);
    _bHeight: Animated.Value = new Animated.Value(0);

    constructor(props: NBCompFlatListProps<T>) {
        super(props);
        this.state = {
            data: props.data ? [...props.data] : [],
            hasMore: false,
            refreshing: false,
        }
    }

    componentDidMount() {
        if (this.props.autoRefresh === undefined || this.props.autoRefresh) {
            this.fetchData(this.props.params || {})
        }
    }

    fetchData(fetchParams?: any, page?: number, size?: number) {
        if (!this.props.api) {
            nbLog('下拉刷新列表组件', '请设置api属性！');
            return;
        }
        const params = {
            ...this.props.params,
            ...this.fetchParams,
            ...fetchParams
        }
        const pnf = this.props.pageNoField ? this.props.pageNoField : 'pageNumber';
        const pns = this.props.pageNoField ? this.props.pageNoField : 'pageSize';
        params[pnf] = page === undefined ? 1 : page;
        params[pns] = size === undefined ? (this.props.pageSize ? this.props.pageSize : 10) : size;
        this.page = params[pnf];
        this.size = params[pns];
        this.fetchParams = params;
        nbLog('下拉刷新列表组件', '下拉刷新参数：', this.props.api, params);
        return this.onRefreshStart(this.page > 1).then(() => {
            return callApi<{
                data: Array<T>,
                total: number
            }>(this.props.api, this.props.method ? this.props.method : 'post', params).then(r => {
                this.total = r.total;
                return this.appendData(r.data, params[pnf] === 1);
            }).then(() => {
                return this.onRefreshFinish(undefined, this.page > 1);
            }).catch(err => {
                return this.onRefreshFinish(err, this.page > 1);
            })
        })
    }

    UNSAFE_componentWillReceiveProps(props: NBCompFlatListProps<T>) {
        if (props.params) {
            this.fetchData(props.params, 1);
        }
        if (props.data) {
            const data = [...props.data];
            this.setState({
                data
            })
        }
    }

    appendData(d: Array<T>, refresh?: boolean): Promise<boolean> {
        if (d) {
            let data = [];
            if (refresh !== undefined && refresh) {

            } else {
                if (this.state.data) {
                    data = [...this.state.data];
                }
            }

            d.forEach((v: T) => {
                data.push(v);
            });

            this.setState({ data }, () => {
                return Promise.resolve(true);
            })
        } else {
            return Promise.resolve(true);
        }
    }

    scrollToEnd(params?: { animated?: boolean | null }) {
        this.flatList!.scrollToEnd(params);
    }

    private onRefreshStart(isLoadMore?: boolean) {
        return new Promise((res, rej) => {
            if (isLoadMore !== undefined && isLoadMore) {
                Animated.timing(this._bHeight, {
                    toValue: 60,
                    duration: 400,
                    easing: Easing.ease,
                    useNativeDriver: false
                }).start(() => {
                    res(true);
                })
            } else {
                Animated.timing(this._rheight, {
                    toValue: 60,
                    duration: 400,
                    easing: Easing.ease,
                    useNativeDriver: false
                }).start(() => {
                    this.setState({
                        refreshing: true
                    }, () => {
                        res(true);
                    })
                })
            }
        })
    }

    private onRefreshFinish(fetchError?: any, isLoadMore?: boolean) {
        return new Promise((res, rej) => {
            if (isLoadMore !== undefined && isLoadMore) {
                Animated.timing(this._bHeight, {
                    toValue: 0,
                    duration: 400,
                    easing: Easing.ease,
                    useNativeDriver: false
                }).start(() => {
                    this.setState({
                        refreshing: false,
                        fetchError
                    }, () => {
                        res(true);
                    })
                })
            } else {
                Animated.timing(this._rheight, {
                    toValue: 0,
                    duration: 400,
                    easing: Easing.ease,
                    useNativeDriver: false
                }).start(() => {
                    this.setState({
                        refreshing: false,
                        fetchError
                    }, () => {
                        res(true);
                    })
                })
            }
        })
    }

    render() {
        return <View style={this.props.style}>
            <Animated.View style={{ height: this._rheight, overflow: 'hidden' }}>
                <View style={{ height: 60, alignItems: 'center', backgroundColor: this.props.refreshTextBackgroundColor || 'rgba(196, 225, 242, 1)' }}>
                    <View style={{ flex: 1 }} />
                    <Text>刷新中</Text>
                    <View style={{ flex: 1 }} />
                </View>
            </Animated.View>
            <FlatList
                ref={o => this.flatList = o}
                onRefresh={() => {
                    this.fetchData(this.fetchParams, 1, this.size);
                }}
                refreshing={this.state.refreshing}
                data={this.state.data}
                renderItem={this.props.renderItem}
                ListHeaderComponent={this.props.ListHeaderComponent}
                horizontal={this.props.horizontal === undefined ? false : this.props.horizontal}
                onEndReached={(info: { distanceFromEnd: number }) => {
                    if (this.state.data.length < this.total && this.total > 0) {
                        this.page = this.page === undefined || this.page === NaN ? 1 : this.page;
                        this.fetchData(this.fetchParams, this.page + 1);
                    }
                }}
                onEndReachedThreshold={this.props.onEndReachedThreshold === undefined ? this.props.onEndReachedThreshold : 1} />
            <Animated.View style={{ height: this._bHeight, overflow: 'hidden' }}>
                <View style={{ height: 60, alignItems: 'center', backgroundColor: this.props.refreshTextBackgroundColor || 'rgba(196, 225, 242, 1)' }}>
                    <View style={{ flex: 1 }} />
                    <Text>加载更多</Text>
                    <View style={{ flex: 1 }} />
                </View>
            </Animated.View>
        </View>
    }
}