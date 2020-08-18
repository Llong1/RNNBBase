import React from "react";
import { ViewProps, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import { NBIconPros } from "../styles";
import { View } from "native-base";

const normalStar = (props: NBIconPros) => {
    return <SvgXml xml={`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${props.size || 24}" height="${props.size || 24}" style="fill: rgba(203, 203, 203, 1);"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/></svg>`} />
}

const rateStar = (props: NBIconPros) => {
    return <SvgXml xml={`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${props.size || 24}" height="${props.size || 24}" style="fill: ${props.color || 'rgba(255, 113, 67, 1)'};"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`} />
}

export interface NBCompStarProps extends ViewProps {
    starSize?: number,
    starNums?: number,
    starSpace?: number,
    starColor?: string,
    onStarSelected?: (star: number) => void
}

export class NBCompStar extends React.Component<NBCompStarProps, { rateStar: number }> {
    state = {
        rateStar: 0
    };

    private selectStar(star: number): void {
        const { onStarSelected } = this.props;
        this.setState({
            rateStar: star
        }, () => {
            if (onStarSelected) {
                onStarSelected(star);
            }
        })
    }

    private buildStar(isNormal: boolean, star: number) {
        const { starSpace, starSize, starColor } = this.props;
        const size = starSize === undefined ? 24 : starSize;
        const color = starColor === undefined ? 'rgba(255, 113, 67, 1)' : starColor;
        return <TouchableOpacity key={star} onPress={() => {
            this.selectStar(star);
        }} style={star === 0 ? { alignItems: 'center' } : {
            alignItems: 'center',
            marginLeft: starSpace === undefined ? 5 : starSpace
        }}>
            <View>
                <View style={{ flex: 1 }} />
                {
                    isNormal ? normalStar({
                        size
                    }) : rateStar({
                        size,
                        color
                    })
                }
                <View style={{ flex: 1 }} />
            </View>
        </TouchableOpacity>;
    }
    render() {
        const { starNums } = this.props;
        let stars = [];
        let sn = starNums;
        if (starNums === undefined || starNums <= 0) {
            sn = 5;
        }
        for (let i = 0; i < sn; i++) {
            stars.push(this.buildStar(i >= this.state.rateStar, i));
        }
        return <View style={[{ flexDirection: 'row' }, this.props.style]}>
            {stars}
        </View>
    }
}