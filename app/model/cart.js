module.exports = app => {
  const { STRING, INTEGER, BIGINT } = app.Sequelize

  const Cart = app.model.define('Cart', {
    chartId: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comments: '购物车Id(主键无实际意义)'
    },
    userId: {
      type: STRING(20),
      allowNull: false,
      comments: '用户Id(主键)'
    },
    comId: {
      type: STRING(2),
      allowNull: false,
      comments: '公司编号(关联公司信息)'
    },
    spec: {
      type: STRING(20),
      allowNull: false,
      comments: '规格'
    },
    long: {
      type: INTEGER,
      comments: '长度'
    },
    supplierId: {
      type: INTEGER,
      allNull: false,
      comments: '供应商主键'
    },
    type: {
      type: STRING(10),
      allNull: false,
      comments: '类型'
    },
    chartAmount: {
      type: INTEGER,
      comments: '采购数量'
    },
    chartAdjust: {
      type: INTEGER,
      comments: '采购价格调整（与商家报价的相对值）'
    },
    createTime: {
      type: BIGINT(20),
      comments: '记录创建时间'
    },
    comment: {
      type: STRING(100),
      comments: '备注'
    },
    minPrice: {
      type: INTEGER,
      comments: '最低价格'
    },
    minSupplier: {
      type: STRING(20),
      comments: '供应商名字'
    },
    minInventory: {
      type: INTEGER,
      comments: '最小库存'
    }
  }, {
    freezeTabName: true,
    underscored: false,
    tableName: 'chart',
    timestamps: false
  })

  Cart.cartList = async function() {
    return true
  }

  return Cart
}
