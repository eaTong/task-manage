/**
 * Created by eaTong on 2018/9/2 .
 * Description:
 */
const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const User = sequelize.define('operation-log', {
  max: Sequelize.INTEGER,
  type: Sequelize.STRING,
});


module.exports = User;
