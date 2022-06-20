// 云函数入口文件
const cloud = require('wx-server-sdk')
const fetch = require('node-fetch')
const FormData = require('form-data')
const qs = require('querystring')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()
  switch (event.action) {
    case 'getUrlScheme':
      return getUrlScheme()
      break

    case 'baiduOcr':
      return baiduOcr(event)
      break
  }
}

async function getUrlScheme() {
  return cloud.openapi.urlscheme.generate({
    jumpWxa: {
      path: '/page/index/index', // <!-- replace -->
      query: '',
    },
    // 如果想不过期则置为 false，并可以存到数据库
    isExpire: false,
    // 一分钟有效期
    expireTime: parseInt(Date.now() / 1000 + 60),
  })
}

// Example POST method implementation:
async function postData(url = '', data = {}, options = {}) {
  // Default options are marked with *
  try {
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
      ...options,
    })
    return response.json() // parses JSON response into native JavaScript objects
  } catch (error) {
    return Promise.reject(error)
  }
}

async function getBaiduAccessToken() {
  const param = qs.stringify({
    grant_type: 'client_credentials',
    client_id: '8UlZoOjqsSQAZ3ZSm97IGyGH',
    client_secret: 'Om3KTl97mqwkPzWg42PUWtzBqzbIXcVh',
  })

  try {
    const data = await postData(`https://aip.baidubce.com/oauth/2.0/token?${param}`)
    console.log('data', data)
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}
async function baiduOcr(event) {
  console.log(`🚀 ~ file: index.js ~ line 70 ~ baiduOcr ~ event`, event)
  try {
    let params = {}

    if (event.image) {
      params = qs.stringify({
        image: event.image,
      })
    } else if (event.url) {
      params = qs.stringify({
        url: event.url,
      })
    } else {
      return false
    }

    const resToken = await getBaiduAccessToken()

    console.log(`🚀 ~ file: index.js ~ line 90 ~ baiduOcr ~ resToken`, resToken.access_token)
    console.log('params', params)
    const data = await fetch(
      `https://aip.baidubce.com/rest/2.0/ocr/v1/accurate_basic?access_token=${resToken.access_token}`,
      {
        method: 'POST',
        body: params,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )
      .then(response => response.json())
      .then(result => result)
      .catch(error => Promise.reject(error))
    console.log('data', data)
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}
