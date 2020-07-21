import Constants from "../Constants";

export const isMobile = (p?: string | null | undefined) => {
    if (!p || p === '') return false;
    if (p.length != 11) return false;
    const myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
    return myreg.test(p);
}

export const isEmptyObj = (obj?: any) => {
    if (obj !== undefined && obj !== null) {
        if (typeof obj === 'string') {
            return obj.length === 0;
        }
        return false;
    }
    return true;
}

export const isEmptyArray = (ar?: Array<any>) => {
    return !ar || ar.length === 0;
}

export const randomInt = (min?: number, max?: number) => {
    const minn = min === undefined ? 0 : min;
    const maxx = max === undefined ? 10000 : max;
    let range = maxx - minn;
    let ranValue = minn + Math.round(Math.random() * range);
    return ranValue;
}

export const nbLog = (tag?: string, ...args) => {
    if (Constants.isDebug) {
        console.log(tag, ...args);
    }
}

export const isJsonString = (str: string) => {
    if (str) {
        const s = str.trim();
        return (s.startsWith('{') && s.endsWith('}')) || (s.startsWith('[') && s.endsWith(']'));
    }
    return false;
}

export * from "./tools";