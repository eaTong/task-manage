/**
 * Created by eaTong on 2018-05-10 .
 * Description: auto generated in  2018-05-10
 */

const {Op} = require('sequelize');
const sequelize = require('../framework/database');
const {LogicError} = require('../framework/errors');
const BaseService = require('../framework/BaseService');
const TaskLog = require('../models/TaskLog');
const Task = require('../models/Task');

class TaskLogService extends BaseService {

  static async addTaskLog(taskLog) {
    const task = await Task.findOne({where: {id: taskLog.taskId}, include: [{model: TaskLog}]});
    if (task) {
      taskLog.beforePercent = task.completePercent;
      task.completePercent = taskLog.afterPercent;
      task.startDate = task.startDate || new Date();
      if (task.completePercent) {
        task.endDate = new Date();
      }
      if (taskLog.afterPercent === 100) {
        // 未开始自动开始
        Task.update({startDate: new Date()}, {
          where: {
            code: {
              [Op.like]: `${task.code}_%`,
            },
            startDate: {[Op.eq]: null}
          }
        });

        // 未完成自动完成
        Task.update({completePercent: 100, endDate: new Date()}, {
          where: {
            code: {
              [Op.like]: `${task.code}_%`,
            },
            completePercent: {[Op.ne]: 100}
          }
        })
      }else{
        task.endDate = null;
        task.startDate = task.completePercent === 0?null:task.startDate;
      }
      await task.save();
    } else {
      throw new LogicError('任务不存在');
    }
    return await TaskLog.create(taskLog);
  }

  static async updateTaskLogs(data) {
    return await TaskLog.update(data, {where: {id: data.id}})
  }

  static async deleteTaskLogs(ids) {
    return await TaskLog.update({enable: false}, {where: {id: {[Op.in]: ids}}});
  }

  static async getTaskLogs(pageIndex = 0, pageSize = 20) {
    const option = {where: {enable: true}};
    const {dataValues: {total}} = await TaskLog.findOne({
      ...option,
      attributes: [[sequelize.fn('COUNT', '*'), 'total']]
    });
    const list = await TaskLog.findAll({offset: pageIndex * pageSize, limit: pageSize, ...option});
    return {total, list}
  }

  static async getTaskLogDetail(id) {
    return await TaskLog.findOne({where: {id}});
  }
}

module.exports = TaskLogService;
