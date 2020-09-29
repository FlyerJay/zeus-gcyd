const Controller = require('egg').Controller

class PriceController extends Controller {
  async list() {
    const { ctx } = this
    const responseData = await this.service.price.priceList(ctx.query)
    ctx.body = {
      code: 200,
      data: responseData
    }
  }
}

module.exports = PriceController
