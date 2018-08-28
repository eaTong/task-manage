/**
 * Created by eaTong on 2018/6/16 .
 * Description:
 */
import AppStore from './AppStore';
import UserStore from './UserStore';
import RoleStore from './RoleStore';
import TaskStore from './TaskStore';
import DraftStore from './DraftStore';
//UPDATE_TAG:importStore

export default {
  app: new AppStore(),
  user: new UserStore(),
  role: new RoleStore(),
task: new TaskStore(),
draft: new DraftStore(),
//UPDATE_TAG:registerStore
}
