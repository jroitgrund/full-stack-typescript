const glob = require('glob');
const path = require('path');

module.exports = {
    bail: true,
    devtool: 'inline-sourcemap',
    entry: {
        index: ['es6-shim'].concat(glob.sync(path.join(__dirname, '../build/web/test/**/*.js'))),
    },
    output: {
        filename: 'saucelabs/tests.js',
        path: __dirname,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['source-map-loader'],
                enforce: 'pre',
            },
        ],
    },
    resolve: {
        extensions: ['.js'],
    },
};
