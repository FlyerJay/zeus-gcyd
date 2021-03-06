module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize

  const SupplierInventory = app.model.define('SupplierInventory', {
    supplierInventoryId: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comments: '库存表主键'
    },
    supplierId: {
      type: INTEGER,
      allowNull: false,
      comments: '供应商编号'
    },
    spec: {
      type: STRING(16),
      allowNull: false,
      comments: '规格'
    },
    lastUpdateTime: {
      type: INTEGER,
      allowNull: false,
      comments: '最近更新时间'
    },
    type: {
      type: STRING(10),
      allowNull: false,
      comments: '类别'
    },
    material: {
      type: STRING(10),
      comments: '材质'
    },
    inventoryAmount: {
      type: INTEGER,
      comments: '库存数量'
    },
    perAmount: {
      type: INTEGER,
      comments: '单件支数'
    },
    inventoryWeight: {
      type: STRING(20),
      comments: '库存重量'
    },
    long: {
      type: STRING(10),
      comments: '长度'
    },
    mark: {
      type: STRING(10),
      comments: '标记'
    }
  }, {
    freezeTabName: true,
    underscored: false,
    tableName: 'supplier_inventory',
    timestamps: false
  })

  SupplierInventory.inventoryList = async function({ comId, address = '', type = '', supplierName = '', spec = '', page, pageSize }) {
    const [ $1, $2 ] = await Promise.all([
      app.model.query(`SELECT si.supplierInventoryId,si.supplierId,si.spec,si.lastUpdateTime,
      si.type,si.material,si.long,si.inventoryAmount,si.perAmount,si.inventoryWeight,si.mark,s.supplierName,s.address,sr.benifit,f.freight FROM supplier_inventory si
      INNER JOIN supplier s ON
      s.supplierName LIKE :supplierName
      AND s.isDelete = 'N'
      AND (s.address = :address OR :address = '')
      INNER JOIN supplier_relate sr ON
      sr.supplierId = s.supplierId
      AND sr.supplierId = si.supplierId
      AND sr.comId = :comId
      AND sr.isValide = 1
      LEFT JOIN freight f ON
      f.address = s.address
      and f.comId = :comId
      WHERE si.spec LIKE :spec
      AND (si.type = :type OR :type = '')
      ORDER BY si.lastUpdateTime DESC,si.supplierId,si.type,si.spec
      LIMIT :start,:offset`, {
        replacements: {
          address,
          comId,
          supplierName: `%${supplierName}%`,
          spec: `%${spec}%`,
          type,
          start: (page - 1) * pageSize,
          offset: pageSize
        }
      }),
      app.model.query(`SELECT count(1) as count FROM supplier_inventory si
      INNER JOIN supplier s ON
      s.supplierName LIKE :supplierName
      AND s.isDelete = 'N'
      AND (s.address = :address OR :address = '')
      INNER JOIN supplier_relate sr ON
      sr.supplierId = s.supplierId
      AND sr.supplierId = si.supplierId
      AND sr.comId = :comId
      AND sr.isValide = 1
      LEFT JOIN freight f ON
      f.address = s.address
      and f.comId = :comId
      WHERE si.spec LIKE :spec
      AND (si.type = :type OR :type = '')`, {
        replacements: {
          address,
          comId,
          supplierName: `%${supplierName}%`,
          spec: `%${spec}%`,
          type
        }
      })
    ])

    return {
      count: $2[0][0].count,
      rows: $1[0]
    }
  }

  SupplierInventory.productList = async function({ comId, address = '', type = '', supplierName = '', spec = '', page, pageSize }) {
    const [ $1, $2 ] = await Promise.all([
      app.model.query(`SELECT si.supplierInventoryId,si.spec,
      si.type,si.material,si.long,si.inventoryAmount,si.perAmount,si.inventoryWeight,si.mark,s.supplierId,s.supplierName,s.address,f.freight,sr.benifit,sv.value,
      si.lastUpdateTime as inventoryTime, sv.lastUpdateTime as valueTime,sv.adjustValue,(IFNULL(sv.adjustValue, 0) - IFNULL(sr.benifitAdjust, 0)) as priceAdjust,sr.benifitAdjust,(IFNULL(sv.value, 0) - IFNULL(sr.benifit, 0)) as purePrice, (IFNULL(sv.value, 0) - IFNULL(sr.benifit, 0) + IFNULL(f.freight, 0)) as daPrice,
      CASE WHEN sv.time <> '' AND sv.time > si.lastUpdateTime THEN sv.time ELSE si.lastUpdateTime END as lastUpdateTime
      FROM supplier_inventory si
      INNER JOIN supplier s
      ON (s.address = :address OR :address = '')
      AND s.isDelete = 'N'
      INNER JOIN supplier_relate sr
      ON sr.supplierId = s.supplierId
      AND sr.supplierId = si.supplierId
      AND sr.comId = :comId
      AND sr.isValide = 1
      LEFT JOIN (select *,sv.lastUpdateTime as time from (select * from supplier_value order by lastUpdateTime desc limit 0,100000000) sv group by supplierId,type,spec) sv
      ON si.supplierId = sv.supplierId
      AND si.type = sv.type
      AND si.material = sv.material
      AND si.spec = sv.spec
      LEFT JOIN freight f ON
      f.address = s.address
      AND f.comId = :comId
      WHERE si.spec LIKE :spec
      AND (si.type = :type OR :type = '')
      ORDER BY si.type desc,si.lastUpdateTime DESC,si.supplierId,si.spec
      LIMIT :start,:offset`, {
        replacements: {
          address,
          comId,
          supplierName: `%${supplierName}%`,
          spec: `%${spec}%`,
          type,
          start: (page - 1) * pageSize,
          offset: pageSize
        }
      }),
      app.model.query(`SELECT count(1) as count
      FROM supplier_inventory si
      INNER JOIN supplier s
      ON (s.address = :address OR :address = '')
      AND s.isDelete = 'N'
      INNER JOIN supplier_relate sr
      ON sr.supplierId = s.supplierId
      AND sr.supplierId = si.supplierId
      AND sr.comId = :comId
      AND sr.isValide = 1
      LEFT JOIN (select *,sv.lastUpdateTime as time from (select * from supplier_value order by lastUpdateTime desc limit 0,100000000) sv group by supplierId,type,spec) sv
      ON si.supplierId = sv.supplierId
      AND si.type = sv.type
      AND si.material = sv.material
      AND si.spec = sv.spec
      LEFT JOIN freight f ON
      f.address = s.address
      AND f.comId = :comId
      WHERE si.spec LIKE :spec
      AND (si.type = :type OR :type = '')`, {
        replacements: {
          address,
          comId,
          supplierName: `%${supplierName}%`,
          spec: `%${spec}%`,
          type
        }
      })
    ])

    return {
      count: $2[0][0].count,
      rows: $1[0]
    }
  }

  return SupplierInventory
}
