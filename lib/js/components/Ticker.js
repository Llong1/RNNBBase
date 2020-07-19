var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useRef, useEffect, useState, Children } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
var styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        overflow: "hidden"
    },
    hide: {
        position: "absolute",
        top: 0,
        left: 0,
        opacity: 0
    }
});
var uniq = function (values) {
    return values.filter(function (value, index) {
        return values.indexOf(value) === index;
    });
};
var range = function (length) { return Array.from({ length: length }, function (x, i) { return i; }); };
var splitText = function (text) {
    if (text === void 0) { text = ""; }
    return (text + "").split("");
};
var numberRange = range(10).map(function (p) { return p + ""; });
var numAdditional = [",", "."];
var numberItems = __spreadArrays(numberRange, numAdditional);
var isNumber = function (v) { return !isNaN(parseInt(v)); };
var getPosition = function (_a) {
    var text = _a.text, items = _a.items, height = _a.height;
    var index = items.findIndex(function (p) { return p === text; });
    return index * height * -1;
};
export var Tick = function (_a) {
    var props = __rest(_a, []);
    //@ts-ignore
    return <TickItem {...props}/>;
};
var useInitRef = function (cb) {
    var ref = useRef();
    if (!ref.current) {
        ref.current = cb();
    }
    return ref.current;
};
var TickItem = function (_a) {
    var children = _a.children, duration = _a.duration, textStyle = _a.textStyle, textProps = _a.textProps, measureMap = _a.measureMap, rotateItems = _a.rotateItems;
    var measurement = measureMap[children];
    var position = getPosition({
        text: children,
        height: measurement.height,
        items: rotateItems
    });
    var widthAnim = useInitRef(function () { return new Animated.Value(measurement.width); });
    var stylePos = useInitRef(function () { return new Animated.Value(position); });
    useEffect(function () {
        if (stylePos) {
            Animated.timing(stylePos, {
                toValue: position,
                duration: duration,
                easing: Easing.linear
            }).start();
            Animated.timing(widthAnim, {
                toValue: measurement.width,
                duration: 25,
                easing: Easing.linear
            }).start();
        }
    }, [position, measurement]);
    return (<Animated.View style={{
        height: measurement.height,
        width: widthAnim,
        overflow: "hidden"
    }}>
            <Animated.View style={{
        transform: [{ translateY: stylePos }]
    }}>
                {rotateItems.map(function (v) { return (<Text key={v} {...textProps} style={[textStyle, { height: measurement.height }]}>
                        {v}
                    </Text>); })}
            </Animated.View>
        </Animated.View>);
};
var Ticker = function (_a) {
    var _b = _a.duration, duration = _b === void 0 ? 250 : _b, textStyle = _a.textStyle, textProps = _a.textProps, children = _a.children;
    var _c = useState(false), measured = _c[0], setMeasured = _c[1];
    var measureMap = useRef({});
    var measureStrings = Children.map(children, function (child) {
        if (typeof child === "string" || typeof child === "number") {
            return splitText("" + child);
        }
        else {
            //@ts-ignore
            return child.props && child.props.rotateItems;
        }
    }).reduce(function (acc, val) { return acc.concat(val); }, []);
    var hasNumbers = measureStrings.find(function (v) { return isNumber(v); }) !== undefined;
    var rotateItems = uniq(__spreadArrays((hasNumbers ? numberItems : []), measureStrings));
    var handleMeasure = function (e, v) {
        if (!measureMap.current)
            return;
        measureMap.current[v] = {
            width: e.nativeEvent.layout.width,
            height: e.nativeEvent.layout.height
        };
        if (Object.keys(measureMap.current).length === rotateItems.length) {
            setMeasured(true);
        }
    };
    return (<View style={styles.row}>
            {measured === true &&
        Children.map(children, function (child) {
            if (typeof child === "string" || typeof child === "number") {
                return splitText("" + child).map(function (text, index) {
                    var items = isNumber(text) ? numberItems : [text];
                    return (<TickItem key={index} duration={duration} textStyle={textStyle} textProps={textProps} rotateItems={items} measureMap={measureMap.current}>
                                    {text}
                                </TickItem>);
                });
            }
            else {
                //@ts-ignore
                return React.cloneElement(child, {
                    duration: duration,
                    textStyle: textStyle,
                    textProps: textProps,
                    measureMap: measureMap.current
                });
            }
        })}
            {rotateItems.map(function (v) {
        return (<Text key={v} {...textProps} style={[textStyle, styles.hide]} onLayout={function (e) { return handleMeasure(e, v); }}>
                        {v}
                    </Text>);
    })}
        </View>);
};
Ticker.defaultProps = {
    duration: 250
};
export default Ticker;
