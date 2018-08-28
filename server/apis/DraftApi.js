
/**
 * Created by eaTong on 2018-28-08 .
 * Description: auto generated in  2018-28-08
 */

const {LogicError} = require("../framework/errors");
const DraftService = require('../services/DraftService');
const BaseApi = require('../framework/BaseApi');


class DraftApi extends BaseApi {
  static async addDraft(ctx) {
    return await DraftService.addDraft(ctx.request.body);
  }

  static async updateDrafts(ctx) {
    return await DraftService.updateDrafts(ctx.request.body);
  }

  static async deleteDrafts(ctx) {
    return await DraftService.deleteDrafts(ctx.request.body.ids);
  }

  static async getDrafts(ctx) {
    const {pageIndex = 0, pageSize = 20} = ctx.request.body;
    return await DraftService.getDrafts(pageIndex, pageSize);
  }

  static async getDraftDetail(ctx) {
    return await DraftService.getDraftDetail(ctx.request.body);
  }

}

module.exports = DraftApi;
  