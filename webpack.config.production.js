const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    bail: true,
    entry: ['./app/Resources/js/index.js'],
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'web/dist'),
        sourceMapFilename: 'bundle.map'
    },

    context: resolve(__dirname),

    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    'babel-loader',
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader?modules',
                    'postcss-loader',
                ],
            },
        ],
    },

    plugins: [],
};