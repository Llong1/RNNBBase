import React from "react";
import { NBConfig } from "../models";
import { NBCompAppThemeConfig } from "./types";
export interface NBCompBaseAppRootAppRouter {
    name: string;
    comp: React.ComponentType<any>;
}
export interface NBCompBaseAppRootPros {
    theme?: any;
    routes?: Array<NBCompBaseAppRootAppRouter>;
    useInstantsLibs?: boolean;
    nbConfig?: NBConfig;
    themeConfig?: NBCompAppThemeConfig;
}
export declare class NBCompBaseAppRoot extends React.Component<NBCompBaseAppRootPros, {
    isLoaded?: boolean;
}> {
    constructor(props: NBCompBaseAppRootPros);
    componentDidMount(): void;
    render(): JSX.Element;
}
