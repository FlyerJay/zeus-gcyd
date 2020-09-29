module.exports = app => {
  const { controller, middleware } = app
  const memberV1Router = app.router.namespace('/zeus/api/member')

  const { member } = controller
  const authUser = middleware.authUser()

  memberV1Router.post('/create', authUser, member.create)
  memberV1Router.post('/update', authUser, member.update)
  memberV1Router.post('/remove', authUser, member.remove)
  memberV1Router.get('/list', authUser, member.list)
}

