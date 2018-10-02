/**
 * Created by eaTong on 2018-28-08 .
 * Description: auto generated in  2018-28-08
 */

const {Op} = require('sequelize');
const sequelize = require('../framework/database');
const {LogicError} = require('../framework/errors');
const BaseService = require('../framework/BaseService');
const Draft = require('../models/Draft');

class DraftService extends BaseService {

  static async addDraft(draft, userId) {
    draft.enable = true;
    draft.status = 0;
    draft.userId = userId;
    return await Draft.create(draft);
  }

  static async updateDrafts(data) {
    return await Draft.update(data, {where: {id: data.id}})
  }

  static async deleteDrafts(ids) {
    return await Draft.update({enable: false}, {where: {id: {[Op.in]: ids}}});
  }

  static async getDrafts(pageIndex = 0, pageSize = 20) {
    const option = {where: {enable: true}};
    const {dataValues: {total}} = await Draft.findOne({
      ...option,
      attributes: [[sequelize.fn('COUNT', '*'), 'total']]
    });
    const list = await Draft.findAll({offset: pageIndex * pageSize, limit: pageSize, ...option});
    return {total, list}
  }

  static async getDraftDetail(id) {
    return await Draft.findOne({where: {id}});
  }
  static async dropDraft(id) {
    return await Draft.findOne({where: {id}});
  }

  static async getMine(id) {
    return await Draft.findAll({where: {userId: id , enable:true}});
  }
}

module.exports = DraftService;
