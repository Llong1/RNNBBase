import React from "react";
import { ViewProps } from "react-native";
interface BannerHeaderProps extends ViewProps {
    onPress?: Function;
}
export default class BannerHeader extends React.Component<BannerHeaderProps> {
    render(): JSX.Element;
}
export {};
