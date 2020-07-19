/// <reference types="react" />
import { NBTouchableProps } from "./types";
import { TextProps } from "react-native";
export interface NBCompTouchTextProps extends NBTouchableProps {
    fontSize?: number;
    color?: string;
    text?: string;
    textStyle?: TextProps;
}
export declare const NBCompTouchText: (props: NBCompTouchTextProps) => JSX.Element;
