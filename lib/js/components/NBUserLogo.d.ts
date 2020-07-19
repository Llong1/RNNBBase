import React from "react";
import { NBUserID, NBUserModel } from "../user";
export default class NBUserLogo extends React.Component<{
    id?: NBUserID;
    width?: number;
    isRound?: boolean;
    url?: string;
    onPress?: (u: NBUserModel) => void;
}, {
    user?: NBUserModel;
}> {
    state: {
        user: any;
    };
    componentDidMount(): void;
    render(): JSX.Element;
}
