module.exports = () => {
  return async function auth(ctx, next) {
    const token = ctx.request.headers.authorization.replace(/^Bearer(\s)+/, '')

    if (token) {
      let verify
      try {
        verify = ctx.app.jwt.verify(token)
      } catch (exp) {
        throw new Error('401|无效的token')
      }
      if (Date.now() > verify.exp * 1000) {
        throw new Error('401|登录过期，请重新登录')
      } else {
        ctx.user = verify.data
        await next()
      }
    } else {
      throw new Error('401|你还没有登录')
    }
  }
}

