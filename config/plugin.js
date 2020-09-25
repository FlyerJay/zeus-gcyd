

/** @type Egg.EggPlugin */
module.exports = {
  sequelize: {
    enable: true,
    package: 'egg-sequelize'
  },

  validate: {
    enable: true,
    package: 'egg-validate'
  },

  redis: {
    enable: true,
    package: 'egg-redis'
  },

  jwt: {
    enable: true,
    package: 'egg-jwt'
  },

  routerPlus: {
    enable: true,
    package: 'egg-router-plus'
  }
}
