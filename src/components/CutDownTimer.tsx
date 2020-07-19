import React from "react";
import { ViewProps } from "react-native";
import { View, Text } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";

export interface CutDownTimerProps extends ViewProps {
    timeLimit?: number,
    formatLabel?: (time: number, isStarted: boolean) => string,
    onEnd?: Function,
    onStart?: Function,
    autoRun?: boolean,
    validateInput?: () => boolean
}

export default class CutDownTimer extends React.Component<CutDownTimerProps, { limit: number, isStarted: boolean }> {
    _formatLabel?: (time: number, isStarted: boolean) => string;
    timeHolder?: any;
    isStoped?: boolean;
    constructor(props: CutDownTimerProps) {
        super(props);
        this.state = {
            limit: props.timeLimit || 60,
            isStarted: false
        };
        this.isStoped = false;
        if (props.formatLabel) {
            this._formatLabel = props.formatLabel;
        } else {
            this._formatLabel = (time: number, isStarted: boolean) => {
                if (!isStarted) {
                    return "获取验证码";
                }
                return `重新发送验证码（${time}）s`
            }
        }
    }

    componentDidMount() {
        if (this.props.autoRun) {
            this.start();
        }
    }

    componentWillUnmount() {
        if (this.timeHolder) {
            clearTimeout(this.timeHolder);
            this.timeHolder = null;
        }
        this.isStoped = true;
    }

    start() {
        if (this.timeHolder) {
            clearTimeout(this.timeHolder);
            this.timeHolder = null;
        }
        this.isStoped = false;
        const self = this;
        const func = () => {
            if (self.timeHolder) {
                clearTimeout(self.timeHolder);
                self.timeHolder = null;
            }

            self.setState({
                isStarted: true
            })
            self.timeHolder = setTimeout(() => {
                if (self.isStoped) {
                    self.reset();
                    return;
                }
                const lm = self.state.limit - 1;
                if (lm >= 0) {
                    self.setState({
                        limit: lm
                    });
                    func();
                } else {
                    self.reset();
                }
            }, 1000);
        };

        func();

        if (this.props.onStart) {
            this.props.onStart();
        }
    }

    reset() {
        if (this.timeHolder) {
            clearTimeout(this.timeHolder);
            this.timeHolder = null;
        }
        this.setState({
            limit: this.props.timeLimit || 60,
            isStarted: false
        });
        this.isStoped = true;

        if (this.props.onEnd) {
            this.props.onEnd();
        }
    }

    render() {
        const props = this.props;
        return this.state.isStarted ? <View style={[{ alignItems: 'center' }, props.style]}>
            <Text style={{ fontSize: 12, color: 'black' }}>{this._formatLabel(this.state.limit, true)}</Text>
        </View> : <TouchableOpacity style={[{ alignItems: 'center' }, props.style]} onPress={() => {
            if (this.props.validateInput) {
                if (this.props.validateInput()) {
                    this.start();
                }
            } else {
                this.start();
            }
        }}>
                <Text style={{ fontSize: 12, color: 'black' }}>{this._formatLabel(this.state.limit, false)}</Text>
            </TouchableOpacity>
    }
}