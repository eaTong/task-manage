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
  emergentLevel: {type: Sequelize.INTEGER, comment: '紧急程度'},
  completePercent: {type: Sequelize.INTEGER, defaultValue: 0, comment: '完成比例'},
  planStartDate: {type: Sequelize.DATEONLY, comment: '计划开始日期'},
  planEndDate: {type: Sequelize.DATEONLY, comment: '计划结束日期'},
  startDate: {type: Sequelize.DATEONLY, comment: '开始日期'},
  endDate: {type: Sequelize.DATEONLY, comment: '结束日期'},
  workload: {type: Sequelize.INTEGER, defaultValue: 0, comment: '工作量'},
  level: {type: Sequelize.INTEGER, comment: '层级'},
  pictures: {type: Sequelize.STRING, comment: '图片'},
  responsibleUserId: {type: Sequelize.INTEGER,},
  publishUserId: {type: Sequelize.INTEGER,},

  enable: Sequelize.BOOLEAN,
}, {comment: '任务'});
// Task.hasOne(User, {foreignKey: 'responsibleUserId'});
Task.belongsTo(User, {foreignKey: 'responsibleUserId', as: 'responsibleUser'});
Task.belongsTo(User, {foreignKey: 'publishUserId', as: 'publishUser'});


Task.belongsToMany(User, {through: TaskParticipators, as: 'participators'});
User.belongsToMany(Task, {through: TaskParticipators, as: 'participators'});

module.exports = Task;
