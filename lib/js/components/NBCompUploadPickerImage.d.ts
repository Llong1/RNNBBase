import React from "react";
import { ImagePickerOptions, ImagePickerResponse } from "react-native-image-picker";
import { ViewProps, ImageResizeMode } from "react-native";
import { NBUploadResponse } from "../models";
export interface NBChooseImageSource extends ImagePickerResponse {
}
export interface NBUplodaResult {
    success: boolean;
    source?: NBChooseImageSource;
    result?: NBUploadResponse;
    reason?: string;
}
export interface NBCompUploadPickerImageProps extends ViewProps {
    width?: number;
    height?: number;
    cancelAble?: boolean;
    options?: ImagePickerOptions;
    onCancel?: () => void;
    onPickError?: (error: string) => void;
    onCustomBtn?: (btn: string) => void;
    onChooseSuccess?: (file: NBChooseImageSource) => boolean;
    onUploadSuccess?: (file: NBChooseImageSource) => void;
    onUploadFail?: (file?: NBChooseImageSource, error?: any) => void;
    showPreccess?: boolean;
    defaultImage?: any;
    resizeMode?: ImageResizeMode;
    autoUpload?: boolean;
}
export default class NBCompUploadPickerImage extends React.Component<NBCompUploadPickerImageProps, {
    isUploading?: boolean;
    percent?: number;
    imageSource?: NBChooseImageSource;
}> {
    state: {
        isUploading: boolean;
        percent: number;
        imageSource: any;
    };
    private onPrecces;
    uploadFile(): Promise<NBUplodaResult>;
    render(): JSX.Element;
}
