const Controller = require('egg').Controller

class UserController extends Controller {
  async login() {
    const { ctx } = this
    ctx.validate({
      userName: 'string',
      password: 'string',
      type: 'string'
    })

    const responseData = await this.service.user.userLogin(ctx.request.body)
    ctx.body = {
      code: 200,
      data: responseData
    }
  }

  async setting() {
    const { ctx } = this
    ctx.validate({
      userName: 'string',
      password: 'string'
    })
    const responseData = await this.service.user.userSetting(ctx.request.body)
    ctx.body = {
      code: 200,
      data: responseData
    }
  }

  async test() {
    const { ctx } = this
    ctx.body = await this.service.account.generateAccessToken('kppwin01')
  }
}

module.exports = UserController
