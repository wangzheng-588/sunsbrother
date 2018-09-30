//app.js
const api = require('/api/api.js')
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.globalData.code = res.code
      }
    })
  },
  globalData: {
    userInfo: null
  },
  isPoneAvailable:function ($poneInput) {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test($poneInput)) {
      return false;
    } else {
      return true;
    }
  }
})