import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Root, StyleProvider, View } from "native-base";
import React from "react";
import Constants from "../Constants";
import { NBConfig } from "../models";
import { getLastNBUserALL, setNBUserAll } from "../user";
import NBPageInstantDetail from "./NBPageInstantDetail";
import { NBPages } from "./types";
import NBCompApp from "./NBCompApp";

export interface NBCompBaseAppRootAppRouter {
    name: string,
    comp: React.ComponentType<any>
}

export interface NBCompBaseAppRootPros {
    theme?: any,
    routes?: Array<NBCompBaseAppRootAppRouter>,
    useInstantsLibs?: boolean,
    nbConfig?: NBConfig
}

const Stack = createStackNavigator();

export class NBCompBaseAppRoot extends React.Component<NBCompBaseAppRootPros, { isLoaded?: boolean }> {
    state = { isLoaded: false };
    componentDidMount() {

        this.setState({ isLoaded: false });
        const nbConfig: NBConfig = this.props.nbConfig;
        Promise.resolve(nbConfig ? nbConfig : Constants.readLocalConf()).then(conf => {
            return Promise.all([getLastNBUserALL().then(u => {
                return setNBUserAll(u);
            }), conf ? Constants.setConf(conf).then(r => true) : Promise.resolve(true)]);
        }).then(is => {
            this.setState({ isLoaded: true });
        }).catch(err => {
            console.warn(err);
            this.setState({ isLoaded: true });
        })
    }
    render() {
        if (!this.state.isLoaded) {
            return <View />
        }
        const { theme, routes, useInstantsLibs } = this.props;
        let appRouters: Array<NBCompBaseAppRootAppRouter> = [];
        if (routes) {
            appRouters = [
                ...routes
            ]
        }

        if (useInstantsLibs === undefined || useInstantsLibs) {
            appRouters.push({
                name: NBPages.InstantPage,
                comp: NBPageInstantDetail
            })
        }

        return <Root>
            {
                theme ? <StyleProvider>
                    <NavigationContainer ref={o => NBCompApp.navigation = o}>
                        <Stack.Navigator headerMode="none">
                            {
                                appRouters.map(v => <Stack.Screen key={v.name} name={v.name} component={v.comp}></Stack.Screen>)
                            }
                        </Stack.Navigator>
                    </NavigationContainer>
                </StyleProvider> : <NavigationContainer ref={o => NBCompApp.navigation = o}>
                        <Stack.Navigator headerMode="none">
                            {
                                appRouters.map(v => <Stack.Screen key={v.name} name={v.name} component={v.comp}></Stack.Screen>)
                            }
                        </Stack.Navigator>
                    </NavigationContainer>
            }
        </Root>
    }
}