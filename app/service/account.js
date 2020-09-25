const crypto = require('crypto')
const URLSafeBase64 = require('urlsafe-base64')
const Service = require('egg').Service

class AccountService extends Service {
  md5(content) {
    return crypto.createHash('md5').update(content).digest('hex')
  }

  md5Base64(content) {
    const _base64 = crypto.createHash('md5').update(content).digest('base64')
    return URLSafeBase64.encode(new Buffer.from(_base64, 'base64'))
  }

  base64(content) {
    return new Buffer.from(content).toString('base64')
  }

  /**
	 *
	 * @param {*} id
	 * 生成用户令牌 可用于登录和接口鉴权
	 */
  async generateAccessToken(id = '10') {
    const accessId = this.md5Base64(id)
    const accessSecret = this.md5(id + Date.now())

    return {
      accessId,
      accessSecret
    }
  }
}

module.exports = AccountService

