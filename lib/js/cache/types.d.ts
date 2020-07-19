export declare type NBCacheType = 'text' | 'file';
export interface NBCacheItem {
    key?: string;
    item?: any;
    indate?: Date;
    expire?: number;
}
export declare class NBCacheFlags {
    private static flags;
    static setFlags(key: string, flag: string | number): void;
    static getFlags(key: string): any;
}
