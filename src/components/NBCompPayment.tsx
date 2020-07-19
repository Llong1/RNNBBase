import { Container, Content, H3, Radio, Text, View, Header } from "native-base";
import React from "react";
import { Image, StatusBar, Dimensions, Platform, ViewProps } from "react-native";
import { NBIconArrowLeft, NBIconAlipay } from "../styles";
import NBCompApp from "./NBCompApp";
import { payType, NBSurpportPayMode } from "../pay";

const defaultThemeColor: string = "rgba(45, 45, 45, 1)";

type PayExplainType = 'url' | 'inApp';

interface NBCompPaymentGroupProps extends ViewProps {
    surpportType?: NBSurpportPayMode
}

interface NBCompPaymentGroupState {
    payType?: payType
}

export class NBCompPaymentGroup extends React.Component<NBCompPaymentGroupProps, NBCompPaymentGroupState> {
    state = {
        payType: undefined
    }

    render() {
        const { surpportType } = this.props;
        return <View style={[{ width: 334, paddingTop: 20, paddingLeft: 25, paddingRight: 25, paddingBottom: 35, backgroundColor: 'white', borderRadius: 15, overflow: 'hidden' }, this.props.style]}>
            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>支付方式</Text>
            <View style={{ flexDirection: 'row', marginTop: 35 }}>
                <NBIconAlipay size={35} />
                <Text style={{ fontSize: 16 }}>支付方式</Text>
                <View style={{ flex: 1 }} />
                <Radio selected={this.state.payType === undefined || this.state.payType === 'alipay'} />
            </View>
        </View>
    }
}

export interface NBCompPaymentRouteParams {
    isDebug?: boolean,
    money: number,
    orderInfo?: string,
    title?: string,
    themeColor?: string,
    explain?: {
        type: PayExplainType,
        text?: string,
        target?: string,
        params?: any
    }
}

export class NBCompPayment extends React.Component<any> {
    render() {
        const params: NBCompPaymentRouteParams = this.props.route.params;
        return <Container>
            <Header style={{ backgroundColor: params.themeColor || defaultThemeColor, margin: 0, padding: 0 }}>
                <View style={{ flexDirection: 'row', height: 56, width: Dimensions.get('screen').width, paddingLeft: 16, marginTop: Platform.OS === 'android' ? 10 : 0, paddingRight: 56 }}>
                    <NBIconArrowLeft onPress={() => {
                        if (this.props.navigation) {
                            this.props.navigation.goBack();
                        } else {
                            if (NBCompApp.navigation) {
                                NBCompApp.navigation.goBack();
                            }
                        }
                    }} />
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ marginLeft: 20, color: 'white', fontSize: 16, lineHeight: 22 }}>{params.title || "支付"}</Text>
                    </View>
                </View>
            </Header>
            <StatusBar backgroundColor={params.themeColor || defaultThemeColor} />
            <Content>
                <View style={{ backgroundColor: params.themeColor || defaultThemeColor, paddingBottom: 201 }}>
                    <View style={{ marginTop: 48 }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold' }}>¥{params.money.toFixed(2)}</Text>
                        </View>
                    </View>
                </View>
            </Content>
        </Container>
    }
}