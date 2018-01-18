// resume.js
import util from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    year: (new Date()).getFullYear() - 2015,
    cv: {}
  },

  onLoad: function () {
    this.getMyCv()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '我的简历'
    }
  },

  /**
   * 获取简历数据
   */
  getMyCv: function () {
    let that = this
    util.getMyCv(function (cv) {
      console.log('cv:', cv)
      that.setData({
        cv: cv
      })
    }, function (err) {
      wx.showToast({
        title: err,
        icon: 'loading'
      })
    })
  }
})