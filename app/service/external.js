const Service = require('egg').Service

class ExternalService extends Service {
  async createExternal(params) {
    return this.app.model.External.createExternal(params)
  }

  async externalList(params) {
    const { page = 0, pageSize = 15 } = params
    const options = Object.assign({}, params, { pageSize, page })
    return this.app.model.External.externalList(options)
  }
}

module.exports = ExternalService
