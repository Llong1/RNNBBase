import { Toast } from "native-base";

export const showMsg = (msg: string) => {
    Toast.show({
        text: msg,
        buttonText: '确认',
        type: 'success'
    })
}

export const showError = (err: string | Error) => {
    const msg = typeof err === 'string' ? err : err.message;
    Toast.show({
        text: msg,
        buttonText: '确认',
        type: 'danger'
    })
}