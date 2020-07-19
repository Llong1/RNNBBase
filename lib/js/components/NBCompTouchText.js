import React from "react";
import { Text } from "native-base";
import { TouchableOpacity } from "react-native";
export var NBCompTouchText = function (props) {
    var p = Object.assign({ fontSize: 14, color: 'black', lineHeight: 10, text: '' }, props);
    return <TouchableOpacity activeOpacity={props.activeOpacity === undefined ? 0.8 : props.activeOpacity} style={[{ alignItems: 'center' }, props.style]} onPress={function () {
        if (props.onPress) {
            props.onPress();
        }
    }}>
        <Text style={[{ fontSize: p.fontSize, color: p.color }, p.textStyle]}>{p.text}</Text>
    </TouchableOpacity>;
};
