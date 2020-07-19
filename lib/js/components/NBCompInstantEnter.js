import { useNavigation } from '@react-navigation/native';
import React from "react";
import { TouchableOpacity } from "react-native";
import { NBPages } from "./types";
export var NBCompInstantEnter = function (props) {
    var navi = useNavigation();
    var user = props.user, instantClient = props.instantClient, themeColor = props.themeColor;
    return <TouchableOpacity onPress={function () {
        navi.navigate(NBPages.InstantPage, {
            instantUser: user,
            themeColor: themeColor,
            instantClient: instantClient
        });
    }} style={[{ alignItems: 'center' }, props.style]}>
        {props.children}
    </TouchableOpacity>;
};
