import AsyncStorage from "@react-native-community/async-storage";
import { DeviceEventEmitter } from "react-native";
import { NBEventILoading, NBEvents } from "./events";
import { NBUserAll } from "./user";

export interface NBCheckUpdateConfig {
    forceUpdate?: boolean
}

class _nb_ctx {
    public defaultInstantClient: any;

    public nbUser: NBUserAll;

    public loadConfig(): Promise<any> {
        return AsyncStorage.getItem('_nb_app_config').then(str => {
            return str ? JSON.parse(str) : null;
        })
    }

    public saveConfig(data: any): Promise<boolean> {
        return AsyncStorage.setItem('_nb_app_config', JSON.stringify(data)).then(() => true);
    }

    public showLoading(show?: boolean) {
        const event: NBEventILoading = {
            event: NBEvents.NBEventLoading,
            isLoading: show === undefined ? true : show
        }
        DeviceEventEmitter.emit(NBEvents.NBEventLoading, event);
    }
}

const NBBaseCxt = new _nb_ctx();

export default NBBaseCxt;