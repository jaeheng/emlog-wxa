let api = 'https://api.zhangziheng.com';

module.exports = {
  getArticle: api + '/getArticle',
  getArticleInfo: api + '/getArticleInfo',
  getArticleComments: api + '/getArticleComments',
  login: api + '/login',
  addComment: api + '/addComment',
  getCommentsByOpenid: api + '/getCommentsByOpenid'
}