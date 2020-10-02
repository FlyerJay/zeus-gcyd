module.exports = app => {
  const { controller, middleware } = app
  const inventroyV1Router = app.router.namespace('/zeus/api/inventory')

  const { inventory } = controller
  const authUser = middleware.authUser()

  inventroyV1Router.get('/list', authUser, inventory.list)
}

