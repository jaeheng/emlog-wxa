// blog-info.js
import util from '../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    gid: 0,
    data: {},
    error: '',
    total: 0,
    page: 0,
    comments: [],
    isend: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      gid: options.gid
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow: function () {
    this.getArticleInfo()
    this.getComments(1)
  },

  replyPost: function (e) {
    var gid = this.data.gid
    wx.navigateTo({
      url: '../add-comment/add-comment?gid=' + gid
    })
  },

  getArticleInfo: function () {
    var gid = this.data.gid
    var that = this
    util.getArticleInfo(gid, function (success) {

      that.setData({
        data: success
      })
    }, function (error) {
      that.setData({
        error: error
      })
    })
  },

  getComments: function (fromStart) {
    let isEnd = this.data.isend
    if (isEnd && !fromStart) return false
    var gid = this.data.gid
    var page = fromStart ? 1 : this.data.page
    var that = this
    var oldData = this.data.comments

    util.getArticleComments(gid, page, function (success) {
      that.setData({
        page: page,
        comments: fromStart ? success.data : oldData.concat(success.data),
        total: success.total,
        isend: success.data.length < 10
      })

      wx.stopPullDownRefresh()
    })
  },

  onPullDownRefresh: function () {
    this.getArticleInfo()
    this.getComments(1)
  },
  onShareAppMessage: function (res) {
    return {
      title: this.data.data.title
    }
  }
})