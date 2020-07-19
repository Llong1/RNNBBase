module.exports = {
    dependency: {
      platforms: {
        android: { sourceDir: "lib/android" }
      }
    },
    dependencies: {
        "react-native-nbbase": {
            root: __dirname,
            platforms: {
                android: {
                    sourceDir: __dirname + "/lib/android",
                    packageImportPath: "import cn.yupute.react.NBBasePackage;",
                    packageInstance: "new NBBasePackage()"
                }
            }
        }
    }
};
