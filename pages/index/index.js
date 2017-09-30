//index.js
Page({
  data: {
    desc: '记录web开发工作中遇到的问题及解决办法',
    userInfo: {
      nickName: "子恒博客",
      avatarUrl: "/static/images/logo.png"
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../blog/blog'
    })
  },
  goToMyResume: function () {
    wx.navigateTo({
      url: '../resume/resume'
    })
  },
  onLoad: function () {
  },
  onShareAppMessage: function () {
    return {
      title: '子恒博客'
    }
  }
})
