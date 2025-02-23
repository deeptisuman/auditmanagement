const webpack = require("webpack");

module.exports = function override(config) {
    config.resolve.fallback = {
        crypto: require.resolve("crypto-browserify"),
        path: require.resolve("path-browserify"),
        stream: require.resolve("stream-browserify"),
        util: require.resolve("util/"),
        url: require.resolve("url/"),
        buffer: require.resolve("buffer/"),
        zlib: require.resolve("browserify-zlib"),
        querystring: require.resolve("querystring-es3"),
        os: require.resolve("os-browserify/browser"),
        fs: false, // Disable unsupported modules
        net: false,
        http: require.resolve("stream-http"),
    };

    config.plugins.push(
        new webpack.ProvidePlugin({
            Buffer: ["buffer", "Buffer"],
            process: "process/browser",
        })
    );

    return config;
};
