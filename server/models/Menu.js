/**
 * Created by eatong on 18-2-20.
 */
const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const Menu = sequelize.define('menu', {
  path: {type: Sequelize.STRING, unique: true},
  name: Sequelize.STRING,
  icon: Sequelize.STRING,
  parent_id:{type:Sequelize.INTEGER ,comment:'父级task_id'},
  level:{type:Sequelize.INTEGER ,comment:'层级'},
  enable: Sequelize.BOOLEAN,
});

module.exports = Menu;