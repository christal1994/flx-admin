import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd';
import city from 'client/utils/city';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const modal = ({
  item = {},
  onOk,
  form: { getFieldDecorator, validateFields, getFieldsValue },
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return;
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      };
      onOk(data);
    });
  };

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  };

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="Username" hasFeedback {...formItemLayout}>
          {getFieldDecorator('username', {
            initialValue: item.username,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="Birthday" hasFeedback {...formItemLayout}>
          {getFieldDecorator('birth', {
            initialValue: item.birth,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="Gender" hasFeedback {...formItemLayout}>
          {getFieldDecorator('gender', {
            initialValue: item.gender,
            rules: [
              {
                required: true,
              },
            ],
          })(
            <Radio.Group>
              <Radio value={0}>男</Radio>
              <Radio value={1}>女</Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem label="Avatar" hasFeedback {...formItemLayout}>
          {getFieldDecorator('image_url', {
            initialValue: item.image_url,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="Introduce" hasFeedback {...formItemLayout}>
          {getFieldDecorator('introduce', {
            initialValue: item.introduce,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="State" hasFeedback {...formItemLayout}>
          {getFieldDecorator('state', {
            initialValue: item.state,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
      </Form>
    </Modal>
  );
};

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
};

export default Form.create()(modal);
