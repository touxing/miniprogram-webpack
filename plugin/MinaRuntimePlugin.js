// plugin/MinaRuntimePlugin.js
/*
 * copied from https://github.com/tinajs/mina-webpack/blob/master/packages/mina-runtime-webpack-plugin/index.js
 */
const path = require('path')
const ensurePosix = require('ensure-posix-path')
const { ConcatSource } = require('webpack-sources')
const requiredPath = require('required-path')

function isRuntimeExtracted(compilation) {
  // let flag = false
  // compilation.chunks.forEach(chunk => {
  //   compilation.chunkGraph.getChunkModules(chunk).forEach(module => {
  //     // module is available here
  //     if (chunk.isOnlyInitial() && chunk.hasRuntime() && !chunk.hasEntryModule()) {
  //       flag = true
  //     }
  //   })
  // })
  // return flag
  return Array.from(compilation.chunks).some(chunk => chunk.isOnlyInitial() && chunk.hasRuntime() && !chunk.hasEntryModule())
}

function script({ dependencies }) {
  return ';' + dependencies.map(file => `require('${requiredPath(file)}');`).join('')
}

class MinaRuntimeWebpackPlugin {
  static defaultOptions = {
    runtime: '',
  }
  // 需要传入自定义插件构造函数的任意选项
  //（这是自定义插件的公开API）
  constructor(options = {}) {
    this.options = { ...MinaRuntimeWebpackPlugin.defaultOptions, ...options }
  }

  // 在应用默认选项前，先应用用户指定选项
  // 合并后的选项暴露给插件方法
  // 记得在这里校验所有选项
  apply(compiler) {
    const pluginName = MinaRuntimeWebpackPlugin.name

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
      // [compilation.mainTemplate, compilation.chunkTemplate]
      for (let template of [compilation.chunkTemplate]) {
        // 监听 template 的 renderWithEntry 事件
        // template.hooks.renderWithEntry.tap
        // webpack.JavascriptModulesPlugin
        webpack.javascript.JavascriptModulesPlugin.getCompilationHooks(compilation).render.tap(
          pluginName,
          (source, entry) => {
            if (!isRuntimeExtracted(compilation)) {
              throw new Error(
                [
                  'Please reuse the runtime chunk to avoid duplicate loading of javascript files.',
                  "Simple solution: set `optimization.runtimeChunk` to `{ name: 'runtime.js' }` .",
                  'Detail of `optimization.runtimeChunk`: https://webpack.js.org/configuration/optimization/#optimization-runtimechunk .',
                ].join('\n'),
              )
            }

            // 如果不是入口 chunk，即不是通过 compilation.addEntry 添加的模块所生成的 chunk，就不要管它
            if (!entry.chunk.hasEntryModule()) {
              return source
            }

            let dependencies = []
            // 找到该入口 chunk 依赖的其它所有 chunk
            entry.chunk.groupsIterable.forEach(group => {
              group.chunks.forEach(chunk => {
                /**
                 * assume output.filename is chunk.name here
                 */
                let filename = ensurePosix(path.relative(path.dirname(entry.chunk.name), chunk.name))

                if (chunk === entry || ~dependencies.indexOf(filename)) {
                  return
                }
                dependencies.push(filename)
              })
            })

            // 在源码前面拼接 runtime 以及公共代码依赖
            source = new ConcatSource(script({ dependencies }), source)
            return source
          },
        )
      }
    })
  }
}

module.exports = MinaRuntimeWebpackPlugin
