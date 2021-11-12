const env = require(`./env/env.${process.env.BUILD_TYPE}.js`)
// 如果需要 lodash 请安装 yarn add lodash
// import { camelCase } from 'lodash'

App({
  onLaunch() {
    console.log('env', env)
    // console.log(camelCase('OnLaunch'))
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

  },
  globalData: {
    userInfo: null
  }
})
