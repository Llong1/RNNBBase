import React from "react";
import { ViewProps } from "react-native";
import { RequestParams } from "../api";
import BaseRequest from "../api/BaseRequest";
import { DataModel } from "../models";
export declare type ApiViewAction = 'load' | 'refresh' | 'clear';
/**
 * api视图属性
 */
export interface ApiViewPros<T extends RequestParams> extends ViewProps {
    params?: T | undefined | null;
    autoLoad?: boolean;
}
/**
 * api视图状态
 */
export interface ApiViewState<T extends RequestParams, RP extends DataModel> extends ModelState<RP> {
    isLoading: boolean;
    params?: T | undefined | null;
}
/**
 * api视图
 */
export declare class ApiView<TT extends RequestParams = {}, T extends ApiViewPros<TT> = {}, RP = {}, S extends ApiViewState<TT, RP> = {
    isLoading: false;
    data: null;
}> extends React.Component<T, S> {
    protected api?: BaseRequest<TT, RP>;
    protected params?: TT | undefined | null;
    protected defaultParams?: TT;
    constructor(pros: T);
    componentDidMount(): void;
    UNSAFE_componentWillReceiveProps(pros: T): void;
    doAction(a: ApiViewAction): Promise<RP | undefined | null>;
    protected bindData(d?: RP): void;
    render(): JSX.Element;
}
export declare class ModelView<M extends DataModel> extends React.Component<{}, ModelState<M>> {
}
export interface ModelState<T extends DataModel> {
    data: T | undefined | null;
}
export interface BaseAppPagePros extends ViewProps {
    navigation?: any;
    route?: {
        params: any;
    };
}
export declare class BaseAppPage<T extends BaseAppPagePros = {}, S = {}> extends React.Component<T, S> {
    pushPage(page: string, params?: any): void;
    goBackPage(): void;
    replacePage(page: string, params?: any): void;
}
export interface NBTouchableProps extends ViewProps {
    onPress?: Function;
    activeOpacity?: number;
}
export interface NBCompState {
    isLoading?: boolean;
}
export declare const NBPages: {
    InstantPage: string;
};
export interface NBCompAppThemeConfig {
    primaryColor?: string;
}
