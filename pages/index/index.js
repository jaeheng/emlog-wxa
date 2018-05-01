//index.js
import util from '../../utils/util.js'
Page({
  data: {
    desc: '...',
    userInfo: {
      nickName: "...",
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
    util.getSettings(res => {
      this.setData({
        desc: res.bloginfo,
        "userInfo.nickName": res.blogname
      })
    })
  },
  onShareAppMessage: function () {
    return {
      title: '子恒博客'
    }
  }
})
