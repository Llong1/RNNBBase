import { Status, StatusCode, ResponseModel } from "./types";
import Constants from "../Constants";

export const isSuccessResp = (s?: Status) => {
    if (s !== undefined) {
        return s.code === StatusCode.SUCCESS;
    }
    return false;
}

export const filterSuccess = (r: ResponseModel): Promise<any> => {
    return r.status.code === StatusCode.SUCCESS ? Promise.resolve(r.result!) : Promise.reject(new Error(Constants.isDebug ? `${r.status.message}，错误码：${r.status.code}` : r.status.message));
}