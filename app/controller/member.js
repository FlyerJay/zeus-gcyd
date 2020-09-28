const Controller = require('egg').Controller

class MemberController extends Controller {
  async create() {
    const { ctx } = this
    ctx.validate({
      memberName: 'string',
      mobile: 'string',
      roleId: 'number'
    })
    const responseData = await this.service.member.createMember(ctx.request.body)
    ctx.body = {
      code: 200,
      data: responseData
    }
  }

  async list() {
    const { ctx } = this
    const responseData = await this.service.member.memberList(ctx.query)
    ctx.body = {
      code: 200,
      data: responseData
    }
  }
}

module.exports = MemberController
