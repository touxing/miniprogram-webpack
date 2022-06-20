const { resolve } = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MinaWepackPlugin = require('./plugin/MinaWepackPlugin')
const MinaRuntimePlugin = require('./plugin/MinaRuntimePlugin')
const MinaPreviewPlugin = require('./plugin/MinaPreviewPlugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const LodashWebpackPlugin = require('lodash-webpack-plugin')
const debuggable = process.env.BUILD_TYPE != 'prod'

// 文件复制处理
const fileLoaderFn = name => ({
  loader: 'file-loader',
  options: {
    useRelativePath: true,
    name,
    context: global.context || resolve('src'),
  },
})
module.exports = (env, argv) => {
  const config = {
    // mode 有三个可能的值，分别是 production, development, none，
    // 小程序不能用 development，所以只有 production 和 none 这两个值。
    mode: debuggable ? 'none' : 'production',
    // devtool: debuggable ? 'inline-source-map' : 'source-map',
    devtool: 'none',
    context: resolve('src'),
    entry: './app.js',
    output: {
      path: resolve(`dist/${process.env.BUILD_TYPE}`),
      filename: '[name].js',
      globalObject: 'wx',
    },
    resolve: {
      extensions: ['.js'],
      alias: {
        '@': resolve('src'),
        '@vant': resolve('src/node_modules/@vant'),
        '@assets': resolve('src/assets'),
      },
    },
    // stats: 'minimal', //'errors-only',
    stats: {
      assets: false,
      builtAt: false,
      modules: false,
      entrypoints: false,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: ['cache-loader', 'babel-loader'],
        },
        {
          test: /\.s[ac]ss$/i,
          include: /src/,
          use: [
            // 以相对路径复制到 output 目录下
            fileLoaderFn('[path][name].wxss'),
            // 'css-loader', //  将 CSS 转化成 CommonJS 模块。  不需要，用了会把 wxss 文件变成 js 模块
            {
              loader: 'sass-loader',
              options: {
                // require('sass') 用 sass|dar-sass 会报错 SassError: Can't find stylesheet to import.
                // 退回使用 node-sass@4.14.1 要低版本
                // @import 'xxxx.wxss'; 错误
                // 参考：https://github.com/webpack-contrib/sass-loader/issues/804#issuecomment-582359435
                implementation: require('node-sass'),
                webpackImporter: false, // 禁用 ~，~告诉Webpack导入路径不是相对路径。
                sassOptions: {
                  includePaths: [resolve('src')],
                  fiber: require('fibers'), // 异步处理
                },
              },
            },
          ],
        },
        {
          test: /.wxs$/,
          use: [fileLoaderFn('[path][name].[ext]'), 'babel-loader'],
        },
        {
          test: /\.json$/,
          type: 'javascript/auto',
          use: [fileLoaderFn('[path][name].[ext]')],
        },
        {
          // 在源码中，没有 import 或 require图片资源 是不会对图片进行处理的
          test: /\.(gif|png|jpe?g|svg)$/i,
          include: /src/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
              },
            },
            {
              loader: 'image-webpack-loader',
              options: {
                enforce: 'pre', // 在其他loader调用前，先行调用，避免重复代码
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new CleanWebpackPlugin({
        // Automatically remove all unused webpack assets on rebuild
        // rebuild 时自动删除未使用的资源，false:不需要
        cleanStaleWebpackAssets: false,
      }),
      // EnvironmentPlugin 是一个通过 DefinePlugin 来设置 process.env 环境变量的快捷方式。
      new webpack.EnvironmentPlugin({
        NODE_ENV: JSON.stringify(process.env.NODE_ENV) || 'development',
        BUILD_TYPE: JSON.stringify(process.env.BUILD_TYPE) || 'dev',
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
      new MinaPreviewPlugin({
        ignore: ['assets', 'cloudfunctions', 'common', 'node_modules', 'miniprogram_npm'],
        output: resolve(`dist/${process.env.BUILD_TYPE}`)
      })
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
        // name: (entrypoint) => `runtimechunk~${entrypoint.name}`,
      },
    },
  }
  return config
}
