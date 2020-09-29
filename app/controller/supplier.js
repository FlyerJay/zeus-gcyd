const Controller = require('egg').Controller

class FreightController extends Controller {
  async list() {
    const { ctx } = this
    const responseData = await this.service.supplier.supplierList(ctx.query)
    ctx.body = {
      code: 200,
      data: responseData
    }
  }

  async open() {
    const { ctx } = this
    ctx.validate({
      supplierId: 'number'
    })
    const responseData = await this.service.supplier.openSupplier(ctx.request.body)
    ctx.body = {
      code: 200,
      data: responseData
    }
  }

  async close() {
    const { ctx } = this
    ctx.validate({
      supplierId: 'number'
    })
    const responseData = await this.service.supplier.closeSupplier(ctx.request.body)
    ctx.body = {
      code: 200,
      data: responseData
    }
  }

  async update() {
    const { ctx } = this
    ctx.validate({
      supplierId: 'number'
    })
    const responseData = await this.service.supplier.updateSupplierSetting(ctx.request.body)
    ctx.body = {
      code: 200,
      data: responseData
    }
  }
}

module.exports = FreightController
