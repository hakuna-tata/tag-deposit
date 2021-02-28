// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
    mode: "production",
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "index.js",
        library: "tag-deposit",
        libraryTarget: "umd",
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
};
