/**
 * Created by eaTong on 2018/9/29 .
 * Description:
 */



const TaskService = require('../server/services/TaskService');

/*TaskService.addTask({
  emergency_level: 4,Task.findOne({where: {id}, include: [{model: TaskLog}]});
  draftId: '1',
  planStartDate: '2018-09-30',
  planEndDate: '2018-10-31',
  workload: 4,
  responsible_user_id: 1,
  title:'aaaaaa',

}, 1);*/
(async ()=>{
  const taskDetail = await TaskService.getStructuredTaskDetail('1');
  console.log(taskDetail.toJSON())
  console.log(taskDetail);
})();
