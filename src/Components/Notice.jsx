import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, DatePicker, message, Card, Space, Typography, Spin, Table, Modal, Popconfirm } from 'antd';
import { SendOutlined, BellOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';

const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;

const NoticeComponent = () => {
  const [form] = Form.useForm();
  const [noticeType, setNoticeType] = useState('custom');
  const [tenants, setTenants] = useState([]);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);

  useEffect(() => {
    fetchTenants();
    fetchNotices();
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

  const fetchNotices = async () => {
    try {
      const response = await axios.get('https://smart-hostel-management-json-server.onrender.com/notices');
      setNotices(response.data);
    } catch (error) {
      console.error('Error fetching notices:', error);
      message.error('Failed to fetch notices. Please try again later.');
    }
  };

  const onFinish = async (values) => {
    try {
      const newNotice = {
        ...values,
        createdAt: new Date().toISOString(),
        recipients: values.recipients.includes('all') 
          ? tenants.map(t => t.id) 
          : values.recipients,
      };
      await axios.post('https://smart-hostel-management-json-server.onrender.com/notices', newNotice);
      message.success('Notice sent successfully!');
      form.resetFields();
      fetchNotices();
    } catch (error) {
      console.error('Error sending notice:', error);
      message.error('Failed to send notice. Please try again.');
    }
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

  const deleteNotice = async (id) => {
    try {
      await axios.delete(`https://smart-hostel-management-json-server.onrender.com/notices/${id}`);
      message.success('Notice deleted successfully!');
      fetchNotices();
    } catch (error) {
      console.error('Error deleting notice:', error);
      message.error('Failed to delete notice. Please try again.');
    }
  };

  const showNoticeDetails = (notice) => {
    setSelectedNotice(notice);
    setVisible(true);
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Type',
      dataIndex: 'noticeType',
      key: 'noticeType',
    },
    {
      title: 'Sent At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => moment(date).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EyeOutlined />} onClick={() => showNoticeDetails(record)}>
            View
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this notice?"
            onConfirm={() => deleteNotice(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (loading) {
    return (
      <Card style={{ maxWidth: 600, margin: 'auto', marginTop: 20, textAlign: 'center' }}>
        <Spin size="large" />
        <p>Loading data...</p>
      </Card>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: 'auto', marginTop: 75 }}>
      <Card title={<Title level={3}><BellOutlined /> Create Notice</Title>}>
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
            <Button type="primary" htmlType="submit" icon={<SendOutlined />}>
              Send Notice
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title={<Title level={3}>Notice History</Title>} style={{ marginTop: 20 }}>
        <Table dataSource={notices} columns={columns} rowKey="id" />
      </Card>

      <Modal
        title="Notice Details"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        {selectedNotice && (
          <div>
            <p><strong>Title:</strong> {selectedNotice.title}</p>
            <p><strong>Type:</strong> {selectedNotice.noticeType}</p>
            <p><strong>Content:</strong> {selectedNotice.content}</p>
            <p><strong>Sent At:</strong> {moment(selectedNotice.createdAt).format('YYYY-MM-DD HH:mm:ss')}</p>
            <p><strong>Recipients:</strong> {selectedNotice.recipients.includes('all') ? 'All Tenants' : selectedNotice.recipients.join(', ')}</p>
            {selectedNotice.dueDate && <p><strong>Due Date:</strong> {moment(selectedNotice.dueDate).format('YYYY-MM-DD')}</p>}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default NoticeComponent;