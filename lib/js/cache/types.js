var NBCacheFlags = /** @class */ (function () {
    function NBCacheFlags() {
    }
    NBCacheFlags.setFlags = function (key, flag) {
        NBCacheFlags.flags[key] = flag;
    };
    NBCacheFlags.getFlags = function (key) {
        return NBCacheFlags.flags[key];
    };
    NBCacheFlags.flags = {};
    return NBCacheFlags;
}());
export { NBCacheFlags };
