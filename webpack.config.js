const { resolve } = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MinaWepackPlugin = require('./plugin/MinaWepackPlugin')
const MinaRuntimePlugin = require('./plugin/MinaRuntimePlugin')
const LodashWebpackPlugin = require('lodash-webpack-plugin')
const debuggable = process.env.BUILD_TYPE != 'release'

module.exports = (env, argv) => {
  const config = {
    // mode 有三个可能的值，分别是 production, development, none，
    // 小程序不能用 development，所以只有 production 和 none 这两个值。
    mode: debuggable ? 'none' : 'production',
    devtool: debuggable ? 'inline-source-map' : 'source-map',
    context: resolve('src'),
    entry: './app.js',
    output: {
      path: resolve('dist'),
      filename: '[name].js',
      globalObject: 'wx',
    },
    resolve: {
      extensions: ['.js'],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: 'babel-loader',
        },
        {
          test: /\.(scss)$/,
          include: /src/,
          use: [
            {
              loader: 'file-loader',
              options: {
                useRelativePath: true,
                name: '[path][name].wxss',
                context: resolve('src'),
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  includePaths: [resolve('src', 'assets', 'styles'), resolve('src')],
                }
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false,
      }),
      new webpack.EnvironmentPlugin({
        NODE_ENV: JSON.stringify(process.env.NODE_ENV) || 'development',
        BUILD_TYPE: JSON.stringify(process.env.BUILD_TYPE) || 'debug',
      }),
      new MinaWepackPlugin({
        scriptExtensions: ['.js'],
        assetExtensions: ['.scss'],
      }),
      new MinaRuntimePlugin(),
      new LodashWebpackPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: '**/*',
            to: './',
            globOptions: {
              gitignore: true,
              ignore: ['**/*.js', '**/*.scss'],
            },
          },
        ],
      }),
    ],
    optimization: {
      splitChunks: {
        chunks: 'all',
        name: 'common',
        minChunks: 2,
        minSize: 0,
      },
      runtimeChunk: {
        name: 'runtime',
      },
    },
  }
  return config
}
