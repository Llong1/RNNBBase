import React from "react";
import { ViewProps, TouchableOpacity } from "react-native";
import { View, Text } from "native-base";
import NetInfo, { NetInfoState, NetInfoSubscription } from "@react-native-community/netinfo";
import { NBIconNotice, NBIcons } from "../styles";
import { nbLog } from "../util";

type OnNetworkConnected = () => Promise<boolean>;

interface NBCompNetworkLisProps extends ViewProps {
    onNetworkConnected?: OnNetworkConnected,
    showView?: boolean,
    onPressTigger?: boolean,
    trigger?: boolean
}

export default class NBCompNetworkLis extends React.Component<NBCompNetworkLisProps, { isConnected?: boolean, triggerSuccess?: boolean, trigger?: boolean }> {


    _networkSub?: NetInfoSubscription;

    constructor(props: NBCompNetworkLisProps) {
        super(props);
        this.state = {
            isConnected: true,
            triggerSuccess: false,
            trigger: props.trigger === undefined ? true : props.trigger
        }
    }

    componentDidMount() {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                this._networkListener(state);
            }

            return true;
        }).then(v => {
            this._networkSub = NetInfo.addEventListener(this._networkListener.bind(this));
        })
    }

    componentWillUnmount() {
        if (this._networkSub) {
            this._networkSub();
            this._networkSub = undefined;
        }
    }

    UNSAFE_componentWillReceiveProps(props: NBCompNetworkLisProps) {
        if (props.trigger !== undefined && props.trigger) {
            const oldTrigger = this.state.trigger;
            if (oldTrigger) {
                return;
            }
            this._invokeConnected().then(triggerSuccess => {
                this.setState({
                    triggerSuccess,
                    isConnected: true
                })
            })
        }
    }

    _networkListener = (state: NetInfoState) => {
        const trigger: boolean = this.props.trigger === undefined ? true : this.props.trigger;
        if (!this.state.triggerSuccess) {
            if (state.isConnected) {
                if (trigger) {
                    this._invokeConnected().then(triggerSuccess => {
                        this.setState({
                            triggerSuccess,
                            isConnected: true
                        })
                    }).catch(err => {
                        console.warn(err);
                        this.setState({
                            isConnected: true
                        });
                    })
                } else {
                    this.setState({
                        isConnected: true
                    });
                }
            } else {
                this.setState({
                    isConnected: state.isConnected
                });
            }
        } else {
            this.setState({
                isConnected: state.isConnected
            });
        }
    }

    _invokeConnected(): Promise<boolean> {
        const onConnected: OnNetworkConnected | undefined = this.props.onNetworkConnected;
        const trigger: boolean = this.props.trigger === undefined ? true : this.props.trigger;
        return new Promise((res, rej) => {
            if (!trigger) {
                res(false);
                return;
            }
            if (onConnected === undefined) {
                res(true);
                return;
            }
            try {
                const ret = onConnected();
                if (ret === undefined) {
                    res(true);
                    return;
                }
                if (ret.then) {
                    ret.then(res).catch(rej);
                } else {
                    res(false);
                }
            } catch (error) {
                rej(error);
                return;
            }
        })
    }

    render() {
        if (this.props.showView !== undefined && !this.props.showView) {
            return <View />;
        }
        if (this.state.isConnected) {
            return <View />;
        }
        const { onPressTigger } = this.props;
        return <View style={[{ height: 43 }, this.props.style]}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => {
                if (onPressTigger !== undefined && onPressTigger) {
                    this._invokeConnected().then(is => {
                        this.setState({
                            triggerSuccess: is
                        })
                    })
                }
            }}>
                <View style={[{ backgroundColor: 'rgba(245, 225, 228, 1)', height: 43, flexDirection: 'row', paddingLeft: 23 }]}>
                    <View>
                        <View style={{ flex: 1 }} />
                        <NBIconNotice />
                        <View style={{ flex: 1 }} />
                    </View>
                    <View style={{ marginLeft: 8 }}>
                        <View style={{ flex: 1 }} />
                        <Text style={{ fontSize: 14, color: 'rgba(236, 101, 110, 1)' }}>当前网络不给力，请检查网络设置</Text>
                        <View style={{ flex: 1 }} />
                    </View>
                    <View>
                        <View style={{ flex: 1 }} />
                        <NBIcons.NBIconArrowRight size={20} color="rgba(236, 101, 110, 1)" />
                        <View style={{ flex: 1 }} />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    }
}