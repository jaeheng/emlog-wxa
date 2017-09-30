// resume.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    year: (new Date()).getFullYear() - 2015
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '张子恒的简历'
    }
  }
})