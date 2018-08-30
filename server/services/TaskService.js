/**
 * Created by eaTong on 2018-24-08 .
 * Description: auto generated in  2018-24-08
 */

const {Op} = require('sequelize');
const sequelize = require('../framework/database');
const {LogicError} = require('../framework/errors');
const BaseService = require('../framework/BaseService');
const Task = require('../models/Task');
const Draft = require('../models/Draft');
const User = require('../models/User');
const TaskLog = require('../models/TaskLog');

class TaskService extends BaseService {

  static async addTask(task, userId) {
    task.enable = true;
    task.publish_user_id = userId;
    task.response_user_id = task.response_user_id || userId;
    if (task.draftId) {
      await Draft.update({status: 1}, {id: task.draftId});
    }
    return await Task.create(task);
  }

  static async updateTasks(data) {
    return await Task.update(data, {where: {id: data.id}})
  }

  static async deleteTasks(ids) {
    return await Task.update({enable: false}, {where: {id: {[Op.in]: ids}}});
  }

  static async getTasks(pageIndex = 0, pageSize = 20) {
    const option = {where: {enable: true}};
    const {dataValues: {total}} = await Task.findOne({
      ...option,
      attributes: [[sequelize.fn('COUNT', '*'), 'total']],
    });
    const list = await Task.findAll({
      ...option,
      offset: pageIndex * pageSize,
      limit: pageSize,
      include: [
        {model: User, as: 'responsibleUser'},
        {model: User, as: 'publishUser'},
      ]
    });
    return {total, list}
  }

  static async getTaskDetail(id) {
    return await Task.findOne({where: {id}, include: [{model: TaskLog}]});
  }

  static async getMyTasks(id, completed) {
    return await Task.findAll({where: {responsible_user_id: id, complete_percent: {[completed ? Op.ne : Op.eq]: 100}}});
  }
}

module.exports = TaskService;
