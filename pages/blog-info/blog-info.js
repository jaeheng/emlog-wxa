// blog-info.js
import util from '../../utils/util.js'
import WxParse from '../../utils/wxParse/wxParse.js'

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

      /**
        * WxParse.wxParse(bindName , type, data, target,imagePadding)
        * 1.bindName绑定的数据名(必填)
        * 2.type可以为html或者md(必填)
        * 3.data为传入的具体数据(必填)
        * 4.target为Page对象,一般为this(必填)
        * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
        */
      WxParse.wxParse('content', 'html', success.content, that, 5);

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