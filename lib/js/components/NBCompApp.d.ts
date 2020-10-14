import { NavigationContainerRef } from "@react-navigation/native";
import { InstantMqttClient } from "../mqtt-part";
import { NBCompAppThemeConfig } from "./types";
import { NBCompInstantMsgContentRender } from "./instants";
import { NBUserID } from "../user";
interface InstantConfig {
    instantClient?: InstantMqttClient;
    msgDetailRender?: NBCompInstantMsgContentRender;
}
export default class NBCompApp {
    static navigation: NavigationContainerRef;
    static instantConfig: InstantConfig;
    static themeConfig: NBCompAppThemeConfig;
    static navigate(page: string, params?: any): void;
    static configInstant(client: InstantMqttClient, msgDetailRender?: NBCompInstantMsgContentRender): void;
    static configInstantRender(msgDetailRender: NBCompInstantMsgContentRender): void;
    static enterInstantChat(user: {
        userId: NBUserID;
        userName?: string;
    }): void;
}
export {};
