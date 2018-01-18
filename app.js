//app.js
import util from './utils/util.js'
App({
  onLaunch: function() {
    var that = this
    util.login(function () {
      that.getUserInfo()
    })
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          console.log('wx.getUserInfo:', res.userInfo)
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        },
        fail: function () {
          let userInfo = {
            avatarUrl: 'http://blog.zhangziheng.com/public/images/default-avatar.png',
            city: '',
            country: 'China',
            gender: 1,
            language: 'zh_CN',
            nickName: '小程序用户',
            province: ''
          }

          that.globalData.userInfo = userInfo
          typeof cb == "function" && cb(userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null
  }
})
