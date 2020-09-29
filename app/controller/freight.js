const Controller = require('egg').Controller

class FreightController extends Controller {
  async create() {
    const { ctx } = this
    ctx.validate({
      address: 'string',
      freight: 'number'
    })
    const responseData = await this.service.freight.createFreight(ctx.request.body)
    ctx.body = {
      code: 200,
      data: responseData
    }
  }

  async update() {
    const { ctx } = this
    ctx.validate({
      freight: 'number',
      freightId: 'number'
    })
    const responseData = await this.service.freight.updateFreight(ctx.request.body)
    ctx.body = {
      code: 200,
      data: responseData
    }
  }

  async remove() {
    const { ctx } = this
    ctx.validate({
      freightId: 'number'
    })
    const responseData = await this.service.freight.removeFreight(ctx.request.body)
    ctx.body = {
      code: 200,
      data: responseData
    }
  }

  async list() {
    const { ctx } = this
    const responseData = await this.service.freight.freightList(ctx.query)
    ctx.body = {
      code: 200,
      data: responseData
    }
  }

  async address() {
    const { ctx } = this
    const responseData = await this.service.freight.addressList(ctx.query)
    ctx.body = {
      code: 200,
      data: responseData
    }
  }
}

module.exports = FreightController
