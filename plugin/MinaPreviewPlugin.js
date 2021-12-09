/**
 * @desc 删除 dist 目录下没有生成 js 文件的 component 组件目录
 * eg: componentA -> [componentA.json, componentA.wxml, componentA.wxss]
 * 这类文件在开发者工具 真机调试 时会报错 Error: xxx does not exists 导致无法在真机调试
 */
const path = require('path')
const fs = require('fs')

class MinaPreviewPlugin {
  static defaultOptions = {
    ignore: [], // 忽略的目录数组
    output: path.resolve('./dist'),
  }
  // 需要传入自定义插件构造函数的任意选项
  //（这是自定义插件的公开API）
  constructor(options = {}) {
    this.options = { ...MinaPreviewPlugin.defaultOptions, ...options }
  }

  apply(compiler) {
    const pluginName = MinaPreviewPlugin.name
    compiler.hooks.done.tap(pluginName, stats => {
      this.treeshake()
    })
  }

  mapDir(dir, callback, finish) {
    fs.readdir(dir, (err, files) => {
      if (err) {
        console.error(err)
        return
      }
      // DFS
      files.forEach((filename, index) => {
        // 忽略不需要遍历的目录
        if (this.options.ignore.includes(filename)) {
          return
        }
        let pathname = path.join(dir, filename)
        fs.stat(pathname, (err, stats) => {
          // 读取文件信息
          if (err) {
            console.error('获取文件stats失败')
            return
          }
          if (stats.isDirectory()) {
            this.mapDir(pathname, callback, finish)
          } else if (stats.isFile()) {
            typeof callback === 'function' && callback(files, pathname)
            if (index === files.length - 1) {
              typeof finish === 'function' && finish()
            }
          }
        })
      })
    })
  }
  treeshake() {
    this.mapDir(
      this.options.output,
      (files, pathname) => {
        // 遍历查找有 json 文件，没有 js 文件的目录
        if (!files.some(item => /\.js$/.test(item)) && files.some(item => /\.json$/.test(item))) {
          let dirName = path.dirname(pathname)
          // 把当前文件的父目录删除
          fs.rmdir(dirName, { recursive: true }, err => {
            if (err) {
              console.error(err)
              return
            }
            // console.log('delete directory', dirName)
          })
        }
      },
      () => {
        // console.log('xxx文件目录遍历完了')
      },
    )
  }
}

module.exports = MinaPreviewPlugin
