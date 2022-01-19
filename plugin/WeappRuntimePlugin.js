/*
 * Project: wxmini
 * File Created: Wednesday, 17th November 2021 3:40:31 pm
 * Author: hotsuitor (hotsuitor@qq.com)
 * -----
 * Last Modified: Thursday, 18th November 2021 12:07:16 pm
 * Modified By: hotsuitor (hotsuitor@qq.com)
 */

const path = require('path')
const { ConcatSource } = require('webpack-sources')

class WeappRuntimePlugin {
  static defaultOptions = {
    runtimeChunk: {
      name: 'runtime.js',
    },
  }
  // 需要传入自定义插件构造函数的任意选项
  //（这是自定义插件的公开API）
  constructor(options = {}) {
    this.options = { ...WeappRuntimePlugin.defaultOptions, ...options }
  }
  normalizeRuntimePath(dir) {
    // 格式化 runtime 引入路径
    // '..\\..\\..\\runtime.js' => '../../runtime.js'
    return dir.split(path.sep).slice(1).join('/')
  }
  apply(compiler) {
    const pluginName = WeappRuntimePlugin.name
    // webpack 模块实例，可以通过 compiler 对象访问，
    // 这样确保使用的是模块的正确版本
    // （不要直接 require/import webpack）
    const { webpack } = compiler

    // Compilation 对象提供了对一些有用常量的访问。
    const { Compilation } = webpack

    // RawSource 是其中一种 “源码”("sources") 类型，
    // 用来在 compilation 中表示资源的源码
    const { RawSource } = webpack.sources

    compiler.hooks.compilation.tap(pluginName, compilation => {
      compilation.hooks.processAssets.tapAsync(
        {
          name: pluginName,
          // https://webpack.docschina.org/api/compilation-hooks/#list-of-asset-processing-stages
          stage: Compilation.PROCESS_ASSETS_STAGE_REPORT, // assets 处理最后一步
        },
        (assets, callback) => {
          Object.entries(assets).forEach(([pathname, source]) => {
            // 取得依赖 runtime.js 的 chunk 的相对路径
            // replace './runtime.js' path
            if (/\.js$/.test(pathname)) {
              let runtimePath = this.normalizeRuntimePath(path.relative(pathname, this.options.runtimeChunk.name))
              source._valueAsString = source._valueAsString.replace('./runtime.js', runtimePath)
              const replaceSource = new RawSource(source._valueAsString)
              // compilation.assets[pathname] = new ConcatSource('/**添加的内容到输出文件**/', '\n', source)
              compilation.assets[pathname] = replaceSource
            } else if(source._children?.length && source._children[1]) { // [RawSrouce, SrouceMapSource]
              // 开启优化模式，资源在这里处理
              source._children[1]._valueAsString = source._children[1]._valueAsString.replace('./runtime.js', runtimePath)
            }
          })
          callback()
        },
      )
    })
  }
}

module.exports = WeappRuntimePlugin
