import config from '../config.js'
let api = config.domain + '/content/plugins/wxa/api.php?route='

module.exports = {
  getArticle: api + 'article&page=',
  getArticleInfo: api + 'articleInfo&gid=',
  getSettings: api + 'options',
  getSorts: api + 'sorts',
  getArticleComments: api + 'comments',
  addComment: api + 'addComment'
}