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

  async update() {
    const { ctx } = this
    ctx.validate({
      memberName: 'string',
      roleId: 'number'
    })
    const responseData = await this.service.member.updateMember(ctx.request.body)
    ctx.body = {
      code: 200,
      data: responseData
    }
  }

  async remove() {
    const { ctx } = this
    ctx.validate({
      memberId: 'number'
    })
    const responseData = await this.service.member.removeMember(ctx.request.body)
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
