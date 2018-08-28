
/**
 * Created by eaTong on 2018-28-08 .
 * Description: auto generated in  2018-28-08
 */

import {observable, action} from 'mobx';
import ajax from "~/util/ajaxUtil";
import BaseStore from '~/stores/BaseStore'

export default class DraftStore extends BaseStore {
  listApi = '/api/draft/get';
  addApi = '/api/draft/add';
  updateApi = '/api/draft/update';
  deleteApi = '/api/draft/delete';
  detailApi = '/api/draft/detail';
  
  @action
  async searchData(keywords) {
    this.queryOption = {keywords};
    this.pageIndex = 0;
    await this.getDataList();
  }
}