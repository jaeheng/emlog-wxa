// comment.js
import util from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData: {},
    gid: 434,
    total: 0,
    page: 0,
    comments: [],
    isend: false
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getComments()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })

    this.animation = animation

    animation.translate(0, -40).step()

    this.setData({
      animationData: animation.export()
    })

    setTimeout(function () {
      animation.rotate(90).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 500)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getComments(0)
  },

  onReachBottom: function () {
    this.getComments()
  },

  addComment: function () {
    wx.navigateTo({
      url: '../add-comment/add-comment?gid=' + this.data.gid
    })
  },

  getComments: function (page) {
    let isEnd = this.data.isend
    if (isEnd && page !== 0) return false
    var gid = this.data.gid
    page = page || this.data.page
    var that = this
    var oldData = this.data.comments

    util.getArticleComments(gid, page + 1, function (success) {
      that.setData({
        page: page + 1,
        comments: oldData.concat(success.data),
        total: success.total,
        isend: success.data.length < 10
      })

      wx.stopPullDownRefresh()
    })
  }
})