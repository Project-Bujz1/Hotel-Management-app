import React from 'react';
import { Form, Input, Button } from 'antd';
import { LockOutlined } from '@ant-design/icons';

const ChangePassword = () => {
  const onFinish = (values) => {
    console.log('Password change request:', values);
    // Handle password change logic here
  };

  return (
    <Form
      name="change_password"
      onFinish={onFinish}
      style={{ maxWidth: 300, margin: 'auto', marginTop: "75px" }}
    >
      <Form.Item
        name="oldPassword"
        rules={[{ required: true, message: 'Please input your old password!' }]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Old Password" />
      </Form.Item>
      <Form.Item
        name="newPassword"
        rules={[{ required: true, message: 'Please input your new password!' }]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="New Password" />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        rules={[{ required: true, message: 'Please confirm your new password!' }]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Confirm New Password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Change Password
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ChangePassword;
