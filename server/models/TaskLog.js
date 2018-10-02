/**
 * Created by eaTong on 2018-24-08 .
 * Description: auto generated in  2018-24-08
 */

const Sequelize = require('sequelize');
const sequelize = require('../framework/database');
const Task = require('./Task');

const TaskLog = sequelize.define('taskLog', {
  content: {type: Sequelize.STRING, comment: '正文'},
  beforePercent: {type: Sequelize.INTEGER, comment: '开始比例'},
  afterPercent: {type: Sequelize.INTEGER, comment: '结束比例'},
});

Task.hasMany(TaskLog, {foreignKey: 'taskId'});
TaskLog.belongsTo(Task, {foreignKey: 'taskId'});
module.exports = TaskLog;
