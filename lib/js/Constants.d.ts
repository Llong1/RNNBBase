import { NBConfig } from "./models";
export default class Constants {
    static BaseDomain?: string;
    static isDebug: boolean;
    static headers?: any;
    static config?: NBConfig;
    static readLocalConf(): Promise<NBConfig | null>;
    static setConf(cof: NBConfig): Promise<void>;
}
