module.exports = app => {
  const { controller, middleware } = app
  const roleV1Router = app.router.namespace('/zeus/api/role')

  const { role } = controller
  const authUser = middleware.authUser()

  roleV1Router.post('/create', authUser, role.create)
  roleV1Router.get('/list/page', authUser, role.listPage)
  roleV1Router.get('/list', authUser, role.list)
}

