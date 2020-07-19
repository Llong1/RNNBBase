import React from "react";
import { TextStyle, TextProps } from "react-native";
interface Props {
    duration?: number;
    textStyle?: TextStyle;
    textProps?: TextProps;
    additionalDisplayItems?: string[];
    children: React.ReactNode;
}
export declare const Tick: React.FC<{
    children: string;
    rotateItems: string[];
}>;
declare const Ticker: React.FC<Props>;
export default Ticker;
