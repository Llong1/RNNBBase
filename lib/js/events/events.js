import { DeviceEventEmitter } from "react-native";
export var addNBEventListener = function (event, func) {
    return DeviceEventEmitter.addListener(event, func);
};
