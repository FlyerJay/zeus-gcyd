module.exports = app => {
  const { controller, middleware } = app
  const externalV1Router = app.router.namespace('/zeus/api/external')

  const { external } = controller
  const authUser = middleware.authUser()
  const authAdmin = middleware.authAdmin()

  externalV1Router.get('/list', authUser, authAdmin, external.list)
  externalV1Router.post('/create', authUser, authAdmin, external.create)
}

