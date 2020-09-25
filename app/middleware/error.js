module.exports = () => {
  return async function error(ctx, next) {
    try {
      await next()
    } catch (exp) {
      const expMatch = exp.message.match(/(\d+)\|(.*)/)
      ctx.body = {
        code: (expMatch && expMatch[1]) || 500,
        msg: (expMatch && expMatch[2]) || exp.message
      }
    }
  }
}
