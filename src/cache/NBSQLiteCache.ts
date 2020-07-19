import SQLite from 'react-native-sqlite-storage';
import { NBCacheFlags, NBCacheItem, NBCacheType } from "./types";

const openDB = (): Promise<any> => {
    return new Promise((res, rej) => {
        let db = SQLite.openDatabase('NBSQLiteCache.db', "1.0", "_nb_cache_database", 2000000);
        if (NBCacheFlags.getFlags('__nb_sqlite_init')) {
            if (__DEV__) {
                console.log('SQLITE缓存库 已初始化库表！')
            }
            db.transaction(res, rej)
            return;
        }

        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS nb_cache_table(_cahce_key TEXT PRIMARY KEY NOT NULL, _cache_value TEXT, _cache_time INTEGER)', [], () => {
                NBCacheFlags.setFlags('__nb_sqlite_init', 'true')
                if (__DEV__) {
                    console.log('SQLITE缓存库 初始化库表成功！');
                }
                db.transaction(res, rej)
            }, rej);
        }, rej);
    })
}

class NBSQLiteCache {
    public readCache(key: string): Promise<NBCacheItem | null> {
        return openDB().then(db => {
            return new Promise((res, rej) => {
                if (__DEV__) {
                    console.log('SQLITE缓存库 查询缓存数据', key);
                }
                db.executeSql('SELECT * FROM nb_cache_table WHERE _cahce_key = ?', [key], (tx, r) => {
                    if (r && r.rows.length > 0) {
                        let rr = r.rows.item(0);
                        if (rr) {
                            let time: number = rr._cache_time;
                            let value: string = rr._cache_value;
                            let item: NBCacheItem = JSON.parse(value);
                            if (__DEV__) {
                                console.log('SQLITE缓存库 读取到缓存', item);
                            }
                            if (item.expire !== undefined) {
                                let tt = time + item.expire;
                                let ttt = new Date().getTime();
                                if (tt >= ttt) {
                                    res(item)
                                } else {
                                    res(null)
                                }
                            } else {
                                res(item)
                            }
                        }
                    } else {
                        res(null)
                    }
                }, rej)
            })
        });
    }

    public removeCache(key: string): Promise<boolean> {
        return openDB().then(db => {
            return new Promise((res, rej) => {
                db.executeSql('DELETE FROM nb_cache_table WHERE _cahce_key = ?', [key], () => {
                    res(true)
                }, rej)
            })
        })
    }

    public saveCache(key: string, item: NBCacheItem): Promise<boolean> {
        return openDB().then(db => {
            return new Promise((res, rej) => {
                return db.executeSql('DELETE FROM nb_cache_table WHERE _cahce_key = ?', [key], () => {
                    res(true)
                }, rej)
            })

        }).then(is => {
            if (is) {
                return openDB().then(db => {
                    return new Promise((res, rej) => {
                        db.executeSql('INSERT INTO nb_cache_table(_cahce_key,_cache_value,_cache_time) VALUES(?,?,?)', [key, JSON.stringify(item), new Date().getTime()], () => {
                            res(true)
                        }, rej)
                    })
                })
            }
            return false;
        })
    }

    public clearCache(): Promise<boolean> {
        return openDB().then(db => {
            return new Promise((res, rej) => {
                db.executeSql('DELETE FROM nb_cache_table WHERE 1=1', [], () => {
                    res(true)
                }, rej);
            })
        })
    }
    public cacheType(): NBCacheType {
        return 'text';
    }
}

export const nbSQLiteCache = new NBSQLiteCache();