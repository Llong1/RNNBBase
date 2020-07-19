var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Root, StyleProvider, View } from "native-base";
import React from "react";
import Constants from "../Constants";
import { getLastNBUserALL, setNBUserAll } from "../user";
import NBPageInstantDetail from "./NBPageInstantDetail";
import { NBPages } from "./types";
import NBCompApp from "./NBCompApp";
var Stack = createStackNavigator();
var NBCompBaseAppRoot = /** @class */ (function (_super) {
    __extends(NBCompBaseAppRoot, _super);
    function NBCompBaseAppRoot() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { isLoaded: false };
        return _this;
    }
    NBCompBaseAppRoot.prototype.componentDidMount = function () {
        var _this = this;
        this.setState({ isLoaded: false });
        var nbConfig = this.props.nbConfig;
        Promise.resolve(nbConfig ? nbConfig : Constants.readLocalConf()).then(function (conf) {
            return Promise.all([getLastNBUserALL().then(function (u) {
                    return setNBUserAll(u);
                }), conf ? Constants.setConf(conf).then(function (r) { return true; }) : Promise.resolve(true)]);
        }).then(function (is) {
            _this.setState({ isLoaded: true });
        })["catch"](function (err) {
            console.warn(err);
            _this.setState({ isLoaded: true });
        });
    };
    NBCompBaseAppRoot.prototype.render = function () {
        if (!this.state.isLoaded) {
            return <View />;
        }
        var _a = this.props, theme = _a.theme, routes = _a.routes, useInstantsLibs = _a.useInstantsLibs;
        var appRouters = [];
        if (routes) {
            appRouters = __spreadArrays(routes);
        }
        if (useInstantsLibs === undefined || useInstantsLibs) {
            appRouters.push({
                name: NBPages.InstantPage,
                comp: NBPageInstantDetail
            });
        }
        return <Root>
            {theme ? <StyleProvider>
                    <NavigationContainer ref={function (o) { return NBCompApp.navigation = o; }}>
                        <Stack.Navigator headerMode="none">
                            {appRouters.map(function (v) { return <Stack.Screen key={v.name} name={v.name} component={v.comp}></Stack.Screen>; })}
                        </Stack.Navigator>
                    </NavigationContainer>
                </StyleProvider> : <NavigationContainer ref={function (o) { return NBCompApp.navigation = o; }}>
                        <Stack.Navigator headerMode="none">
                            {appRouters.map(function (v) { return <Stack.Screen key={v.name} name={v.name} component={v.comp}></Stack.Screen>; })}
                        </Stack.Navigator>
                    </NavigationContainer>}
        </Root>;
    };
    return NBCompBaseAppRoot;
}(React.Component));
export { NBCompBaseAppRoot };
