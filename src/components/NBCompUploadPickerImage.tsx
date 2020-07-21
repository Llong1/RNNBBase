import React from "react";
import ImagePicker, { ImagePickerOptions, ImagePickerResponse } from "react-native-image-picker";
import { ViewProps, TouchableOpacity, Image, ImageResizeMode } from "react-native";
import { nbLog, showMsg } from "../util";
import { nbFileUploda } from "../network";
import { View, Icon } from "native-base";
import { NBUploadResponse } from "../models";

export interface NBChooseImageSource {
    uri: string,
    type?: string,
    fileName?: string
}

export interface NBUplodaResult {
    success: boolean,
    source?: NBChooseImageSource,
    result?: NBUploadResponse,
    reason?: string
}

export interface NBCompUploadPickerImageProps extends ViewProps {
    width?: number,
    height?: number,
    cancelAble?: boolean,
    options?: ImagePickerOptions
    onCancel?: () => void,
    onPickError?: (error: string) => void,
    onCustomBtn?: (btn: string) => void,
    onChooseSuccess?: (file: NBChooseImageSource) => boolean,
    onUploadSuccess?: (file: NBChooseImageSource) => void,
    onUploadFail?: (file?: NBChooseImageSource, error?: any) => void,
    showPreccess?: boolean,
    defaultImage?: any,
    resizeMode?: ImageResizeMode,
    autoUpload?: boolean
}

export default class NBCompUploadPickerImage extends React.Component<NBCompUploadPickerImageProps, {
    isUploading?: boolean,
    percent?: number,
    imageSource?: NBChooseImageSource
}> {

    state = {
        isUploading: false,
        percent: 0,
        imageSource: undefined
    }

    private onPrecces(e: { loaded: number, total: number }) {
        if (this.props.showPreccess === undefined || this.props.showPreccess) {
            nbLog('上传图片选择器', '上传进度', e);
        }
    }

    uploadFile(): Promise<NBUplodaResult> {
        const { onUploadSuccess, onUploadFail } = this.props;
        if (!this.state.imageSource) {
            if (onUploadFail) {
                onUploadFail(this.state.imageSource, '请选择图片！');
            }
            return Promise.resolve({
                success: false,
                reason: '请选择图片！'
            });
        }
        const r: NBChooseImageSource = this.state.imageSource;
        this.setState({
            isUploading: true
        })
        return nbFileUploda({
            uri: r.uri,
            name: r.fileName,
            type: r.type
        }, this.onPrecces.bind(this)).then((rr: NBUploadResponse) => {
            this.setState({
                isUploading: false
            })
            nbLog('上传图片选择器', '上传成功！');
            if (onUploadSuccess) {
                onUploadSuccess(r);
            }

            return Promise.resolve({
                success: true,
                result: rr,
                source: r
            });
        }).catch(err => {
            nbLog('上传图片选择器', '上传失败：', err);
            this.setState({
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
    }

    render() {
        const { onCancel, onPickError, onCustomBtn, onChooseSuccess, autoUpload } = this.props;
        const imageSource: any | undefined = this.state.imageSource ? this.state.imageSource : this.props.defaultImage;
        const width = this.props.width ? this.props.width : 400;
        const height = this.props.height ? this.props.height : 400;
        return <TouchableOpacity activeOpacity={this.state.isUploading ? (this.props.cancelAble ? 0.8 : 1) : 0.8} onPress={() => {
            if (this.state.isUploading) {
                showMsg('图片上传中!');
                return;
            }
            const options: ImagePickerOptions = Object.assign({
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
                    path: 'images',
                },
                permissionDenied: {
                    title: '权限出错',
                    text: '无权限',
                    reTryTitle: '重试',
                    okTitle: '确认'
                }
            }, this.props.options)
            ImagePicker.showImagePicker(options, (r: ImagePickerResponse) => {
                if (r.didCancel) {
                    nbLog('上传图片选择器', '用户取消！');
                    if (onCancel) {
                        onCancel();
                    }
                } else if (r.error) {
                    nbLog('上传图片选择器', '选择出错：', r.error);
                    if (onPickError) {
                        onPickError(r.error);
                    }
                } else if (r.customButton) {
                    nbLog('上传图片选择器', '自定义按钮', r.customButton);
                    if (onCustomBtn) {
                        onCustomBtn(r.customButton);
                    }
                } else {
                    if (onChooseSuccess) {
                        if (!onChooseSuccess(r)) {
                            return;
                        }
                    }

                    this.setState({
                        imageSource: r
                    }, () => {
                        if (autoUpload === undefined || autoUpload) {
                            this.uploadFile();
                        }
                    })
                }
            })
        }}>
            {
                imageSource ? <View style={[{ width, height }, this.props.style]}>
                    <Image source={imageSource} style={{
                        width, height
                    }} resizeMode={this.props.resizeMode || 'stretch'} />
                </View> : (this.props.children ? this.props.children : <View style={[{ width, height, alignItems: 'center' }, this.props.style]}>
                    <View style={{ flex: 1 }} />
                    <Icon type="FontAwesome5" name="plus" color="rgba(245, 245, 245, 1)" fontSize={24} />
                    <View style={{ flex: 1 }} />
                </View>)
            }
        </TouchableOpacity>
    }
}