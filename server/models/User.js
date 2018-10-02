/**
 * Created by eatong on 18-2-11.
 */
const Sequelize = require('sequelize');
const sequelize = require('../framework/database');
const Role = require('./RoleModel');
const UserRole = require('./UserRole');

const User = sequelize.define('user', {
  account: {type: Sequelize.STRING, unique: true},
  password: Sequelize.STRING,
  name: Sequelize.STRING,
  positionType: Sequelize.STRING,
  openid: Sequelize.STRING,
  enable: Sequelize.BOOLEAN,
});

User.belongsToMany(Role, {through: UserRole});
Role.belongsToMany(User, {through: UserRole});

module.exports = User;
