module.exports = {
    dependency: {
        platforms: {
            ios: { project: "lib/ios/react-native-nbbase.podspec" },
            android: { sourceDir: "lib/android" }
        }
    },
    dependencies: {
        "react-native-nbbase": {
            root: __dirname,
            platforms: {
                ios: { podspecPath: __dirname + "/lib/ios/react-native-nbbase.podspec" },
                android: {
                    sourceDir: __dirname + "/lib/android",
                    packageImportPath: "import cn.yupute.react.NBBasePackage;",
                    packageInstance: "new NBBasePackage()"
                }
            }
        }
    }
};
