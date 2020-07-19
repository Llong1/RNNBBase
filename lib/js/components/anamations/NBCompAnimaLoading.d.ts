import React from "react";
import { ViewProps } from "react-native";
export declare class NBCompAnimaLoading extends React.Component<{
    size?: number;
}> {
    render(): JSX.Element;
}
export interface NBCompAnimaLoadingModalProps extends ViewProps {
    msg?: string;
    iconSize?: number;
}
export declare class NBCompAnimaLoadingModal extends React.Component<NBCompAnimaLoadingModalProps> {
    render(): JSX.Element;
}
