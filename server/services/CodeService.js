/**
 * Created by eaTong on 2018/9/2 .
 * Description:
 */
const {Op} = require('sequelize');

const BaseService = require('../framework/BaseService');
const Code = require('../models/Code');

class CodeService extends BaseService {
  static async generateCode(type) {
    const pad = '000';
    const maxCode = await Code.findOne({where: {type}});
    let code, commit;
    if (maxCode) {
      code = maxCode.max + 1;
      await Code.update({max: maxCode.max + 1}, {where: {type}});
    } else {
      code = 1;
      Code.create({type, max: 1});
    }
    return `${type}_${code > 999 ? code : `${pad.substring(0, pad.length - String(code).length)}${code}`}`

  }
}

module.exports = CodeService;
