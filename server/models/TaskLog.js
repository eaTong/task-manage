/**
 * Created by eaTong on 2018-24-08 .
 * Description: auto generated in  2018-24-08
 */

const Sequelize = require('sequelize');
const sequelize = require('../framework/database');
const Task = require('./Task');

const TaskLog = sequelize.define('task_log', {
  content: {type: Sequelize.STRING, comment: '正文'},
  before_percent: {type: Sequelize.INTEGER, comment: '开始比例'},
  after_percent: {type: Sequelize.INTEGER, comment: '结束比例'},
});

Task.hasMany(TaskLog, {foreignKey: 'task_id'});
TaskLog.belongsTo(Task, {foreignKey: 'task_id'});
module.exports = TaskLog;
