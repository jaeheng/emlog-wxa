// resume.js
import util from '../../utils/util.js'
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    setting: {}
  },

  onReady: function () {
    app.getSetting(setting => {
      this.setData({
        setting: setting
      })
    })
  }
})