import { useNavigation } from '@react-navigation/native';
import React from "react";
import { TouchableOpacity, ViewProps } from "react-native";
import { InstantMqttClient } from "../mqtt-part";
import { NBUserID } from "../user";
import { NBPages } from "./types";

export interface NBCompInstantEnterProps extends ViewProps {
    user: {
        userId: NBUserID,
        userName?: string
    },
    instantClient: InstantMqttClient
    themeColor?: string,
    children?: any
}

export const NBCompInstantEnter = (props: NBCompInstantEnterProps) => {
    const navi = useNavigation();
    const { user, instantClient, themeColor } = props;
    return <TouchableOpacity onPress={() => {
        navi.navigate(NBPages.InstantPage, {
            instantUser: user,
            themeColor,
            instantClient
        })
    }} style={[{ alignItems: 'center' }, props.style]}>
        {props.children}
    </TouchableOpacity>
}