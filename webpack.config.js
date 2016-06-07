'use strict'
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './client/js/main.js',
    output: {path: __dirname +'/client/build', filename: 'bundle.js'},
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    },

    // minifying jsx
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
          compress: { warnings: false }
        })
    ],
    watch: true,
}
