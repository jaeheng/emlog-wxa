// blog-info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    blog_id: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      blog_id: options.blog_id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  replyPost: function (e) {
    var blogId = e.currentTarget.dataset.blogid
    wx.navigateTo({
      url: '../add-comment/add-comment?blogid=' + blogId
    })
  }
})