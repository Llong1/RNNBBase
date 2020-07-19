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
import { View } from "native-base";
import React from "react";
/**
 * api视图
 */
var ApiView = /** @class */ (function (_super) {
    __extends(ApiView, _super);
    function ApiView(pros) {
        var _this = _super.call(this, pros) || this;
        _this.params = pros.params;
        return _this;
    }
    ApiView.prototype.componentDidMount = function () {
        this.setState({
            isLoading: false,
            params: this.props.params,
            data: null
        });
        if (this.props.autoLoad === undefined || this.props.autoLoad) {
            this.doAction('load');
        }
    };
    ApiView.prototype.UNSAFE_componentWillReceiveProps = function (pros) {
        if (pros.params) {
            if (!this.params) {
                this.params = pros.params;
                this.setState({
                    params: pros.params
                });
                this.doAction('refresh');
            }
            else {
                var old = JSON.stringify(this.params);
                var n = JSON.stringify(pros.params);
                if (old !== n) {
                    this.params = pros.params;
                    this.setState({
                        params: pros.params
                    });
                    this.doAction('refresh');
                }
            }
        }
        else {
            if (pros.autoLoad === undefined || pros.autoLoad) {
                this.params = null;
                this.setState({
                    params: null
                });
                this.params = this.defaultParams;
                this.doAction('refresh');
            }
        }
    };
    ApiView.prototype.doAction = function (a) {
        var _this = this;
        return new Promise(function (res, rej) {
            if (a === 'clear') {
                _this.setState({
                    data: null
                });
                res(null);
                return;
            }
            if (_this.api) {
                _this.setState({
                    isLoading: true
                });
                _this.api.request(_this.params || _this.defaultParams).then(function (v) {
                    _this.setState({
                        isLoading: false
                    });
                    requestAnimationFrame(function () {
                        res(v);
                        _this.bindData(v);
                    });
                })["catch"](function (e) {
                    _this.setState({
                        isLoading: false
                    });
                    rej(e);
                });
            }
            else {
                res(null);
            }
        });
    };
    ApiView.prototype.bindData = function (d) {
        this.setState({
            data: d
        });
    };
    ApiView.prototype.render = function () {
        return <View></View>;
    };
    return ApiView;
}(React.Component));
export { ApiView };
var ModelView = /** @class */ (function (_super) {
    __extends(ModelView, _super);
    function ModelView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ModelView;
}(React.Component));
export { ModelView };
var BaseAppPage = /** @class */ (function (_super) {
    __extends(BaseAppPage, _super);
    function BaseAppPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaseAppPage.prototype.pushPage = function (page, params) {
        if (this.props.navigation) {
            this.props.navigation.navigate(page, params);
            return;
        }
        throw new Error('无效的导航内容！');
    };
    BaseAppPage.prototype.goBackPage = function () {
        if (this.props.navigation) {
            this.props.navigation.goBack();
            return;
        }
        throw new Error('无效的导航内容！');
    };
    BaseAppPage.prototype.replacePage = function (page, params) {
        if (this.props.navigation) {
            this.props.navigation.replace(page, params);
            return;
        }
        throw new Error('无效的导航内容！');
    };
    return BaseAppPage;
}(React.Component));
export { BaseAppPage };
export var NBPages = {
    InstantPage: 'nbInstantDetail'
};
