import React from "react";
import { NBConfig } from "../models";
export interface NBCompBaseAppRootAppRouter {
    name: string;
    comp: React.ComponentType<any>;
}
export interface NBCompBaseAppRootPros {
    theme?: any;
    routes?: Array<NBCompBaseAppRootAppRouter>;
    useInstantsLibs?: boolean;
    nbConfig?: NBConfig;
}
export declare class NBCompBaseAppRoot extends React.Component<NBCompBaseAppRootPros, {
    isLoaded?: boolean;
}> {
    state: {
        isLoaded: boolean;
    };
    componentDidMount(): void;
    render(): JSX.Element;
}
