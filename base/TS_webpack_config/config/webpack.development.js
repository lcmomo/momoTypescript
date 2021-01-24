console.log("开发");
const { join } = require("path");
const WebpackBuildNotifierPlugin = require("webpack-build-notifier");
const webpackConfig = {
    devServer: {
        historyApiFallback: true,
        contentBase: join(__dirname, "../dist"),
        proxy: {
            "/api": "http://localhost:3000"
        },
        hot: true
    },
    plugins: [
        new WebpackBuildNotifierPlugin({
            title: 'My Webpack Build',
            // logo: "",
            suppressSuccess: true
        })
    ]
}

module.exports = webpackConfig;