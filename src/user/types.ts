import { DataModel } from "../models";
import { ReactText } from "react";

export type NBUserID = ReactText;

export interface NBUserModel extends DataModel {
    id: NBUserID,
    userName?: string,
    userPhone?: string,
    userLogo?: string,
    password?: string,
    createTime?: string
}

export interface NBUserAll {
    user: NBUserModel,
    token?: string
}