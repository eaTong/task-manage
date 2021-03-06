/**
 * Created by eaTong on 2018-24-08 .
 * Description: auto generated in  2018-24-08
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal, Form, Input, message, Slider, DatePicker, Select , InputNumber} from 'antd';
import ImageUploader from "~/components/ImageUploader";
import {emergentLevel, importantLevel} from 'shared/enums';
import ajax from '~/util/ajaxUtil';
import moment from 'moment'

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const TextArea = Input.TextArea;
const Option = Select.Option;
const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 6},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 14},
  },
};

class TaskModal extends Component {
  state = {
    users: []
  };

  async componentDidMount() {
    if (this.props.operateType === 'edit') {
      const formData = this.props.formData;
      this.props.form.setFieldsValue({
        ...formData,
        responsibleUserId: formData.responsibleUserId + '',
        plan: [moment(formData.planStartDate), moment(formData.planEndDate)]
      });
    }
    const {data} = await ajax({url: '/api/user/get'});
    this.setState({users: data});
  }

  onSaveData() {
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      this.props.onOk && this.props.onOk({...values, planStartDate: values.plan[0], planEndDate: values.plan[1]});
    });
  }

  render() {
    const {operateType} = this.props;
    const {getFieldDecorator} = this.props.form;
    return (
      <Modal title={(operateType === 'add' ? '新增' : '编辑') + '任务'}
             maskClosable={false}
             visible={true} onOk={this.onSaveData.bind(this)} onCancel={this.props.onCancel}>
        <Form>
          <FormItem
            {...formItemLayout}
            label="名称"
          >
            {getFieldDecorator('title', {
              rules: [{
                required: true, message: '请填写名称!',
              }],
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="紧急程度">
            {getFieldDecorator('emergentLevel', {initialValue: 3})(
              <Slider max={emergentLevel.length} min={1}/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="工作量">
            {getFieldDecorator('workload')(
              <InputNumber min={0}/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="责任人">
            {getFieldDecorator('responsibleUserId', {
              rules: [{
                required: true, message: '请选择责任人!',
              }],
            })(
              <Select>{this.state.users.map(user => <Option key={user.id + ''}>{user.name}</Option>)}</Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="时间计划">
            {getFieldDecorator('plan', {
              rules: [{
                required: true, message: '请填写时间计划!',
              }],
            })(
              <RangePicker/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="描述">
            {getFieldDecorator('description')(
              <TextArea autosize={{minRows: 3}}/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="相关图片">
            {getFieldDecorator('pictures')(
              <ImageUploader/>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

TaskModal.propTypes = {
  operateType: PropTypes.string,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  formData: PropTypes.object
};
TaskModal = Form.create()(TaskModal);
export default TaskModal;
