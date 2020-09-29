const Service = require('egg').Service

class SupplierService extends Service {
  async supplierList(params) {
    const { page = 0, pageSize = 15 } = params
    const options = Object.assign({}, params, { pageSize: Number(pageSize), page, comId: this.ctx.user.internalId })
    return await this.app.model.Supplier.supplierList(options)
  }

  async openSupplier({ supplierId }) {
    return await this.app.model.SupplierRelate.open({ supplierId, comId: this.ctx.user.internalId })
  }

  async closeSupplier({ supplierId }) {
    return await this.app.model.SupplierRelate.close({ supplierId, comId: this.ctx.user.internalId })
  }

  async updateSupplierSetting(params) {
    return await this.app.model.SupplierRelate.updateSr(Object.assign({}, params, {
      comId: this.ctx.user.internalId
    }))
  }
}

module.exports = SupplierService
