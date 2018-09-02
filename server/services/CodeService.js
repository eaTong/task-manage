/**
 * Created by eaTong on 2018/9/2 .
 * Description:
 */
const {Op} = require('sequelize');

const BaseService = require('../framework/BaseService');
const Code = require('../models/Code');

class CodeService extends BaseService {
  static async generateCode(type) {
    const maxCode = Code.findOne({type});
    let code, commit;
    if (maxCode) {
      code = maxCode.max;
      commit = Code.update({max: maxCode.max + 1}, {where: {type}});
    } else {
      code = '001';
      Code.insert({type, max: 1});
    }
    return {
      type: `${type}_${code}`, commit
    }
  }
}


(async () => {
  const {type  , commit} = await CodeService.generateCode('test');
  console.log(type , commit);
})();


module.exports = CodeService;
