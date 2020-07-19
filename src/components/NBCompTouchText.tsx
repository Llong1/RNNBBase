import React from "react";
import { Text } from "native-base";
import { NBTouchableProps } from "./types";
import { TextProps, TouchableOpacity } from "react-native";

export interface NBCompTouchTextProps extends NBTouchableProps {
    fontSize?: number,
    color?: string,
    text?: string,
    textStyle?: TextProps
}

export const NBCompTouchText = (props: NBCompTouchTextProps) => {
    const p = Object.assign({ fontSize: 14, color: 'black', lineHeight: 10, text: '' }, props);
    return <TouchableOpacity activeOpacity={props.activeOpacity === undefined ? 0.8 : props.activeOpacity} style={[{ alignItems: 'center' }, props.style]} onPress={() => {
        if (props.onPress) {
            props.onPress();
        }
    }}>
        <Text style={[{ fontSize: p.fontSize, color: p.color }, p.textStyle]}>{p.text}</Text>
    </TouchableOpacity>
}