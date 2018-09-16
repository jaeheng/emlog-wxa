//app.js
import util from './utils/util.js'
App({
  onLaunch: function(e) {
    console.log('onLaunch', e);
  },

  getSetting: function(cb) {
    let setting = this.globalData.setting;
    if (setting) {
      typeof cb === 'function' ? cb(setting) : setting;
      return true;
    }
    util.getSettings(success => {
      this.globalData.setting = success;
      typeof cb === 'function' ? cb(success) : setting;
    });
  },

  globalData: {
    setting: null
  }
})
