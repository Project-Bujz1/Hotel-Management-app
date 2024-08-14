import React, { useState, useEffect } from 'react';
import {
  List,
  Card,
  Avatar,
  Button,
  Modal,
  Form,
  Input,
  message,
  Popconfirm,
  Select,
  DatePicker,
  Upload,
  Row,
  Col,
  Spin,
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  BankOutlined,
  IdcardOutlined,
  PictureOutlined,
  CalendarOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import 'antd/dist/reset.css';
import './TenantsList.css'; // Import the CSS file
import moment from 'moment';

const { Option } = Select;
const { RangePicker } = DatePicker;

const TenantsList = () => {
  const [tenants, setTenants] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formMode, setFormMode] = useState('add'); // 'add' or 'update'
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [loading, setLoading] = useState(false); // To control the loading spinner
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const roomResponse = await axios.get('https://smart-hostel-management-json-server.onrender.com/rooms');
        setRooms(roomResponse.data);

        const tenantResponse = await axios.get('https://smart-hostel-management-json-server.onrender.com/tenants');
        setTenants(tenantResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        message.error('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const showModal = (tenant = null, mode = 'add', room = null) => {
    setFormMode(mode);
    if (mode === 'update') {
      setSelectedTenant(tenant);
      form.setFieldsValue({
        ...tenant,
        leaseStartDate: moment(tenant.leaseStartDate),
        leaseEndDate: moment(tenant.leaseEndDate),
        roomNumber: tenant.roomNumber,
        roomType: tenant.roomType,
        monthlyRent: tenant.rent // Set the monthlyRent field
      });
    } else {
      setSelectedRoom(room);
      form.resetFields();
      form.setFieldsValue({
        roomNumber: room?.roomNumber || '',
        roomType: room?.type || '',
        monthlyRent: room?.rent || ''
      });
    }

    if (mode === 'add') {
      // Check the current number of tenants in the room
      const tenantCount = tenants.filter(tenant => tenant.roomId === room.id).length;
      if (tenantCount >= room.sharing) { // using room.sharing to check capacity
        message.error('Cannot add more tenants. Room is at full capacity.');
        return;
      }
    }

    setIsModalVisible(true);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      if (formMode === 'update') {
        await axios.put(`https://smart-hostel-management-json-server.onrender.com/tenants/${selectedTenant.id}`, values);
        message.success('Tenant details updated successfully');
      } else {
        // Check the current number of tenants in the room
        const tenantCount = tenants.filter(tenant => tenant.roomId === selectedRoom.id).length;
        if (tenantCount >= selectedRoom.sharing) { // using room.sharing to check capacity
          message.error('Cannot add more tenants. Room is at full capacity.');
          return;
        }
        values.roomId = selectedRoom.id;
        await axios.post('https://smart-hostel-management-json-server.onrender.com/tenants', values);
        message.success('Tenant added successfully');
      }
      setIsModalVisible(false);
      const response = await axios.get('https://smart-hostel-management-json-server.onrender.com/tenants');
      setTenants(response.data);
    } catch (error) {
      console.error(`Error ${formMode === 'update' ? 'updating' : 'adding'} tenant details:`, error);
      message.error(`Failed to ${formMode === 'update' ? 'update' : 'add'} tenant details: ${error.response ? error.response.data : error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`https://smart-hostel-management-json-server.onrender.com/tenants/${id}`);
      message.success('Tenant deleted successfully');
      
      const response = await axios.get('https://smart-hostel-management-json-server.onrender.com/tenants');
      setTenants(response.data);
    } catch (error) {
      console.error('Error deleting tenant:', error);
      message.error('Failed to delete tenant');
    } finally {
      setLoading(false);
    }
  };

  const validateIdNumber = (_, value) => {
    if (!value) {
      return Promise.resolve();
    }

    // Remove non-numeric characters
    const cleanedValue = value.replace(/\D/g, '');

    if (cleanedValue.length !== 12) {
      return Promise.reject(new Error('ID Number must be exactly 12 digits'));
    }

    // Format value with spaces every 4 digits
    const formattedValue = cleanedValue.replace(/(.{4})/g, '$1 ').trim();

    // Set the formatted value back to the input
    form.setFieldsValue({ idNumber: formattedValue });

    return Promise.resolve();
  };

  const handleIdNumberChange = (e) => {
    // Get the current value and remove any non-numeric characters
    const value = e.target.value.replace(/\D/g, '');
    
    // Format the value with spaces every 4 digits
    const formattedValue = value.replace(/(.{4})/g, '$1 ').trim();

    // Update the input value
    form.setFieldsValue({ idNumber: formattedValue });
  };

  return (
    <div className="tenants-list-container" style={{ marginTop: "75px" }}>
      <Spin spinning={loading} size="large" tip="Loading..." style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
      {rooms.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: 50 }}>
          <h2>No Rooms Available</h2>
        </div>
      ) : tenants.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: 50 }}>
          <h2>No Tenants Found</h2>
        </div>
      ) : (
        rooms.map(room => (
          <div key={room.id} className="room-section">
            <h2>Room {room.roomNumber} ({room.type})</h2>
            <Button onClick={() => showModal(null, 'add', room)} type="primary" className="add-tenant-button" loading={loading}>
              Add Tenant
            </Button>
            <List
              grid={{ gutter: 16, column: 1 }}
              dataSource={tenants.filter(tenant => tenant.roomId === room.id)}
              renderItem={tenant => (
                <List.Item>
                  <Card
                    title={tenant.name}
                    cover={<Avatar src={tenant.imageUrl} size={64} />}
                    extra={
                      <div>
                        <Button type="primary" onClick={() => showModal(tenant, 'update')} loading={loading}>
                          View Details
                        </Button>
                        <Popconfirm
                          title="Are you sure to delete this tenant?"
                          onConfirm={() => handleDelete(tenant.id)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button type="danger" className="delete-button" loading={loading}>
                            Delete
                          </Button>
                        </Popconfirm>
                      </div>
                    }
                  >
                    <p><UserOutlined /> {tenant.name}</p>
                    <p><MailOutlined /> {tenant.email}</p>
                    <p><PhoneOutlined /> {tenant.phoneNumber}</p>
                  </Card>
                </List.Item>
              )}
            />
          </div>
        ))
      )}

      {/* Tenant Modal */}
      <Modal
        title={formMode === 'update' ? 'Tenant Details' : 'Add New Tenant'}
        visible={isModalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        okText={formMode === 'update' ? 'Save' : 'Add'}
        cancelText="Cancel"
        width="80vw"
        bodyStyle={{ padding: '20px' }}
        confirmLoading={loading}
        footer={
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={handleCancel} style={{ marginRight: 10 }}>
              Cancel
            </Button>
            <Button type="primary" onClick={handleSubmit} loading={loading}>
              {formMode === 'update' ? 'Save' : 'Add'}
            </Button>
          </div>
        }
      >
        <Form form={form} layout="vertical" style={{ marginTop: 20 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please enter the tenant name' }]}
              >
                <Input placeholder="Enter tenant name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="idNumber"
                label="ID Number"
                rules={[{ required: true, message: 'Please enter the ID Number' }, { validator: validateIdNumber }]}
              >
                <Input placeholder="Enter 12-digit ID Number" onChange={handleIdNumberChange} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, type: 'email', message: 'Please enter a valid email address' }]}
              >
                <Input placeholder="Enter tenant email" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phoneNumber"
                label="Phone Number"
                rules={[{ required: true, message: 'Please enter the phone number' }]}
              >
                <Input placeholder="Enter tenant phone number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="roomNumber"
                label="Room Number"
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="roomType"
                label="Room Type"
              >
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="leaseStartDate"
                label="Lease Start Date"
                rules={[{ required: true, message: 'Please select the lease start date' }]}
              >
                <DatePicker format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="leaseEndDate"
                label="Lease End Date"
                rules={[{ required: true, message: 'Please select the lease end date' }]}
              >
                <DatePicker format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="monthlyRent"
                label="Monthly Rent"
                rules={[{ required: true, message: 'Please enter the monthly rent' }]}
              >
                <Input prefix={<BankOutlined />} type="number" placeholder="Enter monthly rent" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="imageUrl"
                label="Image URL"
              >
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  beforeUpload={() => false}
                  onChange={({ fileList }) => {
                    if (fileList.length > 0) {
                      form.setFieldsValue({ imageUrl: fileList[0].thumbUrl });
                    }
                  }}
                >
                  <Button icon={<PictureOutlined />}>Upload</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default TenantsList;
