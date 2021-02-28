// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
    mode: "development",
    devtool: "cheap-module-eval-source-map",
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, "../example"),
        filename: "index.js",
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
    devServer: {
        contentBase: [path.join(__dirname, "../example")],
        host: "localhost",
        port: "8000",
        compress: true,
        hot: true,
    },
};
