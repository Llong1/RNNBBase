import { NBUserAll } from "./user";
export interface NBCheckUpdateConfig {
    forceUpdate?: boolean;
}
declare class _nb_ctx {
    defaultInstantClient: any;
    nbUser: NBUserAll;
    loadConfig(): Promise<any>;
    saveConfig(data: any): Promise<boolean>;
    showLoading(show?: boolean): void;
}
declare const NBBaseCxt: _nb_ctx;
export default NBBaseCxt;
