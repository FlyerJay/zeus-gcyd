module.exports = app => {
  const { controller, middleware } = app
  const userV1Router = app.router.namespace('/zeus/api/user')

  const { user } = controller
  const authUser = middleware.authUser()

  userV1Router.post('/login', user.login)
  userV1Router.post('/setting', authUser, user.setting)
  userV1Router.get('/test', user.test)
}
