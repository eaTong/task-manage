/**
 * Created by eaTong on 2018-24-08 .
 * Description: auto generated in  2018-24-08
 */


const {Op} = require('sequelize');
const sequelize = require('../framework/database');
const {LogicError} = require('../framework/errors');
const BaseService = require('../framework/BaseService');
const CodeService = require('./CodeService');
const Task = require('../models/Task');
const Draft = require('../models/Draft');
const User = require('../models/User');
const TaskLog = require('../models/TaskLog');
const TaskParticipators = require('../models/TaskParticipators');

class TaskService extends BaseService {

  static async addTask(task, userId) {
    task.enable = true;
    task.publishUserId = userId;
    task.responsibleUserId = ~~task.responsibleUserId || userId;
    task.pictures = JSON.stringify(task.pictures);
    //如果是子项目，code前缀为父任务的code， 另外需要将所有父层项目加入责任人
    if (task.parentCode) {
      //查询父层code ，并根据父层code获取所有父层code
      task.code = await CodeService.generateCode(task.parentCode);
      let prefix = task.parentCode.replace(/_.*/, '');
      const codeArr = task.parentCode.split('_');
      const parentCodes = [];
      for (let i = 1; i < codeArr.length; i++) {
        prefix += '_' + codeArr[i];
        parentCodes.push(prefix);
      }
      const allParentTasks = await Task.findAll({where: {code: {[Op.in]: parentCodes}}});
      const parentsTaskParticipatorIds = allParentTasks.map(item => item.id);
      const responsibleUser = await User.findById(task.responsibleUserId);
      responsibleUser.addParticipators(parentsTaskParticipatorIds);
      await responsibleUser.save();

    } else {
      task.code = await CodeService.generateCode('task');
    }
    if (task.draftId) {
      await Draft.update({status: 1}, {where: {id: task.draftId}});
    }

    const taskParticipators = Array.from(new Set([task.publishUserId, task.responsibleUserId]));
    const taskModel = await Task.create(task);
    taskModel.addParticipators(taskParticipators);
    await taskModel.save();
    return taskModel;
  }

  static async updateTasks(task) {
    task.pictures = JSON.stringify(task.pictures);
    return await Task.update(task, {where: {id: task.id}})
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
    return await Task.findAll({
      include: [
        {model: User, as: 'responsibleUser', where: {id}},
        {model: User, as: 'publishUser'},
        {model: User, as: 'participators'}
      ],
      where: {completePercent: {[completed ? Op.eq : Op.ne]: 100}},
      order: [['createdAt', 'DESC']]
    });
  }

  static async getMyTasksForOverview(id, completed) {
    const myTasks = await Task.findAll({
      include: [
        {model: User, as: 'responsibleUser'},
        {model: User, as: 'publishUser'},
        {model: User, as: 'participators', where: {id}}
      ],
      where: {completePercent: {[completed ? Op.eq : Op.ne]: 100}},
      order: [['code', 'DESC']]
    });
    return structureTaskTree(myTasks);
  }

  static async getStructuredTaskDetail(id) {
    const task = await Task.findOne({where: {id}});
    if (task) {
      const allTasks = await Task.findAll({
        where: {code: {[Op.like]:`${ task.code}%`}},
        include: [{model: TaskLog}],
        order: [['code', 'DESC']]
      });
      const taskLogs = [];
      allTasks.forEach((task)=>{
        task.taskLogs.forEach(log =>{
          taskLogs.push({...log.dataValues , task:task.dataValues});
        });
      });
      return {
        taskLogs,
        tasks:structureTaskTree(allTasks),
      }
    } else {
      throw new LogicError('ID 不合法或数据已被删除');
    }
  }
}

function structureTaskTree(myTasks) {
  const taskMapping = {};
  myTasks.forEach(item => {
    item = item.toJSON();
    item.pictures = item.pictures ? JSON.parse(item.pictures) : [];
    //如果mapping中有当前code为key的值，说明已经循环完当前的子项了，那么将所有子项的key删除，避免二次计算（code肯定是唯一的）
    if (taskMapping[item.code]) {
      item = {...item, children: taskMapping[item.code]};
    }
    const parentCode = item.code.slice(0, item.code.lastIndexOf('_'));
    //将当前节点push到父层节点上
    taskMapping[parentCode] = taskMapping[parentCode] || [];
    taskMapping[parentCode].push(item);
    delete taskMapping[item.code];

  });
  const myTasksTree = [];
  for (let key in taskMapping) {
    if (Object.keys(taskMapping[key])) {
      myTasksTree.push(...taskMapping[key])
    }
  }
  return myTasksTree;
}

module.exports = TaskService;
