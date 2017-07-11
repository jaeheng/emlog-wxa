// blog.js
import util from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    term_id: 45,
    page: 0,
    data: [],
    total: 0,
    term_name: '',
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
    var blog_id = event.currentTarget.dataset.blogid
    wx.navigateTo({
      url: '../blog-info/blog-info?blog_id=' + blog_id
    })
  },

  getData: function () {
    let isEnd = this.data.isend
    if (isEnd) return false
    let term_id = this.data.term_id
    let page = this.data.page
    let that = this
    let oldData = this.data.data
    util.getArticle(term_id, page + 1, function (data) {
      var dataList = data.data.map(function (item) {
        item['post_excerpt'] = item['post_excerpt'].replace(/\n/g, '')
        item['post_content'] = item['post_content'].replace(/\n/g, '')
        item['post_excerpt'] = item['post_excerpt'].replace(/&nbsp;/g, '')
        item['post_content'] = item['post_content'].replace(/&nbsp;/g, '')
        item['post_excerpt'] = item['post_excerpt'] ? item['post_excerpt'].replace(/<\/?.+?>/g, "") : item['post_content'].replace(/<\/?.+?>/g, "").substring(0, 50)
        return item
      })
      that.setData({
        page: page + 1,
        data: oldData.concat(data.data),
        total: data.total,
        term_name: data.term_name,
        isend: data.data.length < 10
      })
    });
  },
  onReachBottom: function () {
    this.getData();
  }
})