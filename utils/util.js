import api from './api'

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function loading () {
  wx.showLoading({
    title: '加载中..',
    mask: true
  })
}

function unloading () {
  wx.hideLoading()
}

/**
 * GET操作
 */
function get (url, params, success, error) {
  loading()
  wx.request({
    url: url,
    data: params,
    method: 'GET',
    success: function (resp) {
      var data = resp.data
      if (data.state) {
        success(data.data)
        setTimeout(function () { unloading() }, 300)
      } else {
        console.log(data.msg)
        unloading()
      }
    },
    fail: function() {
      unloading()
      error()
    }
  })
}

/**
 * 获取某分类下的文章
 */
function getArticle (term_id, page, success, error) {
  get(api.getArticle, { term_id, page }, success, error)
}

module.exports = {
  formatTime: formatTime,
  getArticle: getArticle
}
