/**
 * Created by eaTong on 2018-24-08 .
 * Description: auto generated in  2018-24-08
 */

const Sequelize = require('sequelize');
const sequelize = require('../framework/database');
const User = require('./User');
const TaskParticipators = require('./TaskParticipators');

const Task = sequelize.define('task', {
  title: {type: Sequelize.STRING},
  description: {type: Sequelize.STRING, comment: '描述'},
  code: {type: Sequelize.STRING, comment: '任务编号'},
  emergent_level: {type: Sequelize.INTEGER, comment: '紧急程度'},
  important_level: {type: Sequelize.INTEGER, comment: '重要程度'},
  complete_percent: {type: Sequelize.INTEGER, defaultValue: 0, comment: '完成比例'},
  plan_start_date: {type: Sequelize.DATEONLY, comment: '计划开始日期'},
  plan_end_date: {type: Sequelize.DATEONLY, comment: '计划结束日期'},
  start_date: {type: Sequelize.DATEONLY, comment: '开始日期'},
  end_date: {type: Sequelize.DATEONLY, comment: '结束日期'},
  stage: {type: Sequelize.STRING, defaultValue: 0, comment: '阶段'},
  workload: {type: Sequelize.STRING, defaultValue: 0, comment: '工作量'},
  // parent_id: {type: Sequelize.INTEGER, defaultValue: 0, comment: '父级task_id'},采用code作为层级嵌套
  level: {type: Sequelize.INTEGER, comment: '层级'},
  pictures: {type: Sequelize.STRING, comment: '图片'},
  responsible_user_id: {type: Sequelize.INTEGER,},
  publish_user_id: {type: Sequelize.INTEGER,},

  enable: Sequelize.BOOLEAN,
}, {comment: '任务'});
// Task.hasOne(User, {foreignKey: 'responsible_user_id'});
Task.belongsTo(User, {foreignKey: 'responsible_user_id', as: 'responsibleUser'});
Task.belongsTo(User, {foreignKey: 'publish_user_id', as: 'publishUser'});


Task.belongsToMany(User, {through: TaskParticipators, as: 'participators'});
User.belongsToMany(Task, {through: TaskParticipators, as: 'participators'});

module.exports = Task;
