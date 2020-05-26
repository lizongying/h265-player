const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');

const name = 'H265 Player';

module.exports = {
    mode: 'production',
    output: {
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
        path: path.join(__dirname, './dist'),
    },
    entry: {
        // background: './src/js/background',
        // options: './src/js/options',
        content: './src/js/content',
        // popup: './src/js/popup',
        common: './src/js/lib/common',
        decoder: './src/js/lib/decoder',
        downloader: './src/js/lib/downloader',
        worker_proxy: './src/js/lib/worker_proxy',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        // new HtmlWebpackPlugin({
        //     inject: true,
        //     filename: 'popup.html',
        //     template: './src/popup.html',
        //     title: name,
        //     chunks: ['popup'],
        //     minify: {
        //         collapseBooleanAttributes: true,
        //         collapseWhitespace: true,
        //         html5: true,
        //         minifyCSS: true,
        //         minifyJS: true,
        //         minifyURLs: true,
        //         removeAttributeQuotes: true,
        //         removeComments: true,
        //         removeEmptyAttributes: true,
        //         removeOptionalTags: true,
        //         removeRedundantAttributes: true,
        //         removeScriptTypeAttributes: true,
        //         removeStyleLinkTypeAttributes: true,
        //         sortAttributes: true,
        //         sortClassName: true,
        //         useShortDoctype: true,
        //     },
        // }),
        // new HtmlWebpackPlugin({
        //     inject: true,
        //     filename: 'options.html',
        //     template: './src/options.html',
        //     title: name,
        //     chunks: ['options'],
        //     minify: {
        //         collapseBooleanAttributes: true,
        //         collapseWhitespace: true,
        //         html5: true,
        //         minifyCSS: true,
        //         minifyJS: true,
        //         minifyURLs: true,
        //         removeAttributeQuotes: true,
        //         removeComments: true,
        //         removeEmptyAttributes: true,
        //         removeOptionalTags: true,
        //         removeRedundantAttributes: true,
        //         removeScriptTypeAttributes: true,
        //         removeStyleLinkTypeAttributes: true,
        //         sortAttributes: true,
        //         sortClassName: true,
        //         useShortDoctype: true,
        //     },
        // }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './src/manifest.json',
                    to: path.join(__dirname, './dist/manifest.json'),
                },
                {
                    from: './src/js/lib/worker_proxy.html',
                    to: path.join(__dirname, './dist/worker_proxy.html'),
                },
                {
                    from: './src/js/lib/libffmpeg.js',
                    to: path.join(__dirname, './dist/libffmpeg.js'),
                },
                {
                    from: './src/js/lib/libffmpeg.wasm',
                    to: path.join(__dirname, './dist/libffmpeg.wasm'),
                },
            ],
        }),
        new ZipPlugin({
            path: '../zip',
            filename: name,
            pathPrefix: 'dist',
        }),
    ],
};
