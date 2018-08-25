/**
 * Created by eatong on 18-2-10.
 */
const md5 = require('crypto-js/md5');
const {Op} = require('sequelize');
const {LogicError} = require('../framework/errors');
const BaseService = require('../framework/BaseService');
const User = require('../models/User');
const Role = require('../models/RoleModel');
const axios = require("axios");
const {miniProgram} = require('../../shared/config');

class UserService extends BaseService {

  static async addUser(user) {
    const usr = await User.findOne({where: {account: user.account}});
    if (usr) {
      throw new LogicError(`账号(${user.account})已存在`);
    }
    user.password = md5(user.password).toString();
    user.enable = true;
    return await User.create(user);
  }

  static async updateUsers(data) {
    const usr = await User.findOne({where: {account: data.account, id: {[Op.ne]: data.id}}});
    if (usr) {
      throw new LogicError(`账号(${data.account})已存在`);
    }
    // return await User.findAll();
    return await User.update(data, {where: {id: data.id}})
  }

  static async deleteUsers(ids) {
    return await User.update({enable: false}, {where: {id: {[Op.in]: ids}}});
  }

  static async getUsers() {
    return await User.findAll({attributes: ['id', 'name', 'account'], where: {enable: true}, include: [{model: Role}]});
  }

  static async grantRole(data) {
    const user = await User.findById(data.userId);
    user.setRoles(data.roles);
    return await user.save();
  }

  static async login({account, password}) {
    return await User.findOne({
      attributes: ['id', 'name', 'account'],
      where: {account, enable: true, password: md5(password).toString()}
    });
  }

  static async loginByCode(code) {
    const {data} = await axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${miniProgram.appKey}\
&secret=${miniProgram.appSecret}&js_code=${code}&grant_type=authorization_code`);
    const result = {};
    result.user = await User.findOne({
      attributes: ['id', 'name', 'account'],
      where: {openid: data.openid, enable: true,}
    });
    result.openid = data.openid;
    return result;
  }

  static async bindUser({openid, account, password}) {
    const user = await User.findOne({
      attributes: ['id', 'name', 'account'],
      where: {account, enable: true, password: md5(password).toString()}
    });
    if (!user) {
      return;
    }
    user.openid = openid;
    await user.save();
    return user;
  }


}

module.exports = UserService;
//        ouU8Q5Y5--NguTCLGyC6ZYGeHKOI
