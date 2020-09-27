module.exports = () => {
  return async function auth(ctx, next) {
    if (ctx.user.accountType !== 'A') {
      throw new Error('403|你没有权限访问')
    } else {
      await next()
    }
  }
}

