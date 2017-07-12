// blog.js
import util from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sort: 45,
    page: 0,
    data: [],
    total: 0,
    loading: true,
    isend: false,
    per_page: 10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  showblogInfo: function (event) {
    console.log(event)
    var gid = event.currentTarget.dataset.gid
    wx.navigateTo({
      url: '../blog-info/blog-info?gid=' + gid
    })
  },

  getData: function (page) {
    let isEnd = this.data.isend
    if (isEnd && page !== 0) return false
    let sort = this.data.sort
    page = page || this.data.page
    let that = this
    let oldData = this.data.data
    util.getArticle(sort, page + 1, function (data) {
      var dataList = data.data.map(function (item) {
        item['excerpt'] = item['excerpt'] ? item['excerpt'] : item['content'].substring(0, 50)
        return item
      })
      that.setData({
        page: page + 1,
        data: oldData.concat(data.data),
        total: data.total,
        isend: data.data.length < 10
      })

      wx.stopPullDownRefresh()
    });
  },
  onReachBottom: function () {
    this.getData();
  },

  onPullDownRefresh: function () {
    this.getData(0);
  }
})