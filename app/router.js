/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  // 自动同步数据库
  // app.beforeStart(async function() {
  //   await app.model.sync()
  // })
  require('./router/user')(app)
  require('./router/external')(app)
  require('./router/role')(app)
  require('./router/member')(app)
  require('./router/freight')(app)
}
