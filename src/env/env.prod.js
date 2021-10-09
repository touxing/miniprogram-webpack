let apiPrex = '/fun'
let baseUrl = 'https://weixinshz.cmbc.com.cn'
let env = {
  doamin: baseUrl,
  apiPrex,
  spikeBaseUrl: 'http://funshz.cmbc.com', // todo: 秒杀使用单独的接口，未使用，未测试
  imagePrexDoamin: `${baseUrl}/fun/yt/images/wx`,
  loginDoamin: baseUrl, // 登录专用
  webPreDoamin: baseUrl + apiPrex,
  api: 'https://api.xxxxxx.com',
  appId: 'xxxx',
  appIdGzh: 'xxxxx',
  appIdCircel: 'xxxx',
  webPath: 'https://wx-dev.xxxx',
  value: 'prod',
  circleAppId: 'xxxxx',
  staticPath: 'xxxxxxx',
}

module.exports = env
