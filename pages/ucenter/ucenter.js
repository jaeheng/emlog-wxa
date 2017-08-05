// ucenter.js
import util from '../../utils/util.js'
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    app.getUserInfo(function (userInfo) {
      console.log(userInfo)
      that.setData({
        userInfo: userInfo
      })
    })
  },

  myComment: function (e) {
    wx.navigateTo({
      url: '../my-comment/my-comment'
    })
  }
})