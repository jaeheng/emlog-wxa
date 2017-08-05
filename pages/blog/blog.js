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
    per_page: 10,
    imgUrl: 'https://api.zhangziheng.com/static/images/banner2.png'
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

  getData: function (fromStart) {
    let isEnd = this.data.isend
    if (isEnd && !fromStart) return false
    let sort = this.data.sort
    var page = fromStart ? 1 : this.data.page + 1
    let that = this
    let oldData = this.data.data
    util.getArticle(sort, page, function (data) {
      that.setData({
        page: page,
        data: fromStart ? data.data : oldData.concat(data.data),
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
    this.getData(1);
  }
})