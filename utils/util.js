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
 * http操作
 */
function http (url, params, type, success, error, needLoading) {
  if (typeof needLoading !== 'boolean' || needLoading) {
    loading()
  }
  wx.request({
    url: url,
    data: params,
    method: type,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (resp) {
      var data = resp.data
      if (data.state) {
        typeof success == 'function' && success(data.data)
        setTimeout(function () { unloading() }, 300)
      } else {
        console.log(data.msg)
        typeof error == 'function' && error(data.msg)
        unloading()
      }
    },
    fail: function() {
      unloading()
      typeof error == 'function' && error('请求错误!')
    }
  })
}

/**
 * 获取某分类下的文章
 */
function getArticle(sort, page, success, error) {
  http(api.getArticle, { sort, page }, 'GET', success, error)
}

/**
 * 获取文章详情
 */
function getArticleInfo(gid, success, error) {
  http(api.getArticleInfo, { gid }, 'GET', success, error)
}

/**
 * 获取某文章下的评论
 */
function getArticleComments(gid, page, success, error) {
  http(api.getArticleComments, { gid, page }, 'GET', success, error, false)
}

function setLS (key, value) {
  wx.setStorage({
    key: key,
    data: value
  })
}

function getLS (key) {
  return wx.getStorageSync(key)
}

function login (callback, error) {
  wx.login({
    success: function (res) {
      if (res.code) {
        //发起网络请求
        http(api.login, { code: res.code }, 'GET', function (res) {
          var session3rd = res.session3rd
          setLS('session3rd', session3rd)
          typeof callback == 'function' && callback()
        }, error)
      } else {
        console.log('获取用户登录态失败！' + res.errMsg)
        unloading()
      }
    }
  });
}

/**
 * 添加评论
 */
function addComment (data, callback, error) {
  var session3rd = getLS('session3rd');
  data.session3rd = session3rd
  data.poster = data.poster || '小程序用户'
  data.avatar = data.avatar || 'http://blog.zhangziheng.com/public/images/default-avatar.png'
  http(api.addComment, data, 'POST', callback, error)
}

function getCommentsByOpenid (page, callback, error) {
  var session3rd = getLS('session3rd');
  http(api.getCommentsByOpenid, { page, session3rd }, 'GET', callback, error)
}

/**
 * 获取简历数据
 */
function getMyCv(success, error) {
  http(api.cv, {}, 'GET', success, error)
}

module.exports = {
  formatTime,
  getArticle,
  getArticleInfo,
  getArticleComments,
  login,
  addComment,
  getCommentsByOpenid,
  getMyCv
}
