
/**
 * Created by eaTong on 2018-23-06 .
 * Description: auto generated in  2018-23-06
 */

import {observable, action} from 'mobx';
import ajax from "~/util/ajaxUtil";
import BaseStore from '~/stores/BaseStore'
import {message} from "antd/lib/index";

export default class RoleStore extends BaseStore {
  listApi = '/api/role/get';
  addApi = '/api/role/add';
  updateApi = '/api/role/update';
  deleteApi = '/api/role/delete';
  detailApi = '/api/role/detail';

  @observable showGrantModal;

  @action toggleGrantModal() {
    this.showGrantModal = !this.showGrantModal;
  }


  @action
  async searchData(keywords) {
    this.queryOption = {keywords};
    this.pageIndex = 0;
    await this.getDataList();
  }

  @action
  async grantRole(opts) {
    const {success} = await ajax({data:opts, url: '/api/role/grant'});
    if (success) {
      this.selectedKeys= [];
      this.toggleGrantModal();
      message.success('授权成功');
      await this.getDataList();
    }
  }
}
