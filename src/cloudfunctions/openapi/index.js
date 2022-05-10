// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  switch (event.action) {
    case 'getUrlScheme': {
      return getUrlScheme()
    }

    case 'ocr.printedText':
      return ocrPrintedText(event)
      break

    case 'ocr.bankcard':
      return ocrBankcard(event)
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

async function ocrPrintedText(event) {
  if (!event.Buffer) {
    return Promise.reject('no image Buffer Data')
  }
  try {
    const result = await cloud.openapi.ocr.printedText({
      type: 'photo',
      img_url: event.imgUrl
      // img: {
      //   contentType: 'image/png',
      //   value: event.Buffer,
      // },
    })
    return result
  } catch (error) {
    return error
  }
}
async function ocrBankcard(event) {
  // if (!event.Buffer) {
  //   return Promise.reject('no image Buffer Data')
  // }
  try {
    const result = await cloud.openapi.ocr.bankcard({
      type: 'photo',
      img_url: event.imgUrl,
    })
    return result
  } catch (error) {
    return error
  }
}
