/**
 * @desc 企业成员表
 */

module.exports = app => {
  const { STRING, INTEGER, DATE, Op } = app.Sequelize

  const Member = app.model.define('member', {
    memberId: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comments: '外部公司ID'
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
    }
  }, {
    freezeTabName: true,
    underscored: false,
    tableName: 'external_member',
    timestamps: false
  })

  return Member
}
