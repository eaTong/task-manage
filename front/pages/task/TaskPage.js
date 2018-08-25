/**
 * Created by eaTong on 2018-24-08 .
 * Description: auto generated in  2018-24-08
 */

import React, {Component} from 'react';
import {Button, message, Input} from 'antd';
import AgTable from '~/components/AgTable';
import TaskModal from "./TaskModal";
import {inject, observer} from "mobx-react";

const ButtonGroup = Button.Group;
const columns = [
  {title: '名称', dataIndex: 'title'},
  {title: '描述', dataIndex: 'description'},
  {title: '紧急程度', dataIndex: 'emergent_level'},
  {title: '重要程度', dataIndex: 'important_level'},
  {title: '责任人', dataIndex: 'responsibleUser', render: item => item && item.name},
  {title: '完成比例', dataIndex: 'complete_percent'},
  {title: '计划开始日期', dataIndex: 'plan_start_date'},
  {title: '计划结束日期', dataIndex: 'plan_end_date'},
  {title: '实际开始日期', dataIndex: 'start_date'},
  {title: '实际结束日期', dataIndex: 'end_date'},
];

@inject('task') @observer
class TaskPage extends Component {
  async componentDidMount() {
    await this.props.task.getDataList();
  }

  render() {
    const {dataList, operateType, showModal, selectedKeys, rowSelection, firstSelected} = this.props.task;
    return (
      <div className="base-layout task-page">
        <header className="header">
          <div className="label">
            任务管理
            <Input.Search
              className={'search'}
              placeholder={'输入关键字搜索'}
              onSearch={(val) => this.props.task.searchData(val)}
            />
          </div>
          <ButtonGroup className="buttons">
            <Button onClick={() => this.props.task.toggleModal('add')}>新建</Button>
            <Button onClick={() => this.props.task.toggleModal('edit')}
                    disabled={selectedKeys.length !== 1}>编辑</Button>
            <Button onClick={() => this.props.task.deleteData()} disabled={selectedKeys.length === 0}>删除</Button>
          </ButtonGroup>
        </header>
        <AgTable
          columns={columns}
          dataSource={dataList}
          rowKey="id"
          tableId="task-table"
          pagination={this.props.task.pagination}
          rowSelection={{
            selectedRowKeys: selectedKeys,
            onChange: (keys) => this.props.task.onChangeSelection(keys)
          }}/>
        {showModal && (
          <TaskModal
            onCancel={() => this.props.task.toggleModal()}
            onOk={(data) => this.props.task.onSaveData(data)}
            operateType={operateType}
            formData={firstSelected}
          />
        )}
      </div>
    );
  }
}

TaskPage.propTypes = {};
export default TaskPage;
