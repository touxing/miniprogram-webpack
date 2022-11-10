const fs = require('fs')
const webpack = require('webpack')

const pkg = fs.readFileSync('./package.json', { encoding: 'utf-8' })
let version = '1.0.0'
try {
  version = JSON.parse(pkg).version
} catch (error) {
  console.error(error)
}

class BuildTagWebpackPlugin {
  constructor(options) {
    // 调用webpack内置的 BannerPlugin
    // 注入版权信息插件
    // reference: https://webpack.docschina.org/plugins/banner-plugin#root
    return new webpack.BannerPlugin({
      entryOnly: true,
      raw: true,
      footer: true,
      banner: data => {
        let template = `${logTpl('Environment', process.env.NODE_ENV)}\n${logTpl('version', version)}\n${logTpl(
          'Build Date',
          new Date().toISOString(),
        )}`.trim()
        return template
      },
      ...options,
    })
  }
  apply(compiler) {}
}

/**
 * 控制台打印有颜色的标签
 * @param {String} key
 * @param {String} value
 * @param {String} bgColor
 */
function logTpl(key, value, bgColor = '#41b883') {
  //background: #606060, #42c02e, #1475b2
  return (
    `console.log(` +
    `'%c ${key} %c ${value} %c',` +
    `'background:#606060 ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',` +
    `'background:${bgColor} ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',` +
    `'background:transparent'` +
    `)`
  )
}

module.exports = BuildTagWebpackPlugin
