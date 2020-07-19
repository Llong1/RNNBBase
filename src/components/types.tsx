import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Root, StyleProvider, View } from "native-base";
import React from "react";
import { ViewProps, TouchableOpacity } from "react-native";
import { RequestParams } from "../api";
import BaseRequest from "../api/BaseRequest";
import { DataModel } from "../models";

export type ApiViewAction = 'load' | 'refresh' | 'clear';

/**
 * api视图属性
 */
export interface ApiViewPros<T extends RequestParams> extends ViewProps {
    params?: T | undefined | null,
    autoLoad?: boolean,
}

/**
 * api视图状态
 */
export interface ApiViewState<T extends RequestParams, RP extends DataModel> extends ModelState<RP> {
    isLoading: boolean,
    params?: T | undefined | null
}

/**
 * api视图
 */
export class ApiView<TT extends RequestParams = {}, T extends ApiViewPros<TT> = {}, RP = {}, S extends ApiViewState<TT, RP> = { isLoading: false, data: null }> extends React.Component<T, S> {
    protected api?: BaseRequest<TT, RP>;
    protected params?: TT | undefined | null;
    protected defaultParams?: TT;
    constructor(pros: T) {
        super(pros);
        this.params = pros.params;
    }
    componentDidMount() {
        this.setState({
            isLoading: false,
            params: this.props.params,
            data: null
        })
        if (this.props.autoLoad === undefined || this.props.autoLoad) {
            this.doAction('load');
        }
    }

    UNSAFE_componentWillReceiveProps(pros: T) {
        if (pros.params) {
            if (!this.params) {
                this.params = pros.params;
                this.setState({
                    params: pros.params
                })
                this.doAction('refresh');
            } else {
                let old = JSON.stringify(this.params);
                let n = JSON.stringify(pros.params);
                if (old !== n) {
                    this.params = pros.params;
                    this.setState({
                        params: pros.params
                    })
                    this.doAction('refresh');
                }
            }
        } else {
            if (pros.autoLoad === undefined || pros.autoLoad) {
                this.params = null;
                this.setState({
                    params: null
                })

                this.params = this.defaultParams;
                this.doAction('refresh');
            }
        }
    }

    public doAction(a: ApiViewAction): Promise<RP | undefined | null> {
        return new Promise((res, rej) => {
            if (a === 'clear') {
                this.setState({
                    data: null
                })
                res(null);
                return;
            }
            if (this.api) {
                this.setState({
                    isLoading: true
                })
                this.api.request(this.params || this.defaultParams!).then(v => {
                    this.setState({
                        isLoading: false
                    });
                    requestAnimationFrame(() => {
                        res(v);
                        this.bindData(v!);
                    })
                })
                    .catch(e => {
                        this.setState({
                            isLoading: false
                        });
                        rej(e);
                    });
            } else {
                res(null);
            }
        });
    }

    protected bindData(d?: RP): void {
        this.setState({
            data: d
        })
    }

    render() {
        return <View></View>
    }
}

export class ModelView<M extends DataModel> extends React.Component<{}, ModelState<M>> {

}

export interface ModelState<T extends DataModel> {
    data: T | undefined | null
}

export interface BaseAppPagePros extends ViewProps {
    navigation?: any,
    route?: {
        params: any
    }
}

export class BaseAppPage<T extends BaseAppPagePros = {}, S = {}> extends React.Component<T, S> {
    public pushPage(page: string, params?: any): void {
        if (this.props.navigation) {
            this.props.navigation.navigate(page, params);
            return;
        }

        throw new Error('无效的导航内容！');
    }

    public goBackPage(): void {
        if (this.props.navigation) {
            this.props.navigation.goBack();
            return;
        }

        throw new Error('无效的导航内容！');
    }

    public replacePage(page: string, params?: any): void {

        if (this.props.navigation) {
            this.props.navigation.replace(page, params);
            return;
        }

        throw new Error('无效的导航内容！');
    }
}

export interface NBTouchableProps extends ViewProps {
    onPress?: Function,
    activeOpacity?: number
}

export interface NBCompState {
    isLoading?: boolean
}

export const NBPages = {
    InstantPage: 'nbInstantDetail'
}