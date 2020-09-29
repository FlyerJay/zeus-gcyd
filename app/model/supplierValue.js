module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize

  const SupplierValue = app.model.define('SupplierValue', {
    supplierValueId: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comments: '价格表主键'
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
      comments: '类别'
    },
    value: {
      type: INTEGER,
      comments: '出厂价'
    },
    material: {
      type: STRING(10),
      comments: '材质'
    },
    adjustValue: {
      type: INTEGER,
      default: 0,
      comments: '调整价'
    }
  }, {
    freezeTabName: true,
    underscored: false,
    tableName: 'supplier_value',
    timestamps: false
  })

  SupplierValue.priceList = async function({ address = '', comId, supplierName = '', spec = '', type = '', page, pageSize }) {
    const [ $1, $2 ] = await Promise.all([
      app.model.query(`SELECT sv.supplierValueId,sv.supplierId,sv.spec,sv.type,sv.value,sv.material,sv.lastUpdateTime,
      s.supplierName,s.address,sr.benifit
      FROM (select * from (select * from (select * from supplier_value order by lastUpdateTime desc limit 0,100000000) sv group by supplierId,type,spec) sv) sv
      INNER JOIN supplier s ON
      s.supplierName LIKE :supplierName
      AND s.isDelete = 'N'
      AND (s.address = :address OR :address = '')
      INNER JOIN supplier_relate sr ON
      sr.supplierId = s.supplierId
      AND sr.supplierId = sv.supplierId
      AND sr.comId = :comId
      AND sr.isValide = 1
      WHERE sv.spec LIKE :spec
      AND (sv.type = :type OR :type = '')
      ORDER BY sv.lastUpdateTime DESC,sv.supplierId,sv.type,sv.spec
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
      FROM (select * from (select * from (select * from supplier_value order by lastUpdateTime desc limit 0,100000000) sv group by supplierId,type,spec) sv) sv
      INNER JOIN supplier s ON
      s.supplierName LIKE :supplierName
      AND s.isDelete = 'N'
      AND (s.address = :address OR :address = '')
      INNER JOIN supplier_relate sr ON
      sr.supplierId = s.supplierId
      AND sr.supplierId = sv.supplierId
      AND sr.comId = :comId
      AND sr.isValide = 1
      WHERE sv.spec LIKE :spec
      AND (sv.type = :type OR :type = '')`, {
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

  return SupplierValue
}
