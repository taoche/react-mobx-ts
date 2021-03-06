const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const { CheckerPlugin } = require('awesome-typescript-loader');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  context: path.resolve(__dirname, '../'),

  entry: {
    app: ['@babel/polyfill', './src/index.tsx'],
  },

  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath:
      process.env.NODE_ENV === 'production'
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath,
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [
      // Enable "paths" from "tsconfig.json"
      new TsConfigPathsPlugin(),
    ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        use: [
          {
            loader: 'tslint-loader',
            options: {
              typeCheck: true,
            },
          },
        ],
      },
      // Define rule for compiling typescript files
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            },
          },
          'awesome-typescript-loader',
        ],
        include: [resolve('src')],
        exclude: [/node_modules/],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
        },
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({}),
    // Enable asynchronous error reporting
    new CheckerPlugin(),
  ],
};
