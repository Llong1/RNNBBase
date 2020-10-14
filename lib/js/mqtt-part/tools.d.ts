import { InstantsConfig } from "./types";
/**
 * 即时通讯工具类
 */
export declare class InstantsUtils {
    static config?: InstantsConfig;
    /**
     * 设置即时通讯配置
     * @param config
     */
    static setConfig(config: InstantsConfig): Promise<boolean>;
    /**
     * 获取即时通讯配置
     */
    static loadConfig(): Promise<InstantsConfig | null>;
}
