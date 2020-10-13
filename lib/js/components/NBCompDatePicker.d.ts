/// <reference types="react" />
import { ViewProps, StyleProp, TextStyle } from "react-native";
declare type DateFormat = "YYYY-MM-DD" | "YYYY-MM-DD HH:mm:ss" | "YYYY年MM月DD日" | "YYYY年MM月DD日 HH:mm:ss" | "DD/HH/YYYY";
export interface NBCompDatePickerPorps extends ViewProps {
    dateFormat?: DateFormat;
    minDate?: Date;
    currentDate?: Date;
    textStyle?: StyleProp<TextStyle>;
    onDateChanged?: (date: Date) => void;
}
export declare const NBCompDatePicker: (props: NBCompDatePickerPorps) => JSX.Element;
export {};
