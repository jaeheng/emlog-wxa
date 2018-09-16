let domain = 'http://localhost:8090';
let api = domain + '/api.php?route='

module.exports = {
  getArticle: api + 'article&page=',
  getArticleInfo: api + 'articleInfo&gid=',
  getSettings: api + 'options',
  getSorts: api + 'sorts'
}