import { InstantsConfig } from "./types";
import AsyncStorage from '@react-native-community/async-storage';

/**
 * 即时通讯工具类
 */
export class InstantsUtils {
    public static config?: InstantsConfig;
    /**
     * 设置即时通讯配置
     * @param config 
     */
    public static setConfig(config: InstantsConfig): Promise<boolean> {
        let c: InstantsConfig = Object.assign({}, Object.assign(InstantsUtils.config ? InstantsUtils.config : {}, config));
        return AsyncStorage.setItem('_app_instants_conf', JSON.stringify(c)).then(() => {
            InstantsUtils.config = config;
            return true;
        });
    }

    /**
     * 获取即时通讯配置
     */
    public static loadConfig(): Promise<InstantsConfig | null> {
        if (!InstantsUtils.config) {
            return AsyncStorage.getItem("_app_instants_conf").then(v => {
                if (v) {
                    InstantsUtils.config = JSON.parse(v);
                }
                return Promise.resolve(InstantsUtils.config || {});
            })
        }
        return Promise.resolve(InstantsUtils.config);
    }
}