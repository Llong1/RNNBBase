var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React from "react";
import { TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import { View } from "native-base";
var normalStar = function (props) {
    return <SvgXml xml={"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"" + (props.size || 24) + "\" height=\"" + (props.size || 24) + "\" style=\"fill: rgba(203, 203, 203, 1);\"><path d=\"M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z\"/></svg>"}/>;
};
var rateStar = function (props) {
    return <SvgXml xml={"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"" + (props.size || 24) + "\" height=\"" + (props.size || 24) + "\" style=\"fill: " + (props.color || 'rgba(255, 113, 67, 1)') + ";\"><path d=\"M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z\"/></svg>"}/>;
};
var NBCompStar = /** @class */ (function (_super) {
    __extends(NBCompStar, _super);
    function NBCompStar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            rateStar: 0
        };
        return _this;
    }
    NBCompStar.prototype.selectStar = function (star) {
        var onStarSelected = this.props.onStarSelected;
        this.setState({
            rateStar: star
        }, function () {
            if (onStarSelected) {
                onStarSelected(star);
            }
        });
    };
    NBCompStar.prototype.buildStar = function (isNormal, star) {
        var _this = this;
        var _a = this.props, starSpace = _a.starSpace, starSize = _a.starSize, starColor = _a.starColor;
        var size = starSize === undefined ? 24 : starSize;
        var color = starColor === undefined ? 'rgba(255, 113, 67, 1)' : starColor;
        return <TouchableOpacity key={star} onPress={function () {
            _this.selectStar(star);
        }} style={star === 0 ? { alignItems: 'center' } : {
            alignItems: 'center',
            marginLeft: starSpace === undefined ? 5 : starSpace
        }}>
            <View>
                <View style={{ flex: 1 }}/>
                {isNormal ? normalStar({
            size: size
        }) : rateStar({
            size: size,
            color: color
        })}
                <View style={{ flex: 1 }}/>
            </View>
        </TouchableOpacity>;
    };
    NBCompStar.prototype.render = function () {
        var starNums = this.props.starNums;
        var stars = [];
        var sn = starNums;
        if (starNums === undefined || starNums <= 0) {
            sn = 5;
        }
        for (var i = 0; i < sn; i++) {
            stars.push(this.buildStar(i >= this.state.rateStar, i));
        }
        return <View style={[{ flexDirection: 'row' }, this.props.style]}>
            {stars}
        </View>;
    };
    return NBCompStar;
}(React.Component));
export { NBCompStar };
