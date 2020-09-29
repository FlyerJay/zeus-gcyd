module.exports = app => {
  const { controller, middleware } = app
  const freightV1Router = app.router.namespace('/zeus/api/freight')

  const { freight } = controller
  const authUser = middleware.authUser()

  freightV1Router.get('/list', authUser, freight.list)
  freightV1Router.post('/create', authUser, freight.create)
  freightV1Router.post('/update', authUser, freight.update)
  freightV1Router.post('/remove', authUser, freight.remove)
}

