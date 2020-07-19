import AsyncStorage from "@react-native-community/async-storage";
import { DeviceEventEmitter } from "react-native";
import { NBEvents } from "./events";
var _nb_ctx = /** @class */ (function () {
    function _nb_ctx() {
    }
    _nb_ctx.prototype.loadConfig = function () {
        return AsyncStorage.getItem('_nb_app_config').then(function (str) {
            return str ? JSON.parse(str) : null;
        });
    };
    _nb_ctx.prototype.saveConfig = function (data) {
        return AsyncStorage.setItem('_nb_app_config', JSON.stringify(data)).then(function () { return true; });
    };
    _nb_ctx.prototype.showLoading = function (show) {
        var event = {
            event: NBEvents.NBEventLoading,
            isLoading: show === undefined ? true : show
        };
        DeviceEventEmitter.emit(NBEvents.NBEventLoading, event);
    };
    return _nb_ctx;
}());
var NBBaseCxt = new _nb_ctx();
export default NBBaseCxt;
