import React from "react";
import ImagePicker, { ImagePickerOptions, ImagePickerResponse } from "react-native-image-picker";
import { ActivityIndicator, ViewProps, TouchableOpacity, Image, ImageResizeMode, ImageBackground } from "react-native";
import { nbLog, showMsg } from "../util";
import { nbFileUpload } from "../network";
import { View, Icon, Text } from "native-base";
import { NBUploadResponse } from "../models";
import { SvgXml } from "react-native-svg";

export interface NBChooseImageSource extends ImagePickerResponse, NBUploadResponse {
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
    imageSource?: NBChooseImageSource,
    uploadError?: any
}> {

    constructor(props: NBCompUploadPickerImageProps) {
        super(props);
        this.state = {
            isUploading: false,
            percent: 0,
            imageSource: props.defaultImage
        }
    }

    private onPrecces(e: { loaded: number, total: number }) {
        if (this.props.showPreccess === undefined || this.props.showPreccess) {
            nbLog('上传图片选择器', '上传进度', e);
        }
    }

    uploadFile(imageSource?: NBChooseImageSource): Promise<NBUplodaResult> {
        const { onUploadSuccess, onUploadFail } = this.props;
        const r: NBChooseImageSource = imageSource === undefined ? this.state.imageSource : imageSource;
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
        })
        return nbFileUpload({
            uri: r.uri,
            name: r.fileName,
            type: 'application/octet-stream'
        }, this.onPrecces.bind(this)).then((rr: NBUploadResponse) => {
            this.setState({
                isUploading: false
            })
            nbLog('上传图片选择器', '上传成功！');
            if (onUploadSuccess) {
                onUploadSuccess({
                    ...r,
                    ...rr
                });
            }

            return Promise.resolve({
                success: true,
                result: rr,
                source: r
            });
        }).catch(err => {
            nbLog('上传图片选择器', '上传失败：', err);
            this.setState({
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
    }

    render() {
        const { onCancel, onPickError, onCustomBtn, onChooseSuccess, autoUpload } = this.props;
        const imageSource: any | undefined = this.state.imageSource ? this.state.imageSource : this.props.defaultImage;
        const { isUploading, uploadError } = this.state;
        const width = this.props.width ? this.props.width : 400;
        const height = this.props.height ? this.props.height : 400;
        let uploadingPresView = null;
        let imageView = null;
        if (imageSource) {
            if (isUploading) {
                imageView = <ImageBackground source={imageSource} style={{
                    width, height: height - 2
                }} resizeMode={this.props.resizeMode || 'stretch'}>
                    <View style={{
                        width, height: height - 2, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center'
                    }}>
                        <View style={{ flex: 1 }} />
                        <ActivityIndicator size="small" color="white" />
                        <View style={{ flex: 1 }} />
                    </View>
                </ImageBackground>
            } else {
                if (uploadError) {
                    imageView = <ImageBackground source={imageSource} style={{
                        width, height: height - 2
                    }} resizeMode={this.props.resizeMode || 'stretch'}>
                        <View style={{
                            width, height: height - 2, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center'
                        }}>
                            <View style={{ flex: 1 }} />
                            <SvgXml xml={`<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1596384118088" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2025" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24"><defs><style type="text/css"></style></defs><path d="M480 64.512c-34.752 0-69.504 16.512-89.28 49.472L14.528 742.72C-25.472 809.28 25.728 896 103.488 896H856.32c78.016 0 129.28-86.72 89.472-153.28L569.28 113.984A102.848 102.848 0 0 0 480 64.512z m0 62.976c13.248 0 26.496 6.528 34.56 19.52l376.192 628.48c15.744 26.24-1.728 56.512-34.56 56.512H103.616c-32.576 0-50.048-30.272-34.304-56.512l376.256-628.48a40.256 40.256 0 0 1 34.496-19.52zM447.488 320v320h64V320z m0 384v64h64v-64z" fill="#FFFFFF" p-id="2026"></path></svg>`} />
                            <Text style={{ color: '#FFF' }}>上传失败</Text>
                            <View style={{ flex: 1 }} />
                        </View>
                    </ImageBackground>
                } else {
                    imageView = <Image source={imageSource} style={{
                        width, height
                    }} resizeMode={this.props.resizeMode || 'stretch'} />
                }
            }
        }
        if (isUploading) {
            uploadingPresView = <View style={{ height: 2, width: width / 2, backgroundColor: 'green' }} />
        } else {
            if (uploadError) {
                uploadingPresView = <View style={{ height: 2, width: width, backgroundColor: 'red' }} />
            }
        }
        return <TouchableOpacity activeOpacity={this.state.isUploading ? (this.props.cancelAble ? 0.8 : 1) : 0.8} onPress={() => {
            if (this.state.isUploading) {
                showMsg('图片上传中!');
                return;
            }
            const options: ImagePickerOptions = Object.assign({
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
                    })
                    if (autoUpload === undefined || autoUpload) {
                        this.uploadFile(r);
                    }
                }
            })
        }}>
            {
                imageSource ? <View style={[{ width, height }, this.props.style]}>
                    {imageView}
                    {uploadingPresView}
                </View> : (this.props.children ? this.props.children : <View style={[{ width, height, alignItems: 'center' }, this.props.style]}>
                    <View style={{ flex: 1 }} />
                    <Icon type="FontAwesome5" name="plus" color="rgba(245, 245, 245, 1)" fontSize={24} />
                    <View style={{ flex: 1 }} />
                </View>)
            }
        </TouchableOpacity>
    }
}