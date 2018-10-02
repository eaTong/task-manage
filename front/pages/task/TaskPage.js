/**
 * Created by eaTong on 2018-24-08 .
 * Description: auto generated in  2018-24-08
 */

import React, {Component} from 'react';
import {Button, message, Input, Tree, Progress, Icon} from 'antd';
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
  {title: '紧急程度', dataIndex: 'emergentLevel'},
  {title: '发布人', dataIndex: 'publishUser', render: item => item && item.name},
  {title: '责任人', dataIndex: 'responsibleUser', render: item => item && item.name},
  {title: '完成比例', dataIndex: 'completePercent'},
  {title: '计划开始日期', dataIndex: 'planStartDate'},
  {title: '计划结束日期', dataIndex: 'planEndDate'},
  {title: '实际开始日期', dataIndex: 'startDate'},
  {title: '实际结束日期', dataIndex: 'endDate'},
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
          <TreeNode title={this.getTreeNodeTitle(item)} key={item.id} detail={item}>
            {this.renderTreeNode(item.children)}
          </TreeNode>
        )
      } else {
        return <TreeNode title={this.getTreeNodeTitle(item)} key={item.id} detail={item}/>
      }
    })
  }

  onSaveTask(datas) {
    console.log(this.props.task);
    if (this.props.task.selectedTask) {
      datas.parentCode = this.props.task.selectedTask.code;
    }
    this.props.task.onSaveData(datas);
  }

  getTreeNodeTitle(node) {
    return (
      <div className="task-item">
        <div className="header-info">
          <div className="title" style={{color: emergentLevel[node.emergentLevel - 1].color}}>{node.title}</div>
          <Progress type="circle" percent={node.completePercent || 0} width={20}/>
        </div>
        <div className="main-info">
          <div className="info-item time">{`计划：${node.planStartDate } ~ ${node.planEndDate}`}</div>
          {node.responsibleUser && (
            <div className="info-item responsible-user">{`责任人：${node.responsibleUser.name}`}</div>
          )}
          <div className="info-item workload">{`工作量：${node.workload}`}</div>

        </div>
      </div>
    )
  }

  render() {
    const {dataList, operateType, showModal, selectedKeys, rowSelection, selectedTask} = this.props.task;
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
              showLine
              selectedKeys={selectedKeys}
              onSelect={(keys, {selectedNodes}) => this.props.task.onChangeSelection(keys, selectedNodes)}
              defaultExpandAll>
              {this.renderTreeNode(dataList)}
            </Tree>
          )}
        </div>
        {showModal && (
          <TaskModal
            onCancel={() => this.props.task.toggleModal()}
            onOk={(data) => this.onSaveTask(data)}
            operateType={operateType}
            formData={selectedTask}
          />
        )}
      </div>
    );
  }
}

TaskPage.propTypes = {};
export default TaskPage;
