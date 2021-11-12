const SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin')
// const MultiEntryPlugin = require('webpack/lib/MultiEntryPlugin') // webpack 4
const EntryPlugin = require('webpack/lib/EntryPlugin')
const path = require('path')
const fs = require('fs')
const replaceExt = require('replace-ext')

const assetsChunkName = '__assets_chunk_name__'
const PluginName = 'MinaWebpackPlugin'

function itemToPlugin(context, entry, options) {
  if (Array.isArray(entry) && entry.length) {
    return itemToPlugin(context, entry.shift(), options)
  }
  if (typeof entry === 'string') {
    // console.log('new EntryPlugin(context, item, options)', new EntryPlugin(context, entry, options))
    return new EntryPlugin(context, entry, options)
  }
}

function _inflateEntries(entries = [], dirname, entry) {
  // 读取入口文件 app.js -> app.json
  const configFile = replaceExt(entry, '.json')
  const content = fs.readFileSync(configFile, 'utf8')
  const config = JSON.parse(content)

  const { pages, usingComponents, subpackages } = config
  pages && pages.forEach(item => inflateEntries(entries, dirname, item))
  usingComponents && Object.values(usingComponents).forEach(item => inflateEntries(entries, dirname, item))
  subpackages &&
    subpackages.forEach(subpackage =>
      subpackage.pages.forEach(item => inflateEntries(entries, dirname + `/${subpackage.root}`, item)),
    )
}

function inflateEntries(entries, dirname, entryV5) {
  let entry = entryV5?.main?.import?.join() || entryV5
  if (/plugin:\/\//.test(entry)) {
    console.log(`发现插件 ${entry}`)
    return
  }

  //通过useExtendedLib扩展库的方式引入WeUI组件https://developers.weixin.qq.com/miniprogram/dev/extended/weui/quickstart.html
  //扩展库内置于开发者工具中，此处无需处理
  //WeUI组件路径包含weui-miniprogram，据此进行判断
  if (entry.includes('weui-miniprogram')) return

  entry = path.resolve(dirname, entry)
  if (entry != null && !entries.includes(entry)) {
    entries.push(entry)
    _inflateEntries(entries, path.dirname(entry), entry)
  }
}

function first(entry, extensions) {
  for (const ext of extensions) {
    const file = replaceExt(entry, ext)
    if (fs.existsSync(file)) {
      return file
    }
  }
  return null
}

function all(entry, extensions) {
  const items = []
  for (const ext of extensions) {
    const file = replaceExt(entry, ext)
    if (fs.existsSync(file)) {
      items.push(file)
    }
  }
  return items
}

function normalizePath(dir) {
  return './' + dir
}

module.exports = class MinaWebpackPlugin {
  constructor(options = {}) {
    this.scriptExtensions = options.scriptExtensions || ['.ts', '.js']
    this.assetExtensions = options.assetExtensions || []
    this.entries = []
  }

  applyEntry(compiler, done) {
    const { context } = compiler.options

    this.entries
      .map(item => first(item, this.scriptExtensions))
      // 把绝对路径转换成相对于 context 的路径
      .map(item => path.relative(context, item))
      .forEach(item => itemToPlugin(context, normalizePath(item), replaceExt(item, '')).apply(compiler))
      //  应用每一个的入口，生成如下的入口
      // 'app': './app.js',
      // 'pages/index/index': './pages/index/index.js',

    const assets = this.entries
      .reduce((items, item) => [...items, ...all(item, this.assetExtensions)], [])
      .map(item => normalizePath(path.relative(context, item)))

    itemToPlugin(context, assets, assetsChunkName).apply(compiler)

    if (done) {
      done()
    }
  }

  // apply是每一个插件的入口
  apply(compiler) {
    const { context, entry } = compiler.options
    inflateEntries(this.entries, context, entry)

    // 这里订阅一个 compiler 的 entryOption 事件，当事件发生时，就会执行回调里面的代码
    // 在 entry 配置项处理过之后，执行插件
    compiler.hooks.entryOption.tap(PluginName, () => {
      this.applyEntry(compiler)
      // 返回 true 告诉 webpack 内置插件就不要处理入口文件了，因为这里已经处理了
      return true
    })

    compiler.hooks.watchRun.tap(PluginName, (_compiler, done) => {
      // 监听模式下，一个新的编译(compilation)触发之后，执行一个插件，但是是在实际编译开始之前。
      this.applyEntry(_compiler, done)
    })

    compiler.hooks.compilation.tap(PluginName, compilation => {
      compilation.hooks.beforeChunkAssets.tap(PluginName, () => {
        // compilation.chunks 在 webpack5 中是 Set 不是 Array
        compilation.chunks.forEach(item => {
          if (item.name === assetsChunkName) {
            // 移除该 chunk，使之不会生成对应的 asset，也就不会输出文件
            // 如果没有这一步，最后会生成一个 __assets_chunk_name__.js 文件
            compilation.chunks.delete(item)
          }
        })
      })
    })
  }
}
