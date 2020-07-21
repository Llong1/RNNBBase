import { DeviceEventEmitter, EmitterSubscription } from "react-native";

type NBEventNames = "_nb_event_loading" | "_nb_event_loginsuccess";

export const addNBEventListener = (event: NBEventNames, func: (data: any) => void): EmitterSubscription => {
    return DeviceEventEmitter.addListener(event, func);
}