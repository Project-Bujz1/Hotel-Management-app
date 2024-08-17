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
  const [isFreeTrial, setIsFreeTrial] = useState(false);

  useEffect(() => {
    // Check if the user is on a free trial
    const freeTrialStatus = localStorage.getItem('isFreeTrial') === 'true';
    setIsFreeTrial(freeTrialStatus);

    if (freeTrialStatus) {
      // message.warning('You have no access. Please upgrade.');
      setLoading(false); // Set loading to false to prevent the rest of the content from rendering
    } else {
      // Fetch data if not on free trial
      fetchData('tenants', setTenants);
      fetchData('notices', setNotices);
    }
  }, []);

  const fetchData = async (endpoint, setState) => {
    try {
      const response = await axios.get(`https://smart-hostel-management-json-server.onrender.com/${endpoint}`);
      setState(response.data);
      setLoading(false);
    } catch (error) {
      handleError(`Failed to fetch ${endpoint}. Please try again later.`);
    }
  };

  const handleError = (messageText) => {
    console.error(messageText);
    message.error(messageText);
    setLoading(false);
  };

  const onFinish = async (values) => {
    try {
      const newNotice = {
        ...values,
        createdAt: new Date().toISOString(),
        recipients: values.recipients.includes('all') ? tenants.map(t => t.id) : values.recipients,
      };
      await axios.post('https://smart-hostel-management-json-server.onrender.com/notices', newNotice);
      message.success('Notice sent successfully!');
      form.resetFields();
      fetchData('notices', setNotices);
    } catch (error) {
      handleError('Failed to send notice. Please try again.');
    }
  };

  const handleNoticeTypeChange = (value) => {
    setNoticeType(value);
    form.setFieldsValue(getNoticeTemplate(value));
  };

  const getNoticeTemplate = (type) => {
    switch (type) {
      case 'rentDue':
        return {
          title: 'Rent Due Notice',
          content: 'This is a reminder that your rent is due. Please make the payment as soon as possible.',
        };
      case 'holiday':
        return {
          title: 'Holiday Alert',
          content: 'We hope you enjoy the upcoming holiday!',
        };
      default:
        return { title: '', content: '' };
    }
  };

  const deleteNotice = async (id) => {
    try {
      await axios.delete(`https://smart-hostel-management-json-server.onrender.com/notices/${id}`);
      message.success('Notice deleted successfully!');
      fetchData('notices', setNotices);
    } catch (error) {
      handleError('Failed to delete notice. Please try again.');
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

  if (isFreeTrial) {
    return <div style={{ padding: '2rem', textAlign: 'center', marginTop : "75px" }}>You have no access. Please upgrade.</div>;
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
