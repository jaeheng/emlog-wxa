// blog.js
import util from '../../utils/util.js';
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    data: [],
    loading: true, // 是否显示loading
    isend: false, // 是否最后一页
    imgUrl: util.getRandomBanner(),
    setting: {},
    keyword: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },

  showblogInfo: function (event) {
    var gid = event.currentTarget.dataset.gid
    wx.navigateTo({
      url: '../blog-info/blog-info?gid=' + gid
    })
  },

  getData: function (fromStart) {
    let isEnd = this.data.isend
    if (isEnd && !fromStart) return false
    var page = fromStart ? 1 : this.data.page + 1
    let that = this
    let oldData = this.data.data
    app.getSetting(setting => {
      util.getArticle(page, 0, '', function (data) {
        that.setData({
          page: page,
          data: fromStart ? data : oldData.concat(data),
          isend: data.length < setting.index_lognum // 判断每页文章条数，小于这条数说明是最后一页
        })
        wx.stopPullDownRefresh()
      });
    });
  },
  onReachBottom: function () {
    this.getData();
  },

  onPullDownRefresh: function () {
    this.getData(1);
  },

  onShareAppMessage: function (res) {
    return {
    }
  },
  onShareTimeline: function (res) {
    return {}
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow: function () {
    var that = this
    app.getSetting(function(setting) {
      console.log('setting:', setting)
      that.setData({
        setting: setting
      })
    })
  }
})