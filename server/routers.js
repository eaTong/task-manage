/**
 * Created by eatong on 18-2-8.
 */

const Router = require('koa-router');
const {checkArguments, checkLogin, structureData, insertLog} = require('./framework/middleWare');
const {ArgMissError, LogicError} = require('./framework/errors');

const FileApi = require('./apis/FileApi');
const UserApi = require('./apis/UserApi');
const RoleApi = require('./apis/RoleApi');
const MenuApi = require('./apis/MenuApi');
const TaskApi = require('./apis/TaskApi');
//UPDATE_TAG:importApi

const router = new Router();
//define data structure for all API
router.post('/api/*', checkLogin);
router.post('/api/*', structureData);

router.post('/api/user/login', insertLog('login'), checkArguments(['account', 'password']), UserApi.login);
router.post('/api/user/loginByCode', insertLog('login'), checkArguments(['code']), UserApi.loginByCode);
router.post('/api/user/bind', insertLog('bind'), checkArguments(['account' , 'password']), UserApi.bindUser);

router.post('/api/image/upload', FileApi.uploadImage);

router.post('/api/menu/get', MenuApi.getMenus);
router.post('/api/menu/authorised', MenuApi.getAuthorisedMenu);

router.post('/api/role/add', insertLog('add'), checkArguments(['name']), RoleApi.addRole);
router.post('/api/role/get', RoleApi.getRoles);
router.post('/api/role/update', insertLog('update'), checkArguments(['id', 'name']), RoleApi.updateRoles);
router.post('/api/role/delete', insertLog('delete'), checkArguments(['ids']), RoleApi.deleteRoles);
router.post('/api/role/grant', insertLog('grant'), checkArguments(['roleId', 'menus']), RoleApi.grantMenus);

router.post('/api/user/add', insertLog('add'), checkArguments(['account', 'name']), UserApi.addUser);
router.post('/api/user/get', UserApi.getUsers);
router.post('/api/user/update', insertLog('update'), checkArguments(['id', 'account', 'name']), UserApi.updateUsers);
router.post('/api/user/delete', insertLog('delete'), checkArguments(['ids']), UserApi.deleteUsers);
router.post('/api/user/logout', insertLog('login'), UserApi.logout);
router.post('/api/user/grant', insertLog('grant'), checkArguments(['userId', 'roles']), UserApi.grantRole);


router.post('/api/task/add', insertLog('add'), checkArguments(['title', 'plan_start_date', 'plan_end_date']), TaskApi.addTask);
router.post('/api/task/add/draft', insertLog('add'), checkArguments(['title']), TaskApi.addTaskDraft);
router.post('/api/task/get', TaskApi.getTasks);
router.post('/api/task/update', insertLog('update'), checkArguments(['id', 'title']), TaskApi.updateTasks);
router.post('/api/task/delete', insertLog('delete'), checkArguments(['ids']), TaskApi.deleteTasks);
router.post('/api/task/detail', checkArguments(['id']), TaskApi.getTaskDetail);
router.post('/api/task/mine', TaskApi.getMyTasks);
//UPDATE_TAG:defineRouter

router.post('/api/*', async ctx => {
  ctx.status = 404;
  ctx.body = 'api not found';
});

module.exports = router;
