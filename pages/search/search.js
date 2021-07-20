// pages/search.js
import util from '../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isEmpty: true,
    show: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      search: this.search.bind(this)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  search: function (value) {
    console.log(value)
    return new Promise((resolve, reject) => {
      let that = this
      this.setData({
        show: true
      })
      util.getArticle(1, 0, value, function (data) {
        const list = data.map(item => {
          return {
            text: item.title,
            value: item.gid
          }
        })
        that.setData({
          isEmpty: list.length === 0,
          show: false
        })
        resolve(list)
      });
    })
  },
  selectResult: function (e) {
    var gid = e.detail.item.value
    wx.navigateTo({
      url: '../blog-info/blog-info?gid=' + gid
    })
  }
})