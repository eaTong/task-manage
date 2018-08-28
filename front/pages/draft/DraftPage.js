
/**
 * Created by eaTong on 2018-28-08 .
 * Description: auto generated in  2018-28-08
 */

import React, {Component} from 'react';
import {Button, message ,Input} from 'antd';
import AgTable from '~/components/AgTable';
import DraftModal from "./DraftModal";
import {inject, observer} from "mobx-react";

const ButtonGroup = Button.Group;
const columns = [
  {title: '标题', dataIndex: 'title'},
];

@inject('draft') @observer
class DraftPage extends Component {
  async componentDidMount() {
    await this.props.draft.getDataList();
  }

  render() {
    const {dataList, operateType, showModal, selectedKeys, rowSelection, firstSelected} = this.props.draft;
    return (
      <div className="base-layout draft-page">
        <header className="header">
          <div className="label">
            草稿管理
            <Input.Search
              className={'search'}
              placeholder={'输入关键字搜索'}
              onSearch={(val) => this.props.draft.searchData(val)}
            />
          </div>
          <ButtonGroup className="buttons">
            <Button onClick={() => this.props.draft.toggleModal('add')}>新建</Button>
            <Button onClick={() => this.props.draft.toggleModal('edit')}
                    disabled={selectedKeys.length !== 1}>编辑</Button>
            <Button onClick={() => this.props.draft.deleteData()} disabled={selectedKeys.length === 0}>删除</Button>
          </ButtonGroup>
        </header>
        <AgTable
          columns={columns}
          dataSource={dataList}
          rowKey="id"
          tableId="draft-table"
          pagination={this.props.draft.pagination}
          rowSelection={{
            selectedRowKeys: selectedKeys,
            onChange: (keys) => this.props.draft.onChangeSelection(keys)
          }}/>
        {showModal && (
          <DraftModal
            onCancel={() => this.props.draft.toggleModal()}
            onOk={(data) => this.props.draft.onSaveData(data)}
            operateType={operateType}
            formData={firstSelected}
          />
        )}
      </div>
    );
  }
}

DraftPage.propTypes = {};
export default DraftPage;
