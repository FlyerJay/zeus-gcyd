const Controller = require('egg').Controller

class ExternalController extends Controller {
  async create() {
    const { ctx } = this
    ctx.validate({
      accountType: 'string'
    })
    const responseData = this.service.external.createExternal(ctx.request.bdoy)
    ctx.body = {
      code: 200,
      data: responseData
    }
  }

  async list() {
    const { ctx } = this
    const responseData = await this.service.external.externalList(ctx.query)
    ctx.body = {
      code: 200,
      data: responseData
    }
  }
}

module.exports = ExternalController
