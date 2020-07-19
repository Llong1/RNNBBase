import { DeviceEventEmitter, EmitterSubscription } from "react-native";

export const addNBEventListener = (event: '_nb_event_loading', func: (data: any) => void): EmitterSubscription => {
    return DeviceEventEmitter.addListener(event, func);
}