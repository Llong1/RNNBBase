import { Toast } from "native-base";
export var showMsg = function (msg) {
    Toast.show({
        text: msg,
        buttonText: '确认',
        type: 'success'
    });
};
export var showError = function (err) {
    var msg = typeof err === 'string' ? err : err.message;
    Toast.show({
        text: msg,
        buttonText: '确认',
        type: 'danger'
    });
};
