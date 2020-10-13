import React, { useState } from "react";
import { View, Modal, Text, TouchableOpacity, Platform } from "react-native";
import moment from "moment";
export var NBCompDatePicker = function (props) {
    var _a = useState(false), showPicker = _a[0], setShowPicker = _a[1];
    var _b = useState(props.currentDate ? props.currentDate : (props.minDate ? props.minDate : new Date())), currentDate = _b[0], setCurrentDate = _b[1];
    var format = props.dateFormat || 'YYYY-MM-DD';
    var mode = 'datetime';
    if (format === 'DD/HH/YYYY' || format === 'YYYY年MM月DD日' || format === 'YYYY-MM-DD') {
        mode = 'date';
    }
    var _onChange = function (e, d) {
        var onDateChanged = props.onDateChanged;
        if (d) {
            setCurrentDate(d);
            if (onDateChanged) {
                onDateChanged(d);
            }
        }
    };
    var DateTimePicker = require('@react-native-community/datetimepicker');
    return <View>
        <Modal transparent visible={showPicker}>
            <TouchableOpacity style={{ flex: 0.6, backgroundColor: 'rgba(0,0,0,0.5)' }} onPress={function () {
        setShowPicker(false);
    }}>
                <View style={{ flex: 1 }}/>
            </TouchableOpacity>
            <View style={{ flex: 0.4, backgroundColor: 'white' }}>
                {showPicker ? (Platform.OS === 'ios' ?
        <DateTimePicker value={currentDate} date={currentDate} locale="zh_CN" minimumDate={props.minDate} onChange={_onChange} mode={mode}/> :
        <DateTimePicker value={currentDate} locale="zh_CN" mode={mode} onChange={_onChange}/>) : null}
            </View>
        </Modal>
        <TouchableOpacity onPress={function () {
        setShowPicker(true);
    }}>
            <Text style={[{
            color: '#666',
            fontSize: 14
        }, props.textStyle]}>
                {moment(currentDate).format(format)}
            </Text>
        </TouchableOpacity>
    </View>;
};
// export class NBCompDatePicker extends React.Component<NBCompDatePickerPorps, {
//     showPicker?: boolean,
//     currentDate?: Date
// }> {
//     constructor(props: NBCompDatePickerPorps) {
//         super(props);
//         this.state = {
//             currentDate: props.currentDate ? props.currentDate : (props.minDate ? props.minDate : new Date()),
//             showPicker: false
//         }
//     }
//     private renderPicker() {
//         const { showPicker, currentDate } = this.state;
//         if (!showPicker) return null;
//         const format = this.props.dateFormat || 'YYYY-MM-DD';
//         if (Platform.OS === 'ios') {
//             let mode: 'date' | 'time' | 'datetime' | 'countdown' = 'datetime';
//             if (format === 'DD/HH/YYYY' || format === 'YYYY年MM月DD日' || format === 'YYYY-MM-DD') {
//                 mode = 'date';
//             }
//             return <DateTimePicker
//                 value={currentDate}
//                 date={currentDate}
//                 locale="zh_CN"
//                 minimumDate={this.props.minDate}
//                 onChange={this._onChange.bind(this)}
//                 mode={mode} />
//         }
//         let mode: 'date' | 'time' = 'time';
//         if (format === 'DD/HH/YYYY' || format === 'YYYY年MM月DD日' || format === 'YYYY-MM-DD') {
//             mode = 'date';
//         }
//         return <DateTimePicker value={currentDate} locale="zh_CN" mode={mode} onChange={this._onChange.bind(this)} />
//     }
//     private _onChange(e: Event, d?: Date) {
//         const { onDateChanged } = this.props;
//         if (d) {
//             this.setState({
//                 currentDate: d
//             }, () => {
//                 onDateChanged(d);
//             })
//         }
//     }
//     render() {
//         const { showPicker, currentDate } = this.state;
//         const format = this.props.dateFormat || 'YYYY-MM-DD';
//         return <View>
//             <Modal transparent visible={showPicker}>
//                 <TouchableOpacity style={{ flex: 0.6, backgroundColor: 'rgba(0,0,0,0.5)' }} onPress={() => {
//                     this.setState({
//                         showPicker: false
//                     })
//                 }}>
//                     <View style={{ flex: 1 }} />
//                 </TouchableOpacity>
//                 <View style={{ flex: 0.4, backgroundColor: 'white' }}>
//                     {
//                         this.renderPicker()
//                     }
//                 </View>
//             </Modal>
//             <TouchableOpacity onPress={() => {
//                 this.setState({
//                     showPicker: true
//                 })
//             }}>
//                 <Text style={[{
//                     color: '#666',
//                     fontSize: 14
//                 }, this.props.textStyle]}>
//                     {moment(currentDate).format(format)}
//                 </Text>
//             </TouchableOpacity>
//         </View>
//     }
// }
