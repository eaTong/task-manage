/**
 * Created by eaTong on 2018/6/16 .
 * Description:
 */
import AppStore from './AppStore';
import UserStore from './UserStore';
import RoleStore from './RoleStore';
//UPDATE_TAG:importStore

export default {
  app: new AppStore(),
  user: new UserStore(),
  role: new RoleStore(),
//UPDATE_TAG:registerStore
}
