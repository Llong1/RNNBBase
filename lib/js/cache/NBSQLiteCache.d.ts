import { NBCacheItem, NBCacheType } from "./types";
declare class NBSQLiteCache {
    readCache(key: string): Promise<NBCacheItem | null>;
    removeCache(key: string): Promise<boolean>;
    saveCache(key: string, item: NBCacheItem): Promise<boolean>;
    clearCache(): Promise<boolean>;
    cacheType(): NBCacheType;
}
export declare const nbSQLiteCache: NBSQLiteCache;
export {};
