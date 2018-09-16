// blog-info.js
import util from '../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    gid: 0,
    data: {},
    error: ''
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
  },

  getArticleInfo: function () {
    var gid = this.data.gid
    var that = this
    util.getArticleInfo(gid, function (success) {
      success.content = success.content.replace(/\<img/gi, '<img class="rich-img" ');
      that.setData({
        data: success
      })
    }, function (error) {
      that.setData({
        error: error
      })
    })
  },

  onPullDownRefresh: function () {
    this.getArticleInfo()
  },
  onShareAppMessage: function (res) {
    return {
      title: this.data.data.title
    }
  }
})