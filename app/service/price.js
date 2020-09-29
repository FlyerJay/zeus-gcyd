const Service = require('egg').Service

class PriceService extends Service {
  async priceList(params) {
    const { page = 0, pageSize = 15 } = params
    const options = Object.assign({}, params, { pageSize: Number(pageSize), page, comId: this.ctx.user.internalId })
    return await this.app.model.SupplierValue.priceList(options)
  }
}

module.exports = PriceService
