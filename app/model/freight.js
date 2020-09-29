/**
 * @desc 运费表
 */

module.exports = app => {
  const { STRING, INTEGER, BIGINT, Op } = app.Sequelize

  const Freight = app.model.define('Freight', {
    freightId: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comments: '运费主键'
    },
    comId: {
      type: STRING(2),
      allowNull: false,
      comments: '公司编号(关联公司信息)'
    },
    address: {
      type: STRING(20),
      allowNull: false,
      comments: '到岸目的地'
    },
    freight: {
      type: INTEGER,
      allowNull: false,
      comments: '运输费用',
      defaultValue: 0
    },
    lastUpdateTime: {
      type: BIGINT(20),
      comments: '记录上次更新时间'
    }
  }, {
    freezeTabName: true,
    underscored: false,
    tableName: 'freight',
    timestamps: false
  })

  Freight.createFreight = async function({ comId, address, freight }) {
    const ret = await this.findOne({
      where: {
        address,
        comId
      }
    })
    if (ret) throw new Error('已存在同一地址运费设置')
    return this.create({
      comId,
      address,
      freight,
      lastUpdateTime: Date.now()
    })
  }

  Freight.updateFreight = function({ freight, freightId }) {
    return this.update({
      freight
    }, {
      where: {
        freightId
      }
    })
  }

  Freight.removeFreight = function({ freightId }) {
    return this.destroy({
      where: {
        freightId
      }
    })
  }

  Freight.freightList = async function({ comId, address = '', page, pageSize }) {
    return this.findAndCountAll({
      where: {
        comId,
        address: {
          [Op.like]: `%${address}%`
        }
      },
      order: [
        [ 'lastUpdateTime', 'DESC' ]
      ],
      offset: Number(page - 1),
      limit: Number(pageSize)
    })
  }

  return Freight
}
