const Service = require('egg').Service

class UserService extends Service {
  async userLogin(options) {
    let userInfo
    if (options.type === 'external') {
      userInfo = await this.app.model.External.externalLogin({
        userName: options.userName,
        password: options.password
      })
    }

    if (!userInfo) {
      throw new Error('用户名或者密码不正确')
    }

    // 生成token
    const token = this.app.jwt.sign({
      data: userInfo,
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60
    })

    return { userInfo, token }
  }

  async userSetting(options) {
    await this.app.model.External.updateExternal({
      userName: options.userName,
      password: options.password,
      externalName: options.externalName,
      externalId: this.ctx.user.externalId
    })

    return this.userLogin({
      userName: options.userName,
      password: options.password,
      type: 'external'
    })
  }
}

module.exports = UserService
