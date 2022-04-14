# 小程序工程化实战 + webpack

**基于 webpack4 的小程序打包工具**
支持：
- es6、Promise、async/await
- scss

## 初始化项目

clone 项目下来
```
git clone https://github.com/touxing/miniprogram-webpack.git
```
```
D:\work\project\wxminiprogram-webpack-demo
├── babel.config.json         // babel 配置文件
├── gulpfile.mjs              // gulp 配置文件 用 gulp 处理图片
├── out.txt
├── package.json
├── plugin
|  ├── MinaRuntimePlugin.js   // 提出公共文件 runtime
|  └── MinaWepackPlugin.js    // 多入口插件
├── README.md
├── rename.js                 // 批量修改后文件缀名脚本
├── src                       // 小程序源码目录
|  ├── app.js
|  ├── app.json
|  ├── app.scss
|  ├── assets
|  |  └── styles
|  |     ├── mixins.scss
|  |     └── _share.scss
|  ├── pages
|  |  ├── index
|  |  |  ├── index.js
|  |  |  ├── index.json
|  |  |  ├── index.scss
|  |  |  └── index.wxml
|  |  └── logs
|  |     ├── logs.js
|  |     ├── logs.json
|  |     ├── logs.wxml
|  |     └── logs.wxss
|  ├── project.config.json       // 小程序项目配置文件
|  ├── sitemap.json
|  └── utils
|     └── util.js
├── webpack.config.js           // webpack 配置文件
└── yarn.lock
```

下载完结构目录。
**新项目可以直接使用，在 `src` 目录下进行开发**

**迁移已有小程序项目**
1. 删掉 `src` 目录下的内容，把小程序项目 copy 到 src 目录下
2. 替换 `project.config.json` 文件，放到根目录下
3. 配置小程序跟目录 `project.config.json` 添加
```
"miniprogramRoot": "dist/",
"cloudfunctionRoot": "dist/cloudfunctions/",  // 可选，如果是有云开发需求
```

## 运行

~~安装依赖，建议使用 `yarn`~~
改用 pnpm 安装依赖包
> [pnpm](https://pnpm.io/zh/) 用法和 `yarn` 类似
```
yarn
# or
pnpm i
```

运行，打开小程序开发者工具查看
```
yarn dev
```

## 打包

> 项目配置了根据不同环境打包到同一个目录，可自行根据业务区分处理

打包后，自动进行压缩图片到 `dist`
```
yarn build
```

单独执行图片压缩优化命令
```
yarn imagemin
```
> 非 `production` 环境对图片进行了缓存，需要清除开发缓存执行 `gulp clear`

创建模板
```
yarn run create
```
环境说明：
```
npm run dev # 开发环境
npm run test # 测试环境
npm run build # 生产环境
```

遇到问题请看[注意事项](#注意事项)
## 开发辅助

### 命令行调用
> [官方文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/cli.html)

> cli 命令如果不是在开发者工具安装目录运行，需要把执行路径配置包环境变量中
```bash
cli --lang zh -h # 查看中文帮助
```

小程序命令行调用
- 需要在微信开发者工具，开启`服务端口`
- 需要全局安装 `shelljs`(用js写shell脚本的工具) 执行 `npm i -g shelljs`
```
yarn wxcli # 封装了交互指令
```

## 注意事项

现在很多常用的 `loader` 最新版基本都是适配 `webpack5` 的，实际使用过程中可能会遇到很多问题，需要不断解决。遇到 `sass-loader` 报错尝试降低版本。
建议不要修改 `package.json` 的安装版本，这里面的版本都是我踩过坑，在 `webpack4` 版本可以正常使用的。
遇到其他错误，建议 `google`

项目跑起来遇到问题：
- 安装 `npm install -g windows-build-tools`
- 尝试重新安装依赖，或者换用 `yarn` 安装依赖。
- `yarn clean` 删除dist目录，重新 run
  - 如果执行删除命令报错 `rm` 不是可执行，请手动删除 `dist` 目录
> 参考：https://blog.csdn.net/deflypig/article/details/107345507
如果项目跑起来 `npm run dev` 后，打开dist目录下的小程序无法运行

安装**微信开发者工具版本：Stable 1.05.2111300** 用其他版本可能会有异常，无法运行项目，这是开发者工具的问题

小程序开发者工具运行有问题，尝试重启开发者工具或重新 `npm run`

### 升级 `webpack5` 过程

### `package.json` 中的插件升级
1.安装 `npm-check-updates`
```
npm i -g npm-check-updates
```

2.检查依赖，在 `package.json` 同级目录执行
```
npm-check-updates
```


## TODO

- [x] 区分打包目录  `dist/dev`   `dist/prod`  `dist/test`
- [x] 新增模板cli命令
- [x] 升级 `webpack5`
  - [x] `webpack4` 升级 `webpack5`
  - [x] `.scss` 文件编译不生效问题
  - [x] 配置 `runtime` 优化打包体积
    - 编写了一个 `WeappRuntimePlugin.js` 插件处理 runtime 主要逻辑是替换开启 runtime 优化后，引入路径不正确的问题

## 可选

### 按需引入[埋点SDK](https://github.com/touxing/weapp_buried_point_sdk)

```js
import { init as trackerInit } from './lib/weapptracker.js'
import { tracks } from './config/buried_point_conf/index.js'

// 初始化埋点
trackerInit({
  url: 'https://httpbin.org/post', // 测试地址
  autoTrack: {
    appLaunch: true,
    appHide: false,
    appShow: false,
    pageShow: false,
    pageHide: false,
    pageUnload: false,
    onShare: false,
  },
  delay: 2000,
  tracks,
  success(reporterInstance) {
    // 对接第三方埋点系统
    // test_thried_ok().then((reporter) => {
    //   let buriedSystem = reporterInstance.getSingleton()
    //   buriedSystem.changeReporterEngine(reporter)
    // })
  },
})
```
## 鸣谢

> 感谢以下项目提供了参考帮助

- [listenzz/MyMina](https://github.com/listenzz/MyMina)
- [WangZhenHao/webpack-in-miniprogram](https://github.com/WangZhenHao/webpack-in-miniprogram)
- [czero1995/miniprogram-cli](https://github.com/czero1995/miniprogram-cli)

参考资料：
[记录将项目中webpack4升级至webpack5一次成功尝试](https://www.mybj123.com/11258.html)
