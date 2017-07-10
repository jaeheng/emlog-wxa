// my-comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  showLog: function (e) {
    var blogId = e.currentTarget.dataset.blogid
    wx.navigateTo({
      url: '../blog-info/blog-info?blog_id=' + blogId
    })
  }
})