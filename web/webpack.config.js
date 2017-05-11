const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const path = require('path');
const webpack = require('webpack');

const extractSass = new ExtractTextPlugin({
    filename: '[name].[contenthash].css',
    disable: process.env.NODE_ENV !== 'production',
});

const minify = {
    removeComments: true,
    removeCommentsFromCDATA: true,
    removeCDATASectionsFromCDATA: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    removeAttributeQuotes: true,
    useShortDoctype: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    removeScriptTypeAttributes: true,
    removeStyleTypeAttributes: true,
};

const outputExtras = process.env.NODE_ENV !== 'production'
    ? {
        publicPath: 'http://localhost:8081/',
    }
    : {};

const configExtras = process.env.NODE_ENV !== 'production'
    ? {
        devtool: 'inline-sourcemap',
    }
    : {};

const extraPlugins = process.env.NODE_ENV !== 'production'
    ? [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ]
    : [];

const extraEntries = process.env.NODE_ENV !== 'production'
    ? [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8081',
        'webpack/hot/only-dev-server',
    ]
    : [];

const extraLoaders = process.env.NODE_ENV !== 'production'
    ? [
        'react-hot-loader/webpack',
    ]
    : [];

module.exports = Object.assign(configExtras, {
    bail: true,
    entry: {
        index: ['es6-shim'].concat(extraEntries.concat(...['./build/web/src/index.js'])),
    },
    output: Object.assign({
        filename: '[name].[hash].js',
        path: path.join(__dirname, 'dist'),
    }, outputExtras),
    resolve: {
        extensions: ['.scss', '.js'],
    },
    devServer: {
        hot: true,
        headers: { 'Access-Control-Allow-Origin': '*' },
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: ['css-loader?sourceMap=true&camelCase=true&minimize=true&modules=true', 'postcss-loader', 'sass-loader?sourceMap=true'],
                    fallback: 'style-loader',
                }),
            },
            {
                test: /\.js$/,
                use: extraLoaders.concat(...[]),
            },
            {
                test: /\.(jpg|png)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[hash].[ext]',
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            minify,
            template: 'web/src/index.html',
            chunks: ['index'],
        }),
        new HtmlWebpackHarddiskPlugin(),
        extractSass,
    ].concat(extraPlugins),
});
