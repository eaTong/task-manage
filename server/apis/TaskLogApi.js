
/**
 * Created by eaTong on 2018-05-10 .
 * Description: auto generated in  2018-05-10
 */

const {LogicError} = require("../framework/errors");
const TaskLogService = require('../services/TaskLogService');
const BaseApi = require('../framework/BaseApi');


class TaskLogApi extends BaseApi {
  static async addTaskLog(ctx) {
    return await TaskLogService.addTaskLog(ctx.request.body);
  }

  static async updateTaskLogs(ctx) {
    return await TaskLogService.updateTaskLogs(ctx.request.body);
  }

  static async deleteTaskLogs(ctx) {
    return await TaskLogService.deleteTaskLogs(ctx.request.body.ids);
  }

  static async getTaskLogs(ctx) {
    const {pageIndex = 0, pageSize = 20} = ctx.request.body;
    return await TaskLogService.getTaskLogs(pageIndex, pageSize);
  }

  static async getTaskLogDetail(ctx) {
    return await TaskLogService.getTaskLogDetail(ctx.request.body);
  }

}

module.exports = TaskLogApi;
  