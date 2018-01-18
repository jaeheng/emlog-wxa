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

  onReady: function () {
    var that = this
    app.getUserInfo(function (userInfo) {
      console.log(userInfo)
      that.setData({
        userInfo: userInfo
      })
    })
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
    var avatar = this.data.userInfo.avatarUrl
    var fromUrl = this.data.fromUrl

    if (gid === 0 || comment.length < 1) {
      return false
    } else {
      util.addComment({ gid, comment, poster, avatar }, function (res) {
        wx.navigateBack()
      }, function (msg) {
        wx.showToast({
          title: msg,
          icon: 'loading'
        })
      })
    }
  }
})