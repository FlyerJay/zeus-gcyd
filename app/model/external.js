/**
 * @desc 外部公司实体类型
 */

module.exports = app => {
  const { STRING, INTEGER, DATE, Op } = app.Sequelize

  const External = app.model.define('external', {
    externalId: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comments: '外部公司ID'
    },
    externalName: {
      type: STRING(20),
      allowNull: false,
      comments: '外部公司名称'
    },
    internalId: {
      type: INTEGER,
      allowNull: false,
      comments: '公司内部ID'
    },
    userName: {
      type: STRING(20),
      allowNull: true,
      comments: '登录账号'
    },
    password: {
      type: STRING(32),
      allowNull: true,
      comments: '登录密码'
    },
    accessId: {
      type: STRING(24),
      allowNull: false,
      comments: '开放账号'
    },
    accessSecret: {
      type: STRING(32),
      allowNull: false,
      comments: '开放账号密码'
    },
    accountType: {
      type: STRING(1),
      allowNull: false,
      comments: '账号类型: T 临时账号 S 正式账号 A 管理账号',
      defaultValue: 'T'
    },
    createTime: DATE
  }, {
    freezeTabName: true,
    underscored: false,
    tableName: 'external',
    timestamps: false
  })

  /**
   *
   * @param {*} params
   * 创建一个外部公司
   */
  External.createExternal = async function(params) {
    const { externalName, accountType } = params
    const external = await this.create({
      externalName,
      accountType
    })
    const internalId = String(10000 + external.externalId)
    const access = app.service.account.generateAccessToken(internalId)
    return this.update({
      internalId: String(internalId),
      accessId: access.accessId,
      accessSecret: access.accessSecret
    }, {
      where: {
        externalId: external.externalId
      }
    })
  }

  /**
   *
   * @param {*} params
   * 修改公司属性
   */
  External.updateExternal = function(params) {
    return this.update(params, {
      where: {
        externalId: params.externalId
      }
    })
  }

  External.externalList = async function(params) {
    const { externalName = '', page, pageSize } = params
    const list = await this.findAndCountAll({
      where: {
        externalName: {
          [Op.and]: {
            [Op.like]: `%${externalName}%`
          }
        }
      },
      offset: Number(page - 1),
      limit: Number(pageSize)
    })
    return list
  }

  /**
   * @param {*} params
   * 公司账号登录
   */
  External.externalLogin = async function({ userName, password }) {
    const user = await this.findOne({
      where: {
        [Op.or]: [
          {
            userName,
            password
          },
          {
            accessId: userName,
            accessSecret: password
          }
        ]
      },
      attributes: [ 'externalId', 'externalName', 'internalId', 'userName', 'accountType', 'createTime' ]
    })

    if (!user) return user
    const enterprise = {
      internalId: user.internalId,
      userName: user.userName,
      accountType: user.accountType,
      type: 'external',
      createTime: user.createTime,
      externalId: user.externalId,
      externalName: user.externalName
    }

    if (!enterprise.userName) {
      enterprise.leading = 'setting'
    }

    return enterprise
  }

  return External
}
