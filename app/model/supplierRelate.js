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
    underscored: false,
    timestamps: false
  })

  SupplierRelate.open = async function({ supplierId, comId }) {
    const ret = await this.findOne({
      where: {
        supplierId,
        comId
      }
    })
    const supplier = await app.model.Supplier.findOne({
      where: {
        supplierId
      }
    })
    if (ret) {
      await ret.update({ isValide: 1 })
    } else {
      await this.create({ supplierId, comId, isValide: 1 })
    }
    const freight = await app.model.Freight.findOne({
      where: {
        address: supplier.address,
        comId
      }
    })
    if (!freight) {
      await app.model.Freight.createFreight({ comId, address: supplier.address, freight: 0 })
    }
    return '开启成功'
  }

  SupplierRelate.close = async function({ supplierId, comId }) {
    await this.update({
      isValide: 0
    }, {
      where: {
        supplierId,
        comId
      }
    })
    return '关闭成功'
  }

  SupplierRelate.updateSr = function(params) {
    const { supplierId, comId } = params
    return this.update(params, {
      where: {
        supplierId,
        comId
      }
    })
  }

  return SupplierRelate
}
