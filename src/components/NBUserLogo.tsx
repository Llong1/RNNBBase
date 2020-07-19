import { View } from "native-base";
import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { getNBUserInfo, NBUserID, NBUserModel } from "../user";

export default class NBUserLogo extends React.Component<{ id?: NBUserID, width?: number, isRound?: boolean, url?: string, onPress?: (u: NBUserModel) => void }, { user?: NBUserModel }> {
    state = {
        user: undefined
    }
    componentDidMount() {
        const { id } = this.props;
        if (id) {
            getNBUserInfo(id).then(v => {
                this.setState({ user: v })
            })
        }
    }

    render() {
        const { id, width, onPress, isRound, url } = this.props;
        const w = width === undefined ? 70 : width;
        const { user } = this.state;
        let userLogo = null;
        let borderRadius = isRound === undefined ? w : (isRound ? w : 0);
        if (user) {
            userLogo = <Image source={{
                uri: user.userLogo
            }} style={{ width: w, height: w, borderRadius }} resizeMode="stretch" />
        }
        return onPress === undefined ? <View style={{
            width: w,
            height: w,
            borderRadius,
            overflow: 'hidden'
        }}>
            {userLogo}
        </View> : <TouchableOpacity onPress={() => {
            onPress(user);
        }} style={{
            width: w,
            height: w,
            borderRadius,
            overflow: 'hidden'
        }}>
                {userLogo}
            </TouchableOpacity>
    }
}