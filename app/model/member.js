/**
 * @desc 企业成员表
 */
const accessUtils = require('../utils/access')

module.exports = app => {
  const { STRING, INTEGER, DATE, Op } = app.Sequelize

  const Member = app.model.define('member', {
    memberId: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comments: '成员ID'
    },
    mobile: {
      type: STRING(11),
      allowNull: false,
      comments: '手机号'
    },
    password: {
      type: STRING(32),
      allowNull: false,
      comments: '密码'
    },
    memberName: {
      type: STRING(20),
      allowNull: false,
      comments: '成员名称'
    },
    roleId: {
      type: INTEGER,
      allowNull: true,
      comments: '角色'
    },
    externalId: {
      type: INTEGER,
      allowNull: true,
      comments: '属于公司'
    },
    createTime: {
      type: DATE,
      allowNull: false,
      comments: '创建时间'
    },
    lastLoginTime: {
      type: DATE,
      allowNull: true,
      comments: '上次登录时间'
    }
  }, {
    freezeTabName: true,
    underscored: false,
    tableName: 'external_member',
    timestamps: false
  })

  Member.createMember = async function(params) {
    const { mobile, memberName, externalId, roleId } = params
    const isExist = await this.findOne({
      where: {
        mobile
      }
    })
    if (isExist) {
      throw new Error('手机号已被使用，请更换手机号码')
    }
    const options = {
      createTime: Date.now(),
      mobile,
      password: accessUtils.md5('123456'),
      memberName,
      externalId,
      roleId
    }
    return this.create(options)
  }

  Member.updateMember = async function({ memberName, roleId, memberId }) {
    return this.update({
      memberName,
      roleId
    }, {
      where: {
        memberId
      }
    })
  }

  Member.removeMember = async function({ memberId }) {
    return this.destroy({
      where: { memberId }
    })
  }

  Member.memberList = async function(params) {
    const { memberName = '', mobile = '', page, pageSize, externalId } = params
    const list = await this.findAndCountAll({
      where: {
        memberName: {
          [Op.like]: `%${memberName}%`
        },
        mobile: {
          [Op.like]: `%${mobile}%`
        },
        externalId
      },
      offset: Number(page - 1),
      limit: Number(pageSize)
    })
    return list
  }

  Member.memberLogin = async function({ userName, password }) {
    const user = await this.findOne({
      where: {
        mobile: userName,
        password
      }
    })
    if (!user) return
    const enterprise = await app.model.External.findOne({
      where: {
        externalId: user.externalId
      }
    })
    if (!enterprise) throw new Error('成员信息有误')
    if (!user.roleId) throw new Error('没有登录权限，请联系管理员添加')

    const role = await app.model.MemberRole.findOne({
      where: {
        roleId: user.roleId
      },
      attributes: [ 'permissions' ]
    })

    await this.update({
      lastLoginTime: Date.now()
    }, {
      where: {
        memberId: user.memberId
      }
    })

    const member = {
      internalId: enterprise.internalId,
      externalId: enterprise.externalId,
      userName: user.memberName,
      mobile: user.mobile,
      accountType: enterprise.accountType,
      type: 'member',
      createTime: user.createTime,
      externalName: enterprise.externalName,
      permissions: JSON.parse(role.permissions)
    }

    return member
  }

  return Member
}
