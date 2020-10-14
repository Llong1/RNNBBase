import { NavigationContainerRef } from "@react-navigation/native";
import { InstantMqttClient } from "../mqtt-part";
import { NBCompAppThemeConfig, NBPages } from "./types";
import { NBCompInstantMsgContentRender } from "./instants";
import { NBUserID } from "../user";

interface InstantConfig {
    instantClient?: InstantMqttClient,
    msgDetailRender?: NBCompInstantMsgContentRender
}

export default class NBCompApp {
    public static navigation: NavigationContainerRef;
    public static instantConfig: InstantConfig = {};
    public static themeConfig: NBCompAppThemeConfig = {
        primaryColor: 'rgba(45, 45, 45, 1)'
    };

    public static navigate(page: string, params?: any) {
        NBCompApp.navigation.navigate(page, params)
    }

    public static configInstant(client: InstantMqttClient, msgDetailRender?: NBCompInstantMsgContentRender) {
        if (client) {
            NBCompApp.instantConfig.instantClient = client;
            console.log('NB组件全局设置', '即使通讯客户端实例设置成功！');
        } else {
            console.warn('NB组件全局设置', '即时通讯客户端无效', client);
        }
        if (msgDetailRender) {
            NBCompApp.instantConfig.msgDetailRender = msgDetailRender;
        }
    }

    public static configInstantRender(msgDetailRender: NBCompInstantMsgContentRender) {
        NBCompApp.instantConfig.msgDetailRender = msgDetailRender;
    }

    public static enterInstantChat(user: {
        userId: NBUserID,
        userName?: string
    }) {
        NBCompApp.navigate(NBPages.InstantPage, {
            instantUser: user,
            instantClient: NBCompApp.instantConfig.instantClient
        })
    }
}