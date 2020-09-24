/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1600850727224_3341';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.sequelize = {
    dialect: 'mysql',
    database: 'zues',
    host: '121.196.16.111',
    port: 3306,
    username: 'zues',
    password: 'zues@Kx002',
    timezone: '+08:00'
  }

  return {
    ...config,
    ...userConfig,
  };
};
