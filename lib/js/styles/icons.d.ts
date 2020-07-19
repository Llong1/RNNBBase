/// <reference types="react" />
import { ViewProps } from "react-native";
export interface NBIconPros extends ViewProps {
    size?: number;
    color?: string;
    onPress?: Function;
    activeOpacity?: number;
}
export declare const NBIconUser: (iconProps: NBIconPros) => JSX.Element;
export declare const NBIconSafeCode: (iconProps: NBIconPros) => JSX.Element;
export declare const NBIconArrowRight: (iconProps: NBIconPros) => JSX.Element;
export declare const NBIconArrowLeft: (iconProps: NBIconPros) => JSX.Element;
export declare const NBIconPhone: (iconProps: NBIconPros) => JSX.Element;
export declare const NBIconLock: (iconProps: NBIconPros) => JSX.Element;
export declare const NBIconMessage: (iconProps: NBIconPros) => JSX.Element;
export declare const NBIconMessageX: (iconProps: NBIconPros) => JSX.Element;
export declare const NBIconSWap: (iconProps: NBIconPros) => JSX.Element;
export declare const NBIconAlipay: (iconProps: NBIconPros) => JSX.Element;
export declare const NBIconCubes: (iconProps: NBIconPros) => JSX.Element;
export declare const NBIconNotice: (iconProps: NBIconPros) => JSX.Element;
/**
 * 列表字符图标，对应：md-list
 * @param iconProps
 */
export declare const NBIconList: (iconProps: NBIconPros) => JSX.Element;
/**
 * 添加列表字符图标，对应md-playlist_add
 * @param iconProps
 */
export declare const NBIconPayAddList: (iconProps: NBIconPros) => JSX.Element;
/**
 * 添加列表确认字符图标，对应md-playlist_add_check
 * @param iconProps
 */
export declare const NBIconPayAddCheckList: (iconProps: NBIconPros) => JSX.Element;
/**
 * 确认字符图标，对应md-check
 * @param iconProps
 */
export declare const NBIconCheck: (iconProps: NBIconPros) => JSX.Element;
export declare const NBIconLoading: (iconProps: NBIconPros) => JSX.Element;
export declare const NBIcons: {
    NBIconNotice: (iconProps: NBIconPros) => JSX.Element;
    NBIconArrowRight: (iconProps: NBIconPros) => JSX.Element;
    NBIconList: (iconProps: NBIconPros) => JSX.Element;
    NBIconPayAddList: (iconProps: NBIconPros) => JSX.Element;
    NBIconPayAddCheckList: (iconProps: NBIconPros) => JSX.Element;
    NBIconCheck: (iconProps: NBIconPros) => JSX.Element;
    NBIconLoading: (iconProps: NBIconPros) => JSX.Element;
};
