// blog.js
import util from '../../utils/util.js';
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sortname: '',
    sid: 0,
    page: 0,
    data: [],
    loading: true, // 是否显示loading
    isend: false, // 是否最后一页
    imgUrl: util.getRandomBanner()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      sid: options.sid,
      sortname: options.sortname
    })
    this.getData();
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
    var page = fromStart ? 1 : this.data.page + 1
    let that = this
    let oldData = this.data.data
    let sid = this.data.sid
    app.getSetting(setting => {
      console.log('setting', setting);
      util.getArticle(page, sid, function (data) {
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

  onReady: function () {
    var sortname = this.data.sortname
    console.log(sortname)
    wx.setNavigationBarTitle({
      title: sortname
    })
  }
})