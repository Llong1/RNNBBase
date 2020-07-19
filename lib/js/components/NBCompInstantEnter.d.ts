/// <reference types="react" />
import { ViewProps } from "react-native";
import { InstantMqttClient } from "../mqtt-part";
import { NBUserID } from "../user";
export interface NBCompInstantEnterProps extends ViewProps {
    user: {
        userId: NBUserID;
        userName?: string;
    };
    instantClient: InstantMqttClient;
    themeColor?: string;
    children?: any;
}
export declare const NBCompInstantEnter: (props: NBCompInstantEnterProps) => JSX.Element;
