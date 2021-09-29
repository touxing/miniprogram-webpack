const { resolve } = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MinaWepackPlugin = require('./plugin/MinaWepackPlugin')
const MinaRuntimePlugin = require('./plugin/MinaRuntimePlugin')

module.exports = {
  mode: 'none',
  context: resolve('src'),
  entry: './app.js',
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    globalObject: 'wx'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new MinaWepackPlugin(),
    new MinaRuntimePlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '**/*',
          to: './',
          globOptions: {
            gitignore: true,
            ignore: ['**/*.js']
          }
        },
      ],
    }),
  ],
  optimization: {
    runtimeChunk: {
      name: 'runtime'
    }
  }
}
