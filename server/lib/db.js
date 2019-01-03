const Sequelize = require('sequelize');
const config = require('../app_config');

// 数据库配置
const sequelize = new Sequelize(config.database.DATABASE, config.database.USERNAME, config.database.PASSWORD, {
  host: config.database.HOST,
  dialect: 'mysql',
  pool: {
      max: 5,
      min: 0,
      idle: 30000
  }
});

module.exports = sequelize;