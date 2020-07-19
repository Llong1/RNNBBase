import AsyncStorage from '@react-native-community/async-storage';
import { HeaderOptions } from "./types";

export class HeaderManager {
    public static nbHeaders?: HeaderOptions;
    public static headerUpdate: boolean = false;
    public static updateHeaders(headers: HeaderOptions): Promise<any> {
        return headers ? AsyncStorage.setItem('__app_headers', JSON.stringify(headers)).then(() => {
            HeaderManager.nbHeaders = Object.assign(HeaderManager.nbHeaders || {}, headers);
            HeaderManager.headerUpdate = true;
        }) : Promise.resolve(null);
    }

    public static getHeaders(): Promise<HeaderOptions> {
        return Promise.resolve(HeaderManager.nbHeaders && HeaderManager.headerUpdate ? HeaderManager.nbHeaders : AsyncStorage.getItem('__app_headers').then(h => {
            if (h) {
                const ho: HeaderOptions = JSON.parse(h);
                HeaderManager.nbHeaders = Object.assign(HeaderManager.nbHeaders || {}, ho);
                HeaderManager.headerUpdate = true;
                return ho;
            } else {
                return {};
            }
        }))
    }
}