import { NBPages } from "./types";
var NBCompApp = /** @class */ (function () {
    function NBCompApp() {
    }
    NBCompApp.navigate = function (page, params) {
        NBCompApp.navigation.navigate(page, params);
    };
    NBCompApp.configInstant = function (client, msgDetailRender) {
        if (client) {
            NBCompApp.instantConfig.instantClient = client;
            console.log('NB组件全局设置', '即使通讯客户端实例设置成功！');
        }
        else {
            console.warn('NB组件全局设置', '即时通讯客户端无效', client);
        }
        if (msgDetailRender) {
            NBCompApp.instantConfig.msgDetailRender = msgDetailRender;
        }
    };
    NBCompApp.configInstantRender = function (msgDetailRender) {
        NBCompApp.instantConfig.msgDetailRender = msgDetailRender;
    };
    NBCompApp.enterInstantChat = function (user) {
        NBCompApp.navigate(NBPages.InstantPage, {
            instantUser: user,
            instantClient: NBCompApp.instantConfig.instantClient
        });
    };
    NBCompApp.instantConfig = {};
    NBCompApp.themeConfig = {
        primaryColor: 'rgba(45, 45, 45, 1)'
    };
    return NBCompApp;
}());
export default NBCompApp;
