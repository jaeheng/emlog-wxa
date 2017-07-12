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
        error(data.msg)
        unloading()
      }
    },
    fail: function() {
      unloading()
      error('请求错误!')
    }
  })
}

/**
 * 获取某分类下的文章
 */
function getArticle(sort, page, success, error) {
  get(api.getArticle, { sort, page }, success, error)
}

/**
 * 获取文章详情
 */
function getArticleInfo(gid, success, error) {
  get(api.getArticleInfo, { gid }, success, error)
}

/**
 * 获取某文章下的评论
 */
function getArticleComments(gid, page, success, error) {
  get(api.getArticleComments, { gid, page }, success, error)
}

module.exports = {
  formatTime,
  getArticle,
  getArticleInfo,
  getArticleComments
}
