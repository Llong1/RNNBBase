import AsyncStorage from '@react-native-community/async-storage';
/**
 * 即时通讯工具类
 */
var InstantsUtils = /** @class */ (function () {
    function InstantsUtils() {
    }
    /**
     * 设置即时通讯配置
     * @param config
     */
    InstantsUtils.setConfig = function (config) {
        var c = Object.assign({}, Object.assign(InstantsUtils.config ? InstantsUtils.config : {}, config));
        return AsyncStorage.setItem('_app_instants_conf', JSON.stringify(c)).then(function () {
            InstantsUtils.config = config;
            return true;
        });
    };
    /**
     * 获取即时通讯配置
     */
    InstantsUtils.loadConfig = function () {
        if (!InstantsUtils.config) {
            return AsyncStorage.getItem("_app_instants_conf").then(function (v) {
                if (v) {
                    InstantsUtils.config = JSON.parse(v);
                }
                return Promise.resolve(InstantsUtils.config || {});
            });
        }
        return Promise.resolve(InstantsUtils.config);
    };
    return InstantsUtils;
}());
export { InstantsUtils };
