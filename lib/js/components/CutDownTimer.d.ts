import React from "react";
import { ViewProps } from "react-native";
export interface CutDownTimerProps extends ViewProps {
    timeLimit?: number;
    formatLabel?: (time: number, isStarted: boolean) => string;
    onEnd?: Function;
    onStart?: Function;
    autoRun?: boolean;
    validateInput?: () => boolean;
}
export default class CutDownTimer extends React.Component<CutDownTimerProps, {
    limit: number;
    isStarted: boolean;
}> {
    _formatLabel?: (time: number, isStarted: boolean) => string;
    timeHolder?: any;
    isStoped?: boolean;
    constructor(props: CutDownTimerProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    start(): void;
    reset(): void;
    render(): JSX.Element;
}
