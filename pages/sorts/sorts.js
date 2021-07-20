// pages/sorts/sorts.js
import util from '../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sorts: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSorts();
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  },

  getSorts: function () {
    util.getSorts(success => {
      console.log(success)
      this.setData({
        sorts: success
      })
    })
  },
  goSortLogs: function (event) {
    console.log(event)
    var sid = event.currentTarget.dataset.sid;
    var sortname = event.currentTarget.dataset.sortname;
    wx.navigateTo({
      url: '../sorts-log/blog?sid=' + sid + '&sortname=' + sortname
    });
  },
  onShareTimeline: function (res) {
    return {}
  }
})