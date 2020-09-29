module.exports = app => {
  const { controller, middleware } = app
  const supplierV1Router = app.router.namespace('/zeus/api/supplier')

  const { supplier } = controller
  const authUser = middleware.authUser()

  supplierV1Router.get('/list', authUser, supplier.list)
  supplierV1Router.post('/open', authUser, supplier.open)
  supplierV1Router.post('/close', authUser, supplier.close)
  supplierV1Router.post('/update', authUser, supplier.update)
}

