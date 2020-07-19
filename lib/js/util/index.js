var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import Constants from "../Constants";
export var isMobile = function (p) {
    if (!p || p === '')
        return false;
    if (p.length != 11)
        return false;
    var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
    return myreg.test(p);
};
export var isEmptyObj = function (obj) {
    if (obj !== undefined && obj !== null) {
        if (typeof obj === 'string') {
            return obj.length === 0;
        }
        return false;
    }
    return true;
};
export var isEmptyArray = function (ar) {
    return !ar || ar.length === 0;
};
export var randomInt = function (min, max) {
    var minn = min === undefined ? 0 : min;
    var maxx = max === undefined ? 10000 : max;
    var range = maxx - minn;
    var ranValue = minn + Math.round(Math.random() * range);
    return ranValue;
};
export var nbLog = function (tag) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (Constants.isDebug) {
        console.log.apply(console, __spreadArrays([tag], args));
    }
};
export var isJsonString = function (str) {
    if (str) {
        var s = str.trim();
        return (s.startsWith('{') && s.endsWith('}')) || (s.startsWith('[') && s.endsWith(']'));
    }
    return false;
};
export * from "./tools";
