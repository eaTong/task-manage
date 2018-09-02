/**
 * Created by eaTong on 2018/9/2 .
 * Description:
 */
const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const TaskParticipators = sequelize.define('task_participator', {}, {timestamps: false,});

module.exports = TaskParticipators;
