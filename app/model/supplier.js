/**
 * @desc 供应商表
 */

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize

  const Supplier = app.model.define('Supplier', {
    supplierId: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comments: '供应商编号'
    },
    supplierName: {
      type: STRING(15),
      allowNull: false,
      comments: '供应商名称'
    },
    address: {
      type: STRING(20),
      allowNull: false,
      comments: '供应商地址'
    },
    isDelete: {
      type: STRING(1),
      comments: '是否删除'
    }
  }, {
    freezeTabName: true,
    tableName: 'supplier',
    underscored: true,
    timestamps: false
  })

  return Supplier
}
