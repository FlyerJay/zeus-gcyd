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
    underscored: false,
    timestamps: false
  })

  Supplier.supplierList = async function({ address = '', comId, supplierName = '', page, pageSize }) {
    const [ $1, $2 ] = await Promise.all([
      app.model.query(`SELECT s.supplierId,s.supplierName,s.address,sr.benifit,f.freight,sr.isValide,sr.benifitAdjust,sr.valueTime,sr.inventoryTime 
      FROM supplier s
      LEFT JOIN freight f ON
      f.comId = :comId AND
      f.address = s.address
      LEFT JOIN supplier_relate sr
      ON sr.comId = :comId
      AND sr.supplierId = s.supplierId
      WHERE s.supplierName LIKE :supplierName
      AND s.isDelete = 'N'
      AND (s.address = :address OR :address = '')
      ORDER BY sr.isValide DESC, sr.valueTime ASC, sr.inventoryTime ASC
      LIMIT :start,:offset`, {
        replacements: {
          supplierName: `%${supplierName}%`,
          comId,
          address,
          start: (page - 1) * pageSize,
          offset: pageSize
        }
      }),
      app.model.query(`SELECT count(1) as count 
      FROM supplier s
      LEFT JOIN freight f ON
      f.comId = :comId AND
      f.address = s.address
      LEFT JOIN supplier_relate sr
      ON sr.comId = :comId
      AND sr.supplierId = s.supplierId
      WHERE s.supplierName LIKE :supplierName
      AND s.isDelete = 'N'
      AND (s.address = :address OR :address = '')`, {
        replacements: {
          supplierName: `%${supplierName}%`,
          comId,
          address
        }
      })
    ])

    return {
      count: $2[0][0].count,
      rows: $1[0]
    }
  }

  return Supplier
}
