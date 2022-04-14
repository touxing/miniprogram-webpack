const Index = {
  path: 'pages/index/index',
  elementTracks: [
    {
      element: '.usermotto', // 声明需要监听的元素
      dataKeys: [], // 声明需要获取 data下的 userInfo 对象下的 nickName 字段
    },
  ],
  // 配置示例
  methodTracks: [
    {
      method: 'onShow',
      feature: 'web_on_index',
      label: ''
    },
    {
      method: 'testSend', // 监听的函数
      feature: 'testSend', // 埋点事件 eventId
      label: 'testSend', // 事件 label
      labelKey: 'dynLabel', // 插入动态 label key 替换 静态 label
      // 页面 data 下的值
      // 字符串支持 obj.member 对象.字段 方式配置，默认 key 是最后一个
      // 支持 对象方式赋值，key 是埋点请求传的key， value 是读取 data 中的 key，data.value，字符串支持 obj.member 方式
      dataKeys: ['userInfo.wxNickname', 'navTopHeight', { safeTop: 'navTopHeight' }],
      objKeys: [ // 埋点对象参数，额外获取传参
        {
          key: 'test', // 埋点传参的 key值 和 读取埋点对象的值
        }
      ]
    }
  ]
}

export default Index
