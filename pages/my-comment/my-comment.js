// my-comment.js
import util from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total: 0,
    page: 0,
    comments: [],
    isend: false
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow: function () {
    this.getComments(1)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getComments(1)
  },

  onReachBottom: function () {
    this.getComments()
  },

  getComments: function (fromStart) {
    let isEnd = this.data.isend
    if (isEnd && !fromStart) return false
    var page = fromStart ? 1 : this.data.page + 1
    var that = this
    var oldData = this.data.comments

    util.getCommentsByOpenid(page, function (success) {
      that.setData({
        page: page,
        comments: fromStart ? success.data : oldData.concat(success.data),
        total: success.total,
        isend: success.data.length < 10
      })

      wx.stopPullDownRefresh()
    })
  },

  showLog: function (e) {
    var blogId = e.currentTarget.dataset.blogid
    wx.navigateTo({
      url: '../blog-info/blog-info?gid=' + blogId
    })
  }
})