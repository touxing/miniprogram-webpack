;require('./../../runtime');require('./../../common');(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([[2],{

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

// index.js
// 获取应用实例
var app = getApp();

var util = __webpack_require__(21);

console.log(util.formatTime(new Date()));
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false

  },
  // 事件处理函数
  bindViewTap: function bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    });
  },
  onLoad: function onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      });
    }
  },
  getUserProfile: function getUserProfile(e) {
    var _this = this;

    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息',
      // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: function success(res) {
        console.log(res);

        _this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
      }
    });
  },
  getUserInfo: function getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e);
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
  }
});

/***/ })

},[[20,0,3]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9pbmRleC9pbmRleC5qcyJdLCJuYW1lcyI6WyJhcHAiLCJnZXRBcHAiLCJ1dGlsIiwicmVxdWlyZSIsImNvbnNvbGUiLCJsb2ciLCJmb3JtYXRUaW1lIiwiRGF0ZSIsIlBhZ2UiLCJkYXRhIiwibW90dG8iLCJ1c2VySW5mbyIsImhhc1VzZXJJbmZvIiwiY2FuSVVzZSIsInd4IiwiY2FuSVVzZUdldFVzZXJQcm9maWxlIiwiY2FuSVVzZU9wZW5EYXRhIiwiYmluZFZpZXdUYXAiLCJuYXZpZ2F0ZVRvIiwidXJsIiwib25Mb2FkIiwiZ2V0VXNlclByb2ZpbGUiLCJzZXREYXRhIiwiZSIsImRlc2MiLCJzdWNjZXNzIiwicmVzIiwiZ2V0VXNlckluZm8iLCJkZXRhaWwiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBLElBQU1BLEdBQUcsR0FBR0MsTUFBTSxFQUFsQjs7QUFDQSxJQUFNQyxJQUFJLEdBQUdDLG1CQUFPLENBQUMsRUFBRCxDQUFwQjs7QUFFQUMsT0FBTyxDQUFDQyxHQUFSLENBQVlILElBQUksQ0FBQ0ksVUFBTCxDQUFnQixJQUFJQyxJQUFKLEVBQWhCLENBQVo7QUFFQUMsSUFBSSxDQUFDO0FBQ0hDLE1BQUksRUFBRTtBQUNKQyxTQUFLLEVBQUUsYUFESDtBQUVKQyxZQUFRLEVBQUUsRUFGTjtBQUdKQyxlQUFXLEVBQUUsS0FIVDtBQUlKQyxXQUFPLEVBQUVDLEVBQUUsQ0FBQ0QsT0FBSCxDQUFXLDhCQUFYLENBSkw7QUFLSkUseUJBQXFCLEVBQUUsS0FMbkI7QUFNSkMsbUJBQWUsRUFBRUYsRUFBRSxDQUFDRCxPQUFILENBQVcsOEJBQVgsS0FBOENDLEVBQUUsQ0FBQ0QsT0FBSCxDQUFXLDZCQUFYLENBTjNELENBTXFHOztBQU5yRyxHQURIO0FBU0g7QUFDQUksYUFWRyx5QkFVVztBQUNaSCxNQUFFLENBQUNJLFVBQUgsQ0FBYztBQUNaQyxTQUFHLEVBQUU7QUFETyxLQUFkO0FBR0QsR0FkRTtBQWVIQyxRQWZHLG9CQWVNO0FBQ1AsUUFBSU4sRUFBRSxDQUFDTyxjQUFQLEVBQXVCO0FBQ3JCLFdBQUtDLE9BQUwsQ0FBYTtBQUNYUCw2QkFBcUIsRUFBRTtBQURaLE9BQWI7QUFHRDtBQUNGLEdBckJFO0FBc0JITSxnQkF0QkcsMEJBc0JZRSxDQXRCWixFQXNCZTtBQUFBOztBQUNoQjtBQUNBVCxNQUFFLENBQUNPLGNBQUgsQ0FBa0I7QUFDaEJHLFVBQUksRUFBRSxRQURVO0FBQ0E7QUFDaEJDLGFBQU8sRUFBRSxpQkFBQ0MsR0FBRCxFQUFTO0FBQ2hCdEIsZUFBTyxDQUFDQyxHQUFSLENBQVlxQixHQUFaOztBQUNBLGFBQUksQ0FBQ0osT0FBTCxDQUFhO0FBQ1hYLGtCQUFRLEVBQUVlLEdBQUcsQ0FBQ2YsUUFESDtBQUVYQyxxQkFBVyxFQUFFO0FBRkYsU0FBYjtBQUlEO0FBUmUsS0FBbEI7QUFVRCxHQWxDRTtBQW1DSGUsYUFuQ0csdUJBbUNTSixDQW5DVCxFQW1DWTtBQUNiO0FBQ0FuQixXQUFPLENBQUNDLEdBQVIsQ0FBWWtCLENBQVo7QUFDQSxTQUFLRCxPQUFMLENBQWE7QUFDWFgsY0FBUSxFQUFFWSxDQUFDLENBQUNLLE1BQUYsQ0FBU2pCLFFBRFI7QUFFWEMsaUJBQVcsRUFBRTtBQUZGLEtBQWI7QUFJRDtBQTFDRSxDQUFELENBQUosQyIsImZpbGUiOiJwYWdlc1xcaW5kZXhcXGluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW5kZXguanNcbi8vIOiOt+WPluW6lOeUqOWunuS+i1xuY29uc3QgYXBwID0gZ2V0QXBwKClcbmNvbnN0IHV0aWwgPSByZXF1aXJlKCcuLi8uLi91dGlscy91dGlsLmpzJylcblxuY29uc29sZS5sb2codXRpbC5mb3JtYXRUaW1lKG5ldyBEYXRlKCkpKVxuXG5QYWdlKHtcbiAgZGF0YToge1xuICAgIG1vdHRvOiAnSGVsbG8gV29ybGQnLFxuICAgIHVzZXJJbmZvOiB7fSxcbiAgICBoYXNVc2VySW5mbzogZmFsc2UsXG4gICAgY2FuSVVzZTogd3guY2FuSVVzZSgnYnV0dG9uLm9wZW4tdHlwZS5nZXRVc2VySW5mbycpLFxuICAgIGNhbklVc2VHZXRVc2VyUHJvZmlsZTogZmFsc2UsXG4gICAgY2FuSVVzZU9wZW5EYXRhOiB3eC5jYW5JVXNlKCdvcGVuLWRhdGEudHlwZS51c2VyQXZhdGFyVXJsJykgJiYgd3guY2FuSVVzZSgnb3Blbi1kYXRhLnR5cGUudXNlck5pY2tOYW1lJykgLy8g5aaC6ZyA5bCd6K+V6I635Y+W55So5oi35L+h5oGv5Y+v5pS55Li6ZmFsc2VcbiAgfSxcbiAgLy8g5LqL5Lu25aSE55CG5Ye95pWwXG4gIGJpbmRWaWV3VGFwKCkge1xuICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsOiAnLi4vbG9ncy9sb2dzJ1xuICAgIH0pXG4gIH0sXG4gIG9uTG9hZCgpIHtcbiAgICBpZiAod3guZ2V0VXNlclByb2ZpbGUpIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIGNhbklVc2VHZXRVc2VyUHJvZmlsZTogdHJ1ZVxuICAgICAgfSlcbiAgICB9XG4gIH0sXG4gIGdldFVzZXJQcm9maWxlKGUpIHtcbiAgICAvLyDmjqjojZDkvb/nlKh3eC5nZXRVc2VyUHJvZmlsZeiOt+WPlueUqOaIt+S/oeaBr++8jOW8gOWPkeiAheavj+asoemAmui/h+ivpeaOpeWPo+iOt+WPlueUqOaIt+S4quS6uuS/oeaBr+Wdh+mcgOeUqOaIt+ehruiupO+8jOW8gOWPkeiAheWmpeWWhOS/neeuoeeUqOaIt+W/q+mAn+Whq+WGmeeahOWktOWDj+aYteensO+8jOmBv+WFjemHjeWkjeW8ueeql1xuICAgIHd4LmdldFVzZXJQcm9maWxlKHtcbiAgICAgIGRlc2M6ICflsZXnpLrnlKjmiLfkv6Hmga8nLCAvLyDlo7DmmI7ojrflj5bnlKjmiLfkuKrkurrkv6Hmga/lkI7nmoTnlKjpgJTvvIzlkI7nu63kvJrlsZXnpLrlnKjlvLnnqpfkuK3vvIzor7fosKjmhY7loavlhplcbiAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIHVzZXJJbmZvOiByZXMudXNlckluZm8sXG4gICAgICAgICAgaGFzVXNlckluZm86IHRydWVcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICBnZXRVc2VySW5mbyhlKSB7XG4gICAgLy8g5LiN5o6o6I2Q5L2/55SoZ2V0VXNlckluZm/ojrflj5bnlKjmiLfkv6Hmga/vvIzpooTorqHoh6oyMDIx5bm0NOaciDEz5pel6LW377yMZ2V0VXNlckluZm/lsIbkuI3lho3lvLnlh7rlvLnnqpfvvIzlubbnm7TmjqXov5Tlm57ljL/lkI3nmoTnlKjmiLfkuKrkurrkv6Hmga9cbiAgICBjb25zb2xlLmxvZyhlKVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICB1c2VySW5mbzogZS5kZXRhaWwudXNlckluZm8sXG4gICAgICBoYXNVc2VySW5mbzogdHJ1ZVxuICAgIH0pXG4gIH1cbn0pXG4iXSwic291cmNlUm9vdCI6IiJ9