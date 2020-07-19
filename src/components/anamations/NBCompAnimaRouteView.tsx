import React from "react";
import { Animated, Easing, View, ViewProps } from "react-native";

export interface NBCompAnimaRouteViewProps extends ViewProps {
    speed?: number
}

export default class NBCompAnimaRouteView extends React.PureComponent<NBCompAnimaRouteViewProps> {
    spinValue = new Animated.Value(0);
    isStoped = false;
    componentDidMount() {
        this.isStoped = false;
        this.spin();
    }
    //旋转方法
    spin = () => {
        const { speed } = this.props;
        this.spinValue.setValue(0)
        Animated.timing(this.spinValue, {
            toValue: 1,
            duration: speed === undefined ? 4000 : speed,
            easing: Easing.linear,
            useNativeDriver: false
        }).start(() => {
            if (!this.isStoped) {
                this.spin()
            }
        })
    }

    componentWillUnmount() {
        this.isStoped = true;
    }

    render() {
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],//输入值
            outputRange: ['0deg', '360deg'] //输出值
        })
        return <View style={[{ alignItems: 'center' }, this.props.style]}>
            <Animated.View style={{
                transform: [{ rotate: spin }]
            }}>
                {this.props.children}
            </Animated.View>
        </View>
    }
}