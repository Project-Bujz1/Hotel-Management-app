import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, DatePicker, message, Card, Space, Typography, Spin } from 'antd';
import { SendOutlined, BellOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;

const NoticeComponent = () => {
  const [form] = Form.useForm();
  const [noticeType, setNoticeType] = useState('custom');
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      const response = await axios.get('https://smart-hostel-management-json-server.onrender.com/tenants');
      setTenants(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tenants:', error);
      message.error('Failed to fetch tenants. Please try again later.');
      setLoading(false);
    }
  };

  const onFinish = (values) => {
    console.log('Notice values:', values);
    message.success('Notice sent successfully!');
    form.resetFields();
  };

  const handleNoticeTypeChange = (value) => {
    setNoticeType(value);
    if (value === 'rentDue') {
      form.setFieldsValue({
        title: 'Rent Due Notice',
        content: 'This is a reminder that your rent is due. Please make the payment as soon as possible.',
      });
    } else if (value === 'holiday') {
      form.setFieldsValue({
        title: 'Holiday Alert',
        content: 'We hope you enjoy the upcoming holiday!',
      });
    } else {
      form.setFieldsValue({
        title: '',
        content: '',
      });
    }
  };

  if (loading) {
    return (
      <Card style={{ maxWidth: 600, margin: 'auto', marginTop: 20, textAlign: 'center' }}>
        <Spin size="large" />
        <p>Loading tenants...</p>
      </Card>
    );
  }

  return (
    <Card
      title={<Title level={3}><BellOutlined /> Create Notice</Title>}
      style={{ maxWidth: 600, margin: 'auto', marginTop: 75 }}
    >
      <Form form={form} name="notice_form" onFinish={onFinish} layout="vertical">
        <Form.Item name="noticeType" label="Notice Type" rules={[{ required: true }]}>
          <Select onChange={handleNoticeTypeChange}>
            <Option value="custom">Custom</Option>
            <Option value="rentDue">Rent Due</Option>
            <Option value="holiday">Holiday Alert</Option>
          </Select>
        </Form.Item>

        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="content" label="Content" rules={[{ required: true }]}>
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item name="dueDate" label="Due Date (if applicable)">
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="recipients" label="Recipients" rules={[{ required: true }]}>
          <Select mode="multiple" placeholder="Select recipients">
            <Option value="all">All Tenants</Option>
            {tenants.map((tenant) => (
              <Option key={tenant.id} value={tenant.id}>
                {tenant.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" icon={<SendOutlined />}>
              Send Notice
            </Button>
            <Button onClick={() => form.resetFields()}>Reset</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default NoticeComponent;