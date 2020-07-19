export type NBCacheType = 'text' | 'file';

export interface NBCacheItem {
    key?: string,
    item?: any,
    indate?: Date
    expire?: number
}

export class NBCacheFlags {
    private static flags = {};

    public static setFlags(key: string, flag: string | number) {
        NBCacheFlags.flags[key] = flag;
    }

    public static getFlags(key: string) {
        return NBCacheFlags.flags[key]
    }
}