import React from "react";
import { ViewProps } from "react-native";
export interface NBCompStarProps extends ViewProps {
    starSize?: number;
    starNums?: number;
    starSpace?: number;
    starColor?: string;
    onStarSelected?: (star: number) => void;
}
export declare class NBCompStar extends React.Component<NBCompStarProps, {
    rateStar: number;
}> {
    state: {
        rateStar: number;
    };
    private selectStar;
    private buildStar;
    render(): JSX.Element;
}
