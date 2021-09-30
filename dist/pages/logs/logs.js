;require('./../../runtime');require('./../../common');(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([[4],{

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

// logs.js
var util = __webpack_require__(21);

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

/***/ })

},[[22,0,3]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9sb2dzL2xvZ3MuanMiXSwibmFtZXMiOlsidXRpbCIsInJlcXVpcmUiLCJQYWdlIiwiZGF0YSIsImxvZ3MiLCJvbkxvYWQiLCJzZXREYXRhIiwid3giLCJnZXRTdG9yYWdlU3luYyIsIm1hcCIsImxvZyIsImRhdGUiLCJmb3JtYXRUaW1lIiwiRGF0ZSIsInRpbWVTdGFtcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBLElBQU1BLElBQUksR0FBR0MsbUJBQU8sQ0FBQyxFQUFELENBQXBCOztBQUVBQyxJQUFJLENBQUM7QUFDSEMsTUFBSSxFQUFFO0FBQ0pDLFFBQUksRUFBRTtBQURGLEdBREg7QUFJSEMsUUFKRyxvQkFJTTtBQUNQLFNBQUtDLE9BQUwsQ0FBYTtBQUNYRixVQUFJLEVBQUUsQ0FBQ0csRUFBRSxDQUFDQyxjQUFILENBQWtCLE1BQWxCLEtBQTZCLEVBQTlCLEVBQWtDQyxHQUFsQyxDQUFzQyxVQUFBQyxHQUFHLEVBQUk7QUFDakQsZUFBTztBQUNMQyxjQUFJLEVBQUVYLElBQUksQ0FBQ1ksVUFBTCxDQUFnQixJQUFJQyxJQUFKLENBQVNILEdBQVQsQ0FBaEIsQ0FERDtBQUVMSSxtQkFBUyxFQUFFSjtBQUZOLFNBQVA7QUFJRCxPQUxLO0FBREssS0FBYjtBQVFEO0FBYkUsQ0FBRCxDQUFKLEMiLCJmaWxlIjoicGFnZXNcXGxvZ3NcXGxvZ3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBsb2dzLmpzXG5jb25zdCB1dGlsID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvdXRpbC5qcycpXG5cblBhZ2Uoe1xuICBkYXRhOiB7XG4gICAgbG9nczogW11cbiAgfSxcbiAgb25Mb2FkKCkge1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBsb2dzOiAod3guZ2V0U3RvcmFnZVN5bmMoJ2xvZ3MnKSB8fCBbXSkubWFwKGxvZyA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgZGF0ZTogdXRpbC5mb3JtYXRUaW1lKG5ldyBEYXRlKGxvZykpLFxuICAgICAgICAgIHRpbWVTdGFtcDogbG9nXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufSlcbiJdLCJzb3VyY2VSb290IjoiIn0=