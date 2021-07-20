// blog-info.js
import util from '../../utils/util.js'

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    gid: 0,
    data: {},
    error: '',
    total: 0,
    page: 1,
    comments: [],
    isend: false,
    setting: {
      comment_pnum: 10
    }
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
    this.getComments()
    var that = this
    app.getSetting(function(setting) {
      console.log('setting:', setting)
      that.setData({
        setting: setting
      })
    })
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
      success.content = success.content.replace(/<img/gi, '<img class="rich-img" style="max-width:100%!important;display:block" ')
        .replace(/<section/g, '<div')
        .replace(/\/section>/g, '\div>');
      that.setData({
        data: success
      })
    }, function (error) {
      that.setData({
        error: error
      })
    })
  },

  getComments: function () {
    let isEnd = this.data.isend
    if (isEnd) return false
    var gid = this.data.gid
    var page = this.data.page
    var that = this
    var oldData = this.data.comments

    util.getArticleComments(gid, page, function (success) {
      console.log(success)
      that.setData({
        page: page + 1,
        comments: oldData.concat(success.list),
        total: success.total,
        isend: success.list.length < that.data.setting.comment_pnum
      })

      wx.stopPullDownRefresh()
    })
  },

  onPullDownRefresh: function () {
    this.getArticleInfo()
  },
  onReachBottom: function () {
    this.getComments()
  },
  onShareAppMessage: function (res) {
    return {
      title: this.data.data.title
    }
  },
  onShareTimeline: function (res) {
    return {
      title: this.data.data.title
    }
  }
})