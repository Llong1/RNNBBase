import React from "react";
import { Modal, View, ViewProps, EmitterSubscription } from "react-native";
import { addNBEventListener, NBEventILoading } from "../events";
import { NBCompAnimaLoadingModal } from "./anamations";

interface NBCompProviderProps extends ViewProps {

}

export default class NBCompProvider extends React.Component<NBCompProviderProps, { isLoading: boolean }> {
    state = {
        isLoading: false
    }

    emitterSub?: EmitterSubscription;

    componentDidMount() {
        this.emitterSub = addNBEventListener('_nb_event_loading', this.show.bind(this));
    }

    componentWillUnmount() {
        if (this.emitterSub) {
            this.emitterSub.remove();
            this.emitterSub = undefined;
        }
    }

    show(e: NBEventILoading) {
        this.setState({
            isLoading: e.isLoading
        })
    }

    render() {
        return <View style={[{ flex: 1 }, this.props.style]}>
            <Modal visible={this.state.isLoading} transparent>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={{ flex: 1 }} />
                    <NBCompAnimaLoadingModal />
                    <View style={{ flex: 1 }} />
                </View>
            </Modal>
            {this.props.children}
        </View>
    }
}