import { HeaderOptions } from "./types";
export declare class HeaderManager {
    static nbHeaders?: HeaderOptions;
    static headerUpdate: boolean;
    static updateHeaders(headers: HeaderOptions): Promise<any>;
    static getHeaders(): Promise<HeaderOptions>;
}
