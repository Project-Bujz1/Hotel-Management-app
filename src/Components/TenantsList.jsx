import React, { useState, useEffect } from 'react';
import { List, Card, Avatar, Button, Modal, Form, Input, message, Popconfirm, Select, DatePicker, Upload } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, HomeOutlined, BankOutlined, IdcardOutlined, PictureOutlined, CalendarOutlined } from '@ant-design/icons';
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
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roomResponse = await axios.get('http://localhost:5000/rooms');
        setRooms(roomResponse.data);

        const tenantResponse = await axios.get('http://localhost:5000/tenants');
        setTenants(tenantResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        message.error('Failed to fetch data');
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
    try {
      const values = await form.validateFields();
      if (formMode === 'update') {
        await axios.put(`http://localhost:5000/tenants/${selectedTenant.id}`, values);
        message.success('Tenant details updated successfully');
      } else {
        // Check the current number of tenants in the room
        const tenantCount = tenants.filter(tenant => tenant.roomId === selectedRoom.id).length;
        if (tenantCount >= selectedRoom.sharing) { // using room.sharing to check capacity
          message.error('Cannot add more tenants. Room is at full capacity.');
          return;
        }
        values.roomId = selectedRoom.id;
        await axios.post('http://localhost:5000/tenants', values);
        message.success('Tenant added successfully');
      }
      setIsModalVisible(false);
      const response = await axios.get('http://localhost:5000/tenants');
      setTenants(response.data);
    } catch (error) {
      console.error(`Error ${formMode === 'update' ? 'updating' : 'adding'} tenant details:`, error);
      message.error(`Failed to ${formMode === 'update' ? 'update' : 'add'} tenant details: ${error.response ? error.response.data : error.message}`);
    }
  };
  

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tenants/${id}`);
      message.success('Tenant deleted successfully');
      
      const response = await axios.get('http://localhost:5000/tenants');
      setTenants(response.data);
    } catch (error) {
      console.error('Error deleting tenant:', error);
      message.error('Failed to delete tenant');
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
      {rooms.map(room => (
        <div key={room.id} className="room-section">
          <h2>Room {room.roomNumber} ({room.type})</h2>
          <Button onClick={() => showModal(null, 'add', room)} type="primary" className="add-tenant-button">
            Add Tenant
          </Button>
          <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={tenants.filter(tenant => tenant.roomId === room.id)}
            renderItem={tenant => (
              <List.Item>
                <Card
                  title={tenant.name}
                  cover={<Avatar src={tenant.imageUrl} size={64} />}
                  extra={
                    <div>
                      <Button type="primary" onClick={() => showModal(tenant, 'update')}>
                        View Details
                      </Button>
                      <Popconfirm
                        title="Are you sure to delete this tenant?"
                        onConfirm={() => handleDelete(tenant.id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button type="danger" className="delete-button">
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
      ))}

      {/* Tenant Modal */}
      <Modal
        title={formMode === 'update' ? 'Tenant Details' : 'Add New Tenant'}
        visible={isModalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        okText={formMode === 'update' ? 'Save' : 'Add'}
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" className={formMode === 'update' ? "tenant-form" : "add-tenant-form"}>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter the name' }]}>
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter the email' }]}>
            <Input prefix={<MailOutlined />} />
          </Form.Item>
          <Form.Item name="roomNumber" label="Room Number">
            <Input prefix={<HomeOutlined />} disabled />
          </Form.Item>
          <Form.Item name="roomType" label="Room Type">
            <Input prefix={<HomeOutlined />} disabled />
          </Form.Item>
          <Form.Item name="phoneNumber" label="Phone Number">
            <Input prefix={<PhoneOutlined />} />
          </Form.Item>
          <Form.Item name="emergencyContact" label="Emergency Contact">
            <Input prefix={<PhoneOutlined />} />
          </Form.Item>
          <Form.Item name="idNumber" label="ID Number" rules={[{ validator: validateIdNumber }]}>
            <Input prefix={<IdcardOutlined />} onChange={handleIdNumberChange} />
          </Form.Item>
          <Form.Item name="currentAddress" label="Address">
            <Input prefix={<HomeOutlined />} />
          </Form.Item>
          <Form.Item name="dueDate" label="Joining Date">
            <DatePicker prefix={<CalendarOutlined />} format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item name="monthlyRent" label="Monthly Rent">
            <Input type="number" prefix={<BankOutlined />} disabled />
          </Form.Item>
          <Form.Item name="status" label="Rent Paid/Unpaid">
            <Select prefix={<BankOutlined />}>
              <Option value="Paid">Paid</Option>
              <Option value="Un Paid">Un Paid</Option>
            </Select>
          </Form.Item>
          <Form.Item name="modeOfPayment" label="Payment Method">
            <Select prefix={<BankOutlined />}>
              <Option value="Cash">Cash</Option>
              <Option value="Bank Transfer">Bank Transfer</Option>
              <Option value="Cheque">Cheque</Option>
            </Select>
          </Form.Item>
          <Form.Item name="securityDeposit" label="Security Deposit">
            <Input type="number" prefix={<BankOutlined />} />
          </Form.Item>
          <Form.Item name="profileImage" label="Profile Image">
            <Upload
              name="profileImage"
              showUploadList={false}
              action="/upload"
              listType="picture"
            >
              <Button icon={<PictureOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TenantsList;
