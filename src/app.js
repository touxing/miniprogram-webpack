const env = require(`./env/env.${process.env.BUILD_TYPE}.js`)
// import { camelCase } from 'lodash'

App({
  onLaunch() {
    console.log('env', env)
    // console.log(camelCase('OnLaunch'))
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
