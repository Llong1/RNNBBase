import React from "react";
import { Text, View } from "native-base";
import { ViewProps } from "react-native";
import { NBIconCubes } from "../../styles";

interface BannerHeaderProps extends ViewProps {

}

export default class BannerHeader extends React.Component<BannerHeaderProps> {
    render() {
        return (<View style={[{ backgroundColor: 'rgba(251, 109, 58, 1)', flexDirection: 'row', borderTopLeftRadius: 10, borderTopRightRadius: 10, height: 44 }, this.props.style]}>
            <View style={{ flex: 1 }} />
            <View style={{ marginBottom: 18 }}>
                <View style={{ flex: 1 }} />
                <View style={{ width: 40, height: 1, backgroundColor: 'white' }} />
            </View>
            <View>
                <View style={{ flex: 1 }} />
                <NBIconCubes style={{ marginLeft: 5 }} />
                <View style={{ flex: 1 }} />
            </View>
            <View>
                <View style={{ flex: 1 }} />
                <Text style={{ lineHeight: 16, color: 'white', marginLeft: 5, marginRight: 5 }}>看看以下好货</Text>
                <View style={{ flex: 1 }} />
            </View>
            <View style={{ marginBottom: 18 }}>
                <View style={{ flex: 1 }} />
                <View style={{ width: 40, height: 1, backgroundColor: 'white' }} />
            </View>
            <View style={{ flex: 1 }} />
        </View>)
    }
}