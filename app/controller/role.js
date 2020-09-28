const Controller = require('egg').Controller

class RoleController extends Controller {
  async create() {
    const { ctx } = this
    ctx.validate({
      roleName: 'string',
      permissions: 'string'
    })
    const responseData = await this.service.role.createRole(ctx.request.body)
    ctx.body = {
      code: 200,
      data: responseData
    }
  }

  async listPage() {
    const { ctx } = this
    const responseData = await this.service.role.roleListPage(ctx.query)
    ctx.body = {
      code: 200,
      data: responseData
    }
  }

  async list() {
    const { ctx } = this
    const responseData = await this.service.role.roleList(ctx.query)
    ctx.body = {
      code: 200,
      data: responseData
    }
  }
}

module.exports = RoleController
