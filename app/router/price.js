module.exports = app => {
  const { controller, middleware } = app
  const priceV1Router = app.router.namespace('/zeus/api/price')

  const { price } = controller
  const authUser = middleware.authUser()

  priceV1Router.get('/list', authUser, price.list)
}

