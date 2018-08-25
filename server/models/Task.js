/**
 * Created by eaTong on 2018-24-08 .
 * Description: auto generated in  2018-24-08
 */

const Sequelize = require('sequelize');
const sequelize = require('../framework/database');
const User = require('./User');

const Task = sequelize.define('task', {
  title: {type: Sequelize.STRING},
  description: {type: Sequelize.STRING, comment: '描述'},
  emergent_level: {type: Sequelize.INTEGER, comment: '紧急程度'},
  important_level: {type: Sequelize.INTEGER, comment: '重要程度'},
  complete_percent: {type: Sequelize.INTEGER, defaultValue: 0, comment: '完成比例'},
  plan_start_date: {type: Sequelize.STRING, comment: '计划开始日期'},
  plan_end_date: {type: Sequelize.STRING, comment: '计划结束日期'},
  start_date: {type: Sequelize.STRING, comment: '开始日期'},
  end_date: {type: Sequelize.STRING, comment: '结束日期'},
  stage: {type: Sequelize.STRING, defaultValue: 0, comment: '阶段'},
  parent_id: {type: Sequelize.INTEGER, defaultValue: 0, comment: '父级task_id'},
  level: {type: Sequelize.INTEGER, comment: '层级'},
  pictures: {type: Sequelize.STRING, comment: '图片'},
  responsible_user_id: {type: Sequelize.INTEGER,},

  enable: Sequelize.BOOLEAN,
}, {comment: '任务'});
// Task.hasOne(User, {foreignKey: 'responsible_user_id'});
Task.belongsTo(User, {foreignKey: 'responsible_user_id' ,as :'responsibleUser'});
module.exports = Task;
