const path = require("path")

module.exports = {
    entry: "./index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },
    externals: {
        "react-native": true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            // ...
        ],
    },
}