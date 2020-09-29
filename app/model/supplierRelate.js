/**
 * @desc 供应商公司关联表
 */

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize
  const SupplierRelate = app.model.define('SupplierRelate', {
    supplierId: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      comments: '与供应商表作关联用'
    },
    comId: {
      type: STRING(5),
      primaryKey: true,
      allowNull: false,
      comments: '与公司进行关联'
    },
    isValide: {
      type: INTEGER,
      allowNull: false,
      comments: '是否启用'
    },
    benifitAdjust: {
      type: INTEGER,
      allowNull: true,
      comments: '政策浮动影响',
      defaultValue: 0
    },
    benifit: {
      type: INTEGER,
      allowNull: true,
      comments: '厂家优惠',
      defaultValue: 0
    },
    valueTime: {
      type: STRING(20),
      comments: '价格表更新时间'
    },
    inventoryTime: {
      type: STRING(20),
      comments: '库存表更新时间'
    }
  }, {
    freezeTabName: true,
    tableName: 'supplier_relate',
    underscored: true,
    timestamps: false
  })

  return SupplierRelate
}
