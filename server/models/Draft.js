
/**
 * Created by eaTong on 2018-28-08 .
 * Description: auto generated in  2018-28-08
 */

const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const Draft = sequelize.define('draft', {
  title: {type: Sequelize.STRING},
  status: Sequelize.INTEGER,
  enable: Sequelize.BOOLEAN,
});

module.exports = Draft;
