const Controller = require('egg').Controller

class InventoryController extends Controller {
  async list() {
    const { ctx } = this
    const responseData = await this.service.inventory.inventoryList(ctx.query)
    ctx.body = {
      code: 200,
      data: responseData
    }
  }
}

module.exports = InventoryController
