const Service = require('egg').Service

class FreightService extends Service {
  async createFreight({ address, freight }) {
    return await this.app.model.Freight.createFreight({
      address,
      freight,
      comId: this.ctx.user.internalId
    })
  }

  async updateFreight(params) {
    return await this.app.model.Freight.updateFreight(params)
  }

  async removeFreight(params) {
    return await this.app.model.Freight.removeFreight(params)
  }

  async freightList(params) {
    const { page = 0, pageSize = 15 } = params
    const options = Object.assign({}, params, { pageSize, page, comId: this.ctx.user.internalId })
    return await this.app.model.Freight.freightList(options)
  }
}

module.exports = FreightService
