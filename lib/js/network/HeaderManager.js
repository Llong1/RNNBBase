import AsyncStorage from '@react-native-community/async-storage';
var HeaderManager = /** @class */ (function () {
    function HeaderManager() {
    }
    HeaderManager.updateHeaders = function (headers) {
        return headers ? AsyncStorage.setItem('__app_headers', JSON.stringify(headers)).then(function () {
            HeaderManager.nbHeaders = Object.assign(HeaderManager.nbHeaders || {}, headers);
            HeaderManager.headerUpdate = true;
        }) : Promise.resolve(null);
    };
    HeaderManager.getHeaders = function () {
        return Promise.resolve(HeaderManager.nbHeaders && HeaderManager.headerUpdate ? HeaderManager.nbHeaders : AsyncStorage.getItem('__app_headers').then(function (h) {
            if (h) {
                var ho = JSON.parse(h);
                HeaderManager.nbHeaders = Object.assign(HeaderManager.nbHeaders || {}, ho);
                HeaderManager.headerUpdate = true;
                return ho;
            }
            else {
                return {};
            }
        }));
    };
    HeaderManager.headerUpdate = false;
    return HeaderManager;
}());
export { HeaderManager };
