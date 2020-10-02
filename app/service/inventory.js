const Service = require('egg').Service

class InventoryService extends Service {
  async inventoryList(params) {
    const { page = 0, pageSize = 15 } = params
    const options = Object.assign({}, params, { pageSize: Number(pageSize), page, comId: this.ctx.user.internalId })
    return await this.app.model.SupplierInventory.inventoryList(options)
  }
}

module.exports = InventoryService
