/**
 * Created by eaTong on 2018/9/29 .
 * Description:
 */



const TaskLogService = require('../server/services/TaskLogService');

(async ()=>{
  console.log(await TaskLogService.addTaskLog({taskId:1,content:'aaaaaa',afterPercent:70}))
})();
