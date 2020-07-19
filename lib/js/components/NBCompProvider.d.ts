import React from "react";
import { ViewProps, EmitterSubscription } from "react-native";
import { NBEventILoading } from "../events";
interface NBCompProviderProps extends ViewProps {
}
export default class NBCompProvider extends React.Component<NBCompProviderProps, {
    isLoading: boolean;
}> {
    state: {
        isLoading: boolean;
    };
    emitterSub?: EmitterSubscription;
    componentDidMount(): void;
    componentWillUnmount(): void;
    show(e: NBEventILoading): void;
    render(): JSX.Element;
}
export {};
