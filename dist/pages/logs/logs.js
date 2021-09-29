;require('./../../runtime');(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([[3],[
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// logs.js
var util = __webpack_require__(3);

Page({
  data: {
    logs: []
  },
  onLoad: function onLoad() {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return {
          date: util.formatTime(new Date(log)),
          timeStamp: log
        };
      })
    });
  }
});

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var formatTime = function formatTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return "".concat([year, month, day].map(formatNumber).join('/'), " ").concat([hour, minute, second].map(formatNumber).join(':'));
};

var formatNumber = function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : "0".concat(n);
};

module.exports = {
  formatTime: formatTime
};

/***/ })
],[[2,0]]]);