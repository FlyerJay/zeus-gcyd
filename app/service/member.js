const Service = require('egg').Service

class RoleService extends Service {
  async createMember(params) {
    const options = Object.assign({}, params, {
      externalId: this.ctx.user.externalId
    })
    return await this.app.model.Member.createMember(options)
  }

  async updateMember(params) {
    return await this.app.model.Member.updateMember(params)
  }

  async removeMember(params) {
    return await this.app.model.Member.removeMember(params)
  }

  async memberList(params) {
    const { page = 0, pageSize = 15 } = params
    const options = Object.assign({}, params, { pageSize, page, externalId: this.ctx.user.externalId })
    return this.app.model.Member.memberList(options)
  }
}

module.exports = RoleService
