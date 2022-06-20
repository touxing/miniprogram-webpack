const app = getApp()
const util = require('../../utils/util.js')

console.log(util.formatTime(new Date()))

const db = wx.cloud.database({
  env: 'cloud1-4ghc9hzg3b811f0b',
})

Page({
  data: {
    showTopTips: false,

    radioItems: [
      { name: '有', value: '0', checked: true },
      { name: '无', value: '1' },
    ],
    date: '2022-01-01',
    assetStates: ['正常使用', '闲置且没坏', '其他'],
    assetStateIndex: 0,

    formData: {
      name: '名称'
    },
    rules: [
      {
        name: 'name',
        rules: { required: true, message: '请输入名称' },
      },
      {
        name: 'radio',
        rules: { required: false, message: '有无实物是必选项' },
      },
      // {
      //   name: 'idcard',
      //   rules: {
      //     validator: function (rule, value, param, modeels) {
      //       if (!value || value.length !== 18) {
      //         return 'idcard格式不正确'
      //       }
      //     },
      //   },
      // },
    ],
    files: [],
    files2: [],
    files3: [],
  },
  radioChange: function (e) {
    e.detail.value = e.detail.value || e.currentTarget.dataset.value
    console.log('radio发生change事件，携带value值为：', e.detail.value)

    var radioItems = this.data.radioItems
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value
    }

    this.setData({
      radioItems: radioItems,
      [`formData.radio`]: e.detail.value,
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value,
      [`formData.date`]: e.detail.value,
    })
  },
  formInputChange(e) {
    const { field } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value,
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value,
    })
  },
  bindAssetStateChange: function (e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value)

    this.setData({
      assetStateIndex: e.detail.value,
    })
  },
  chooseImage: function (e) {
    const { field } = e.currentTarget.dataset
    const _this = this
    console.log(`🚀 ~ file: index.js ~ line 87 ~ res`, e)
    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
    _this.setData({
      [field]: _this.data[field].concat(e.detail.tempFilePaths.map(item => ({ url: item }))),
    })
  },
  deleteImage: function (e) {
    console.log(`🚀 ~ file: index.js ~ line 91 ~ e`, e)
    const { field } = e.currentTarget.dataset
    let files = this.data[field]
    files.splice(e.detail.index, 1)
    this.setData({
      [field]: files,
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files, // 需要预览的图片http链接列表
    })
  },
  selectFile(files) {
    console.log('files', files)
    // 返回false可以阻止某次文件上传
  },
  uploadError(e) {
    console.log('upload error', e.detail)
  },
  uploadSuccess(e) {
    console.log('upload success', e.detail)
  },
  scanCode(e) {
    const _this = this
    const { field } = e.currentTarget.dataset
    wx.scanCode({
      scanType: 'pdf417',
      success(res) {
        if (field === 'factoryNum') {
          _this.setData({
            [`formData.${field}`]: res.result,
          })
          return
        }
        console.log(res)
      },
      fail(err) {
        console.error(err)
      },
    })
  },
  uploadImageOrc(event) {
    const _this = this
    const { field } = event.currentTarget.dataset
    wx.chooseImage({
      success(res) {
        const fileSize = res.tempFiles[0].size // 单位B
        const sizeDiff = fileSize - 5 * 1024 * 1024 > 0 // 最大1.3M
        if (sizeDiff) {
          wx.showToast({
            title: '图片大小不得超过5M',
          })
          return
        }
        // 调百度ocr识别接口
        _this
          .testCloud(res.tempFilePaths[0])
          .then(res => {
            console.log('res', res)
            if (~res.errMsg.indexOf('ok')) {
              _this.setData({
                [`formData.${field}`]: res.result.words_result[0].words
              })
            }
          })
          .catch(err => {
            console.error(err)
          })
      },
    })
  },
  submitForm() {
    this.selectComponent('#form').validate((valid, errors) => {
      console.log('valid', valid, errors)
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message,
          })
        }
      } else {
        // wx.showToast({
        //   title: '校验通过',
        // })
        console.log('this.data.formData', this.data.formData)
        db.collection('pp_form_data').add({
          // data 字段表示需新增的 JSON 数据
          data: {
            ...this.data.formData,
            location: new db.Geo.Point(113, 23),
            done: false
          }
        })
        .then(res => {
          console.log(res)
        })
      }
    })
    // this.selectComponent('#form').validateField('mobile', (valid, errors) => {
    //     console.log('valid', valid, errors)
    // })
  },
  testCloud(filePath) {
    console.log('测试 cloud', filePath)
    if (!filePath) {
      return
    }
    let image = util.fileToBase64(filePath)
    return wx.cloud.callFunction({
      name: 'openapi',
      data: Object.assign({
        action: 'baiduOcr',
        image: image,
      }),
    })
  },
})
