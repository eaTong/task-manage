/**
 * Created by eaTong on 2018-24-08 .
 * Description: auto generated in  2018-24-08
 */

import {observable, action, toJS} from 'mobx';
import ajax from "~/util/ajaxUtil";
import BaseStore from '~/stores/BaseStore'
import {message} from "antd/lib/index";

export default class TaskStore extends BaseStore {
  listApi = '/api/task/mine';
  addApi = '/api/task/add';
  updateApi = '/api/task/update';
  deleteApi = '/api/task/delete';
  detailApi = '/api/task/detail';

  @observable selectedTask = {};

  @action
  async onSaveData(formData) {
    if (this.operateType === 'add') {
      if(this.selectedTask){
        formData.parentCode = this.selectedTask.code;
      }
      const {success} = await ajax({url: this.addApi, data: formData});
      if (success) {
        message.success('新增成功');
        this.toggleModal();
        await this.getDataList();
      }
    } else {
      const {success} = await ajax({url: this.updateApi, data: {id: this.getKey(this.selectedTask), ...formData}});
      if (success) {
        message.success('编辑成功');
        this.toggleModal();
        await this.getDataList();
      }
    }
  }

  @action onChangeSelection(selectedKeys, selectedNodes) {
    console.log(selectedNodes);
    this.selectedKeys = [...selectedKeys];
    if (selectedNodes.length > 0) {
      this.selectedTask = toJS(selectedNodes[0].props.detail);
    } else {
      this.selectedTask = null;
    }
  }
}
