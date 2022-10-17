const { Sequelize } = require('sequelize');

const { config } = require('./../config/config');

const setupModels = require('./../database/models/index');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'mysql',
});

setupModels(sequelize);

sequelize.sync();

module.exports = sequelize;
