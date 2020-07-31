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
import ImagePicker from "react-native-image-picker";
import { TouchableOpacity, Image } from "react-native";
import { nbLog, showMsg } from "../util";
import { nbFileUploda } from "../network";
import { View, Icon } from "native-base";
var NBCompUploadPickerImage = /** @class */ (function (_super) {
    __extends(NBCompUploadPickerImage, _super);
    function NBCompUploadPickerImage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isUploading: false,
            percent: 0,
            imageSource: undefined
        };
        return _this;
    }
    NBCompUploadPickerImage.prototype.onPrecces = function (e) {
        if (this.props.showPreccess === undefined || this.props.showPreccess) {
            nbLog('上传图片选择器', '上传进度', e);
        }
    };
    NBCompUploadPickerImage.prototype.uploadFile = function () {
        var _this = this;
        var _a = this.props, onUploadSuccess = _a.onUploadSuccess, onUploadFail = _a.onUploadFail;
        if (!this.state.imageSource) {
            if (onUploadFail) {
                onUploadFail(this.state.imageSource, '请选择图片！');
            }
            return Promise.resolve({
                success: false,
                reason: '请选择图片！'
            });
        }
        var r = this.state.imageSource;
        this.setState({
            isUploading: true
        });
        return nbFileUploda({
            uri: r.uri,
            name: r.fileName,
            type: 'application/octet-stream'
        }, this.onPrecces.bind(this)).then(function (rr) {
            _this.setState({
                isUploading: false
            });
            nbLog('上传图片选择器', '上传成功！');
            if (onUploadSuccess) {
                onUploadSuccess(r);
            }
            return Promise.resolve({
                success: true,
                result: rr,
                source: r
            });
        })["catch"](function (err) {
            nbLog('上传图片选择器', '上传失败：', err);
            _this.setState({
                isUploading: false
            });
            if (onUploadFail) {
                onUploadFail(r, err);
            }
            return Promise.resolve({
                success: false,
                source: r
            });
        });
    };
    NBCompUploadPickerImage.prototype.render = function () {
        var _this = this;
        var _a = this.props, onCancel = _a.onCancel, onPickError = _a.onPickError, onCustomBtn = _a.onCustomBtn, onChooseSuccess = _a.onChooseSuccess, autoUpload = _a.autoUpload;
        var imageSource = this.state.imageSource ? this.state.imageSource : this.props.defaultImage;
        var width = this.props.width ? this.props.width : 400;
        var height = this.props.height ? this.props.height : 400;
        return <TouchableOpacity activeOpacity={this.state.isUploading ? (this.props.cancelAble ? 0.8 : 1) : 0.8} onPress={function () {
            if (_this.state.isUploading) {
                showMsg('图片上传中!');
                return;
            }
            var options = Object.assign({
                title: '选择图片',
                cancelButtonTitle: '取消上传',
                takePhotoButtonTitle: '相册选择',
                chooseFromLibraryButtonTitle: '图库选择',
                chooseWhichLibraryTitle: '选择路径',
                cameraType: 'back',
                mediaType: 'photo',
                maxWidth: width,
                maxHeight: height,
                storageOptions: {
                    skipBackup: true,
                    path: 'images'
                },
                permissionDenied: {
                    title: '权限出错',
                    text: '无权限',
                    reTryTitle: '重试',
                    okTitle: '确认'
                }
            }, _this.props.options);
            ImagePicker.showImagePicker(options, function (r) {
                if (r.didCancel) {
                    nbLog('上传图片选择器', '用户取消！');
                    if (onCancel) {
                        onCancel();
                    }
                }
                else if (r.error) {
                    nbLog('上传图片选择器', '选择出错：', r.error);
                    if (onPickError) {
                        onPickError(r.error);
                    }
                }
                else if (r.customButton) {
                    nbLog('上传图片选择器', '自定义按钮', r.customButton);
                    if (onCustomBtn) {
                        onCustomBtn(r.customButton);
                    }
                }
                else {
                    if (onChooseSuccess) {
                        if (!onChooseSuccess(r)) {
                            return;
                        }
                    }
                    _this.setState({
                        imageSource: r
                    }, function () {
                        if (autoUpload === undefined || autoUpload) {
                            _this.uploadFile();
                        }
                    });
                }
            });
        }}>
            {imageSource ? <View style={[{ width: width, height: height }, this.props.style]}>
                    <Image source={imageSource} style={{
            width: width, height: height
        }} resizeMode={this.props.resizeMode || 'stretch'}/>
                </View> : (this.props.children ? this.props.children : <View style={[{ width: width, height: height, alignItems: 'center' }, this.props.style]}>
                    <View style={{ flex: 1 }}/>
                    <Icon type="FontAwesome5" name="plus" color="rgba(245, 245, 245, 1)" fontSize={24}/>
                    <View style={{ flex: 1 }}/>
                </View>)}
        </TouchableOpacity>;
    };
    return NBCompUploadPickerImage;
}(React.Component));
export default NBCompUploadPickerImage;
