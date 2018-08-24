/**
 * Created by eaTong on 2018-24-08 .
 * Description: auto generated in  2018-24-08
 */

const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const Task = sequelize.define('task', {
  name: {type: Sequelize.STRING},
  comment: {type: Sequelize.STRING,comment:'描述'},
  emergent_level: {type: Sequelize.INTEGER, comment: '紧急程度'},
  important_level: {type: Sequelize.INTEGER, comment: '重要程度'},
  complete_percent: {type: Sequelize.INTEGER, comment: '完成比例'},
  plan_start_date:{type:Sequelize.STRING , comment:'计划开始日期'},
  plan_end_date:{type:Sequelize.STRING , comment:'计划结束日期'},
  start_date:{type:Sequelize.STRING , comment:'开始日期'},
  end_date:{type:Sequelize.STRING , comment:'结束日期'},
  stage: {type: Sequelize.STRING,comment:'阶段'},
  enable: Sequelize.BOOLEAN,
});

module.exports = Task;
