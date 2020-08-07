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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from "react";
import ImagePicker from "react-native-image-picker";
import { ActivityIndicator, TouchableOpacity, Image, ImageBackground } from "react-native";
import { nbLog, showMsg } from "../util";
import { nbFileUpload } from "../network";
import { View, Icon, Text } from "native-base";
import { SvgXml } from "react-native-svg";
var NBCompUploadPickerImage = /** @class */ (function (_super) {
    __extends(NBCompUploadPickerImage, _super);
    function NBCompUploadPickerImage(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isUploading: false,
            percent: 0,
            imageSource: props.defaultImage
        };
        return _this;
    }
    NBCompUploadPickerImage.prototype.onPrecces = function (e) {
        if (this.props.showPreccess === undefined || this.props.showPreccess) {
            nbLog('上传图片选择器', '上传进度', e);
        }
    };
    NBCompUploadPickerImage.prototype.uploadFile = function (imageSource) {
        var _this = this;
        var _a = this.props, onUploadSuccess = _a.onUploadSuccess, onUploadFail = _a.onUploadFail;
        var r = imageSource === undefined ? this.state.imageSource : imageSource;
        if (!r) {
            if (onUploadFail) {
                onUploadFail(this.state.imageSource, '请选择图片！');
            }
            return Promise.resolve({
                success: false,
                reason: '请选择图片！'
            });
        }
        this.setState({
            isUploading: true,
            uploadError: undefined
        });
        return nbFileUpload({
            uri: r.uri,
            name: r.fileName,
            type: 'application/octet-stream'
        }, this.onPrecces.bind(this)).then(function (rr) {
            _this.setState({
                isUploading: false
            });
            nbLog('上传图片选择器', '上传成功！');
            if (onUploadSuccess) {
                onUploadSuccess(__assign(__assign({}, r), rr));
            }
            return Promise.resolve({
                success: true,
                result: rr,
                source: r
            });
        })["catch"](function (err) {
            nbLog('上传图片选择器', '上传失败：', err);
            _this.setState({
                isUploading: false,
                uploadError: err
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
        var _b = this.state, isUploading = _b.isUploading, uploadError = _b.uploadError;
        var width = this.props.width ? this.props.width : 400;
        var height = this.props.height ? this.props.height : 400;
        var uploadingPresView = null;
        var imageView = null;
        if (imageSource) {
            if (isUploading) {
                imageView = <ImageBackground source={imageSource} style={{
                    width: width, height: height - 2
                }} resizeMode={this.props.resizeMode || 'stretch'}>
                    <View style={{
                    width: width, height: height - 2, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center'
                }}>
                        <View style={{ flex: 1 }}/>
                        <ActivityIndicator size="small" color="white"/>
                        <View style={{ flex: 1 }}/>
                    </View>
                </ImageBackground>;
            }
            else {
                if (uploadError) {
                    imageView = <ImageBackground source={imageSource} style={{
                        width: width, height: height - 2
                    }} resizeMode={this.props.resizeMode || 'stretch'}>
                        <View style={{
                        width: width, height: height - 2, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center'
                    }}>
                            <View style={{ flex: 1 }}/>
                            <SvgXml xml={"<?xml version=\"1.0\" standalone=\"no\"?><!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\"><svg t=\"1596384118088\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"2025\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"24\" height=\"24\"><defs><style type=\"text/css\"></style></defs><path d=\"M480 64.512c-34.752 0-69.504 16.512-89.28 49.472L14.528 742.72C-25.472 809.28 25.728 896 103.488 896H856.32c78.016 0 129.28-86.72 89.472-153.28L569.28 113.984A102.848 102.848 0 0 0 480 64.512z m0 62.976c13.248 0 26.496 6.528 34.56 19.52l376.192 628.48c15.744 26.24-1.728 56.512-34.56 56.512H103.616c-32.576 0-50.048-30.272-34.304-56.512l376.256-628.48a40.256 40.256 0 0 1 34.496-19.52zM447.488 320v320h64V320z m0 384v64h64v-64z\" fill=\"#FFFFFF\" p-id=\"2026\"></path></svg>"}/>
                            <Text style={{ color: '#FFF' }}>上传失败</Text>
                            <View style={{ flex: 1 }}/>
                        </View>
                    </ImageBackground>;
                }
                else {
                    imageView = <Image source={imageSource} style={{
                        width: width, height: height
                    }} resizeMode={this.props.resizeMode || 'stretch'}/>;
                }
            }
        }
        if (isUploading) {
            uploadingPresView = <View style={{ height: 2, width: width / 2, backgroundColor: 'green' }}/>;
        }
        else {
            if (uploadError) {
                uploadingPresView = <View style={{ height: 2, width: width, backgroundColor: 'red' }}/>;
            }
        }
        return <TouchableOpacity activeOpacity={this.state.isUploading ? (this.props.cancelAble ? 0.8 : 1) : 0.8} onPress={function () {
            if (_this.state.isUploading) {
                showMsg('图片上传中!');
                return;
            }
            var options = Object.assign({
                title: '选择图片',
                cancelButtonTitle: '取消上传',
                takePhotoButtonTitle: '相机拍照',
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
                    });
                    if (autoUpload === undefined || autoUpload) {
                        _this.uploadFile(r);
                    }
                }
            });
        }}>
            {imageSource ? <View style={[{ width: width, height: height }, this.props.style]}>
                    {imageView}
                    {uploadingPresView}
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
