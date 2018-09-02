/**
 * Created by eaTong on 2018-24-08 .
 * Description: auto generated in  2018-24-08
 */

import React, {Component} from 'react';
import {Button, message, Input, Tree, Progress} from 'antd';
import AgTable from '~/components/AgTable';
import TaskModal from "./TaskModal";
import {inject, observer} from "mobx-react";
import './task.less';
import {emergentLevel} from 'shared/enums';

const TreeNode = Tree.TreeNode;
const ButtonGroup = Button.Group;
const columns = [
  {title: '名称', dataIndex: 'title'},
  {title: '描述', dataIndex: 'description'},
  {title: '紧急程度', dataIndex: 'emergent_level'},
  {title: '重要程度', dataIndex: 'important_level'},
  {title: '发布人', dataIndex: 'publishUser', render: item => item && item.name},
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

  renderTreeNode(datas) {
    return datas.map(item => {
      if (item.children) {
        return (
          <TreeNode title={this.getTreeNodeTitle(item)} key={item.id}>
            {this.renderTreeNode(item.children)}
          </TreeNode>
        )
      } else {
        return <TreeNode title={this.getTreeNodeTitle(item)} key={item.id}/>
      }
    })
  }

  getTreeNodeTitle(node) {
    return (
      <div className="task-item">
        <div className="title" style={{color: emergentLevel[node.emergent_level - 1].color}}>{node.title}</div>
        <Progress type="circle" percent={node.complete_percent || 0} width={20}/>
      </div>
    )
  }

  render() {
    const {dataList, operateType, showModal, selectedKeys, rowSelection, firstSelected} = this.props.task;
    return (
      <div className="base-layout task-page">
        <header className="header">
          <div className="label">
            任务管理
          </div>
          <ButtonGroup className="buttons">
            <Button onClick={() => this.props.task.toggleModal('add')}>新建</Button>
            <Button onClick={() => this.props.task.toggleModal('edit')}
                    disabled={selectedKeys.length !== 1}>编辑</Button>
            <Button onClick={() => this.props.task.deleteData()} disabled={selectedKeys.length === 0}>删除</Button>
          </ButtonGroup>
        </header>
        <div className="content">
          {dataList.length > 0 && (
            <Tree
              selectedKeys={selectedKeys}
              onSelect={keys => this.props.task.onChangeSelection(keys)}
              defaultExpandAll>
              {this.renderTreeNode(dataList)}
            </Tree>
          )}
        </div>
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
