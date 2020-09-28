const Service = require('egg').Service

class RoleService extends Service {
  async createRole(params) {
    const options = Object.assign({}, params, {
      externalId: this.ctx.user.externalId
    })
    return await this.app.model.MemberRole.createRole(options)
  }

  async roleListPage(params) {
    const { page = 0, pageSize = 15 } = params
    const options = Object.assign({}, params, { pageSize, page, externalId: this.ctx.user.externalId })
    return this.app.model.MemberRole.roleListPage(options)
  }
}

module.exports = RoleService
