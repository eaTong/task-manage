/**
 * Created by eaTong on 2018/9/29 .
 * Description:
 */



const TaskService = require('../server/services/TaskService');

TaskService.addTask({
  emergency_level: 4,
  draftId: '1',
  plan_start_date: '2018-09-30',
  plan_end_date: '2018-10-31',
  workload: 4,
  responsible_user_id: 1,
  title:'aaaaaa',

}, 1);
