import SQLite from 'react-native-sqlite-storage';
import { NBCacheFlags } from "./types";
var openDB = function () {
    return new Promise(function (res, rej) {
        var db = SQLite.openDatabase('NBSQLiteCache.db', "1.0", "_nb_cache_database", 2000000);
        if (NBCacheFlags.getFlags('__nb_sqlite_init')) {
            if (__DEV__) {
                console.log('SQLITE缓存库 已初始化库表！');
            }
            db.transaction(res, rej);
            return;
        }
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS nb_cache_table(_cahce_key TEXT PRIMARY KEY NOT NULL, _cache_value TEXT, _cache_time INTEGER)', [], function () {
                NBCacheFlags.setFlags('__nb_sqlite_init', 'true');
                if (__DEV__) {
                    console.log('SQLITE缓存库 初始化库表成功！');
                }
                db.transaction(res, rej);
            }, rej);
        }, rej);
    });
};
var NBSQLiteCache = /** @class */ (function () {
    function NBSQLiteCache() {
    }
    NBSQLiteCache.prototype.readCache = function (key) {
        return openDB().then(function (db) {
            return new Promise(function (res, rej) {
                if (__DEV__) {
                    console.log('SQLITE缓存库 查询缓存数据', key);
                }
                db.executeSql('SELECT * FROM nb_cache_table WHERE _cahce_key = ?', [key], function (tx, r) {
                    if (r && r.rows.length > 0) {
                        var rr = r.rows.item(0);
                        if (rr) {
                            var time = rr._cache_time;
                            var value = rr._cache_value;
                            var item = JSON.parse(value);
                            if (__DEV__) {
                                console.log('SQLITE缓存库 读取到缓存', item);
                            }
                            if (item.expire !== undefined) {
                                var tt = time + item.expire;
                                var ttt = new Date().getTime();
                                if (tt >= ttt) {
                                    res(item);
                                }
                                else {
                                    res(null);
                                }
                            }
                            else {
                                res(item);
                            }
                        }
                    }
                    else {
                        res(null);
                    }
                }, rej);
            });
        });
    };
    NBSQLiteCache.prototype.removeCache = function (key) {
        return openDB().then(function (db) {
            return new Promise(function (res, rej) {
                db.executeSql('DELETE FROM nb_cache_table WHERE _cahce_key = ?', [key], function () {
                    res(true);
                }, rej);
            });
        });
    };
    NBSQLiteCache.prototype.saveCache = function (key, item) {
        return openDB().then(function (db) {
            return new Promise(function (res, rej) {
                return db.executeSql('DELETE FROM nb_cache_table WHERE _cahce_key = ?', [key], function () {
                    res(true);
                }, rej);
            });
        }).then(function (is) {
            if (is) {
                return openDB().then(function (db) {
                    return new Promise(function (res, rej) {
                        db.executeSql('INSERT INTO nb_cache_table(_cahce_key,_cache_value,_cache_time) VALUES(?,?,?)', [key, JSON.stringify(item), new Date().getTime()], function () {
                            res(true);
                        }, rej);
                    });
                });
            }
            return false;
        });
    };
    NBSQLiteCache.prototype.clearCache = function () {
        return openDB().then(function (db) {
            return new Promise(function (res, rej) {
                db.executeSql('DELETE FROM nb_cache_table WHERE 1=1', [], function () {
                    res(true);
                }, rej);
            });
        });
    };
    NBSQLiteCache.prototype.cacheType = function () {
        return 'text';
    };
    return NBSQLiteCache;
}());
export var nbSQLiteCache = new NBSQLiteCache();
