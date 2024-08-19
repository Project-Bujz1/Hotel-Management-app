import React, { useState, useEffect } from 'react';
import { Layout, Table, Button, Modal, Form, Input, message } from 'antd';
import { InboxOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Header, Content } = Layout;

const API_BASE_URL = 'https://smart-hostel-management-json-server.onrender.com';

const TenantParcelManagement = () => {
  const [parcels, setParcels] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentParcel, setCurrentParcel] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchParcels();
  }, []);

  const fetchParcels = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/parcels`);
      setParcels(response.data);
    } catch (error) {
      message.error('Failed to fetch parcels');
    }
  };

  const columns = [
    {
      title: 'Parcel ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tenant Name',
      dataIndex: 'tenantName',
      key: 'tenantName',
    },
    {
      title: 'Room Number',
      dataIndex: 'roomNumber',
      key: 'roomNumber',
    },
    {
      title: 'Date Received',
      dataIndex: 'dateReceived',
      key: 'dateReceived',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (status === 'Unclaimed' ? <span style={{ color: 'red' }}>{status}</span> : <span style={{ color: 'green' }}>{status}</span>),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Button 
          type="primary"
          onClick={() => handleClaim(record)}
          disabled={record.status === 'Claimed'}
        >
          Claim Parcel
        </Button>
      ),
    },
  ];

  const handleClaim = async (record) => {
    try {
      await axios.put(`${API_BASE_URL}/parcels/${record.id}`, { ...record, status: 'Claimed' });
      message.success('Parcel claimed successfully');
      fetchParcels();
    } catch (error) {
      message.error('Failed to claim parcel');
    }
  };

  const handleViewDetails = (record) => {
    setCurrentParcel(record);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Header>
        <div className="logo" />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content" style={{ margin: '16px 0' }}>
          <h1>Your Parcels</h1>
          <Table columns={columns} dataSource={parcels} rowKey="id" />
          <Modal
            title="Parcel Details"
            visible={isModalVisible}
            onOk={handleModalOk}
            onCancel={handleModalCancel}
          >
            {currentParcel && (
              <Form layout="vertical">
                <Form.Item label="Parcel ID">{currentParcel.id}</Form.Item>
                <Form.Item label="Tenant Name">{currentParcel.tenantName}</Form.Item>
                <Form.Item label="Room Number">{currentParcel.roomNumber}</Form.Item>
                <Form.Item label="Date Received">{currentParcel.dateReceived}</Form.Item>
                <Form.Item label="Description">{currentParcel.description}</Form.Item>
                {currentParcel.image && (
                  <Form.Item label="Parcel Image">
                    <img src={currentParcel.image} alt="Parcel" style={{ maxWidth: '100%' }} />
                  </Form.Item>
                )}
              </Form>
            )}
          </Modal>
        </div>
      </Content>
    </Layout>
  );
};

export default TenantParcelManagement;
