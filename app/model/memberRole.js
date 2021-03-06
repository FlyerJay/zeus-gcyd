/**
 * @description 角色表
 */

module.exports = app => {
  const { STRING, INTEGER, TEXT, DATE, Op } = app.Sequelize

  const MemberRole = app.model.define('memberRole', {
    roleId: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comments: '角色ID'
    },
    permissions: {
      type: TEXT,
      allowNull: false,
      comments: '权限json'
    },
    externalId: {
      type: INTEGER,
      allowNull: false,
      comments: '密码'
    },
    roleName: {
      type: STRING(20),
      allowNull: false,
      comments: '角色名称'
    },
    remark: {
      type: STRING(100),
      allowNull: true,
      comments: '备注'
    },
    createTime: {
      type: DATE,
      allowNull: false,
      comments: '创建时间'
    }
  }, {
    freezeTabName: true,
    underscored: false,
    tableName: 'external_member_role',
    timestamps: false
  })

  MemberRole.createRole = function({ roleName, permissions, externalId, remark }) {
    const options = {
      roleName,
      permissions,
      createTime: Date.now(),
      externalId,
      remark
    }
    return this.create(options)
  }

  MemberRole.updateRole = function({ roleName, permissions, roleId, remark }) {
    return this.update({
      roleName,
      permissions,
      remark
    }, {
      where: {
        roleId
      }
    })
  }

  MemberRole.removeRole = async function({ roleId }) {
    const user = await app.model.Member.findOne({
      where: {
        roleId
      }
    })
    if (user) {
      throw new Error('角色下有关联的用户，不能删除')
    }
    return this.destroy({
      where: {
        roleId
      }
    })
  }

  MemberRole.roleList = function({ externalId, roleName = '' }) {
    return this.findAll({
      where: {
        externalId,
        roleName: {
          [Op.like]: `%${roleName}%`
        }
      },
      attributes: [ 'roleId', 'roleName' ]
    })
  }

  MemberRole.roleListPage = async function({ roleName = '', page, pageSize, externalId }) {
    const list = await this.findAndCountAll({
      where: {
        roleName: {
          [Op.like]: `%${roleName}%`
        },
        externalId
      },
      offset: Number(page - 1),
      limit: Number(pageSize)
    })
    return list
  }

  return MemberRole
}
