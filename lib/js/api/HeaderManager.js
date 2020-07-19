import AsyncStorage from '@react-native-community/async-storage';
var HeaderManager = /** @class */ (function () {
    function HeaderManager() {
    }
    HeaderManager.updateHeaders = function (headers) {
        return headers ? AsyncStorage.setItem('__app_headers', JSON.stringify(headers)) : Promise.resolve(null);
    };
    HeaderManager.getHeaders = function () {
        return AsyncStorage.getItem('__app_headers').then(function (h) {
            if (h) {
                return JSON.parse(h);
            }
            else {
                return {};
            }
        });
    };
    return HeaderManager;
}());
export { HeaderManager };
