// add-comment.js
import util from '../../utils/util.js'
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    gid: 0,
    comment: '',
    disabled: true,
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      gid: options.gid
    })
  },

  onShow: function () {
    var that = this
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userInfo: res.userInfo
        })
      }
    })
  },

  getUserinfoHandle: function (res) {
    console.log('res:', res)
    var that = this
    if (res.detail.errMsg === 'getUserInfo:ok') {
      var userInfo = res.detail.userInfo
      that.setData({
        userInfo: userInfo
      })
      wx.showToast({
        title: '授权成功',
        icon: 'success'
      })
    } else {
      wx.showModal({
        title: '授权失败',
        content: '请自行在小程序设置界面授权',
        success: function ({ confirm, cancel }) {
          wx.openSetting()
        }
      })
    }
  },

  changeHandle: function (e) {
    console.log('input comment')
    var gid = this.data.gid
    var comment = e.detail.value
    console.log('gid: ' + gid)
    console.log('comment: ' + comment)

    this.setData({
      comment: comment,
      disabled: gid === 0 || comment.length < 1
    })
  },

  addComment: function () {
    var gid = this.data.gid
    var comment = this.data.comment
    var poster = this.data.userInfo.nickName

    if (gid === 0 || comment.length < 1) {
      return false
    } else {
      util.addComment({ gid, comment, poster }, function (res) {
        wx.showToast({
          title: '评论成功,可能需要管理员审核才能显示',
          icon: 'none',
          success: function () {
            setTimeout(() => {
              wx.navigateBack()
            }, 300);
          }
        })
      }, function (msg) {
        wx.showToast({
          title: msg,
          icon: 'none'
        })
      })
    }
  }
})