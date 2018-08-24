
/**
 * Created by eaTong on 2018-24-08 .
 * Description: auto generated in  2018-24-08
 */

import {observable, action} from 'mobx';
import ajax from "~/util/ajaxUtil";
import BaseStore from '~/stores/BaseStore'

export default class TaskStore extends BaseStore {
  listApi = '/api/task/get';
  addApi = '/api/task/add';
  updateApi = '/api/task/update';
  deleteApi = '/api/task/delete';
  detailApi = '/api/task/detail';
  
  @action
  async searchData(keywords) {
    this.queryOption = {keywords};
    this.pageIndex = 0;
    await this.getDataList();
  }
}