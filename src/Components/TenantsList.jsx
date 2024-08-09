import React, { useState, useEffect } from 'react';
import { List, Card, Avatar, Button, Modal, Form, Input, message, Popconfirm, Upload, Select, DatePicker } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, HomeOutlined, BankOutlined, IdcardOutlined, FileImageOutlined, CalendarOutlined } from '@ant-design/icons';
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
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();
  const [imagePreview, setImagePreview] = useState(null);

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

  const showDetailsModal = (tenant) => {
    setSelectedTenant(tenant);
    form.setFieldsValue({
      ...tenant,
      leaseStartDate: moment(tenant.leaseStartDate),
      leaseEndDate: moment(tenant.leaseEndDate)
    });
    setImagePreview(tenant.image);
    setIsModalVisible(true);
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      let imageUrl = values.image;
      if (typeof values.image === 'object') {
        const formData = new FormData();
        formData.append('file', values.image.file);
        const uploadResponse = await axios.post('http://localhost:5000/upload', formData);
        imageUrl = uploadResponse.data.url;
      }
      values.image = imageUrl;

      await axios.put(`http://localhost:5000/tenants/${selectedTenant.id}`, values);
      message.success('Tenant details updated successfully');
      setIsModalVisible(false);

      const response = await axios.get('http://localhost:5000/tenants');
      setTenants(response.data);
    } catch (error) {
      console.error('Error updating tenant details:', error);
      message.error('Failed to update tenant details');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsAddModalVisible(false);
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

  const showAddModal = (room) => {
    setSelectedRoom(room);
    setIsAddModalVisible(true);
  };

  const handleAdd = async () => {
    try {
      const values = await addForm.validateFields();
      values.roomId = selectedRoom.id;

      let imageUrl = values.image;
      if (typeof values.image === 'object') {
        const formData = new FormData();
        formData.append('file', values.image.file);
        const uploadResponse = await axios.post('http://localhost:5000/upload', formData);
        imageUrl = uploadResponse.data.url;
      }
      values.image = imageUrl;

      await axios.post('http://localhost:5000/tenants', values);
      message.success('Tenant added successfully');
      setIsAddModalVisible(false);

      const response = await axios.get('http://localhost:5000/tenants');
      setTenants(response.data);
    } catch (error) {
      console.error('Error adding tenant:', error);
      message.error('Failed to add tenant');
    }
  };

  const handleImageChange = (info) => {
    if (info.file.status === 'done') {
      setImagePreview(URL.createObjectURL(info.file.originFileObj));
    }
  };

  return (
    <div className="tenants-list-container" style={{ marginTop: "75px" }}>
      {rooms.map(room => (
        <div key={room.id} className="room-section">
          <h2>Room {room.roomNumber} ({room.type})</h2>
          <Button onClick={() => showAddModal(room)} type="primary" className="add-tenant-button">
            Add Tenant
          </Button>
          <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={tenants.filter(tenant => tenant.roomId === room.id)}
            renderItem={tenant => (
              <List.Item>
                <Card
                  title={tenant.name}
                  cover={<Avatar src={tenant.image} size={64} />}
                  extra={
                    <div>
                      <Button type="primary" onClick={() => showDetailsModal(tenant)}>
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

      {/* Update Tenant Modal */}
      <Modal
        title="Tenant Details"
        visible={isModalVisible}
        onOk={handleUpdate}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" className="tenant-form">
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter the name' }]}>
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter the email' }]}>
            <Input prefix={<MailOutlined />} />
          </Form.Item>
          <Form.Item name="phoneNumber" label="Phone Number">
            <Input prefix={<PhoneOutlined />} />
          </Form.Item>
          <Form.Item name="emergencyContact" label="Emergency Contact">
            <Input prefix={<PhoneOutlined />} />
          </Form.Item>
          <Form.Item name="idNumber" label="ID Number">
            <Input prefix={<IdcardOutlined />} />
          </Form.Item>
          <Form.Item name="currentAddress" label="Current Address">
            <Input prefix={<HomeOutlined />} />
          </Form.Item>
          <Form.Item name="permanentAddress" label="Permanent Address">
            <Input prefix={<HomeOutlined />} />
          </Form.Item>
          <Form.Item name="leaseStartDate" label="Lease Start Date">
            <DatePicker prefix={<CalendarOutlined />} format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item name="leaseEndDate" label="Lease End Date">
            <DatePicker prefix={<CalendarOutlined />} format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item name="monthlyRent" label="Monthly Rent">
            <Input type="number" prefix={<BankOutlined />} />
          </Form.Item>
          <Form.Item name="paymentMethod" label="Payment Method">
            <Select prefix={<BankOutlined />}>
              <Option value="Cash">Cash</Option>
              <Option value="Bank Transfer">Bank Transfer</Option>
              <Option value="Cheque">Cheque</Option>
            </Select>
          </Form.Item>
          <Form.Item name="securityDeposit" label="Security Deposit">
            <Input type="number" prefix={<BankOutlined />} />
          </Form.Item>
          <Form.Item name="occupation" label="Occupation">
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item name="employerName" label="Employer Name">
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item name="employerContact" label="Employer Contact">
            <Input prefix={<PhoneOutlined />} />
          </Form.Item>
          <Form.Item name="nationality" label="Nationality">
            <Select prefix={<IdcardOutlined />}>
              <Option value="American">American</Option>
              <Option value="Indian">Indian</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item name="image" label="Profile Image" valuePropName="fileList" getValueFromEvent={e => e.fileList}>
            <Upload
              beforeUpload={() => false}
              onChange={handleImageChange}
              showUploadList={false}
              listType="picture"
            >
              <Button>Upload Image</Button>
            </Upload>
            {imagePreview && <img src={imagePreview} alt="Profile Preview" style={{ width: '100px', marginTop: '10px' }} />}
          </Form.Item>
        </Form>
      </Modal>

      {/* Add Tenant Modal */}
      <Modal
        title="Add New Tenant"
        visible={isAddModalVisible}
        onOk={handleAdd}
        onCancel={handleCancel}
        okText="Add"
        cancelText="Cancel"
      >
        <Form form={addForm} layout="vertical" className="add-tenant-form">
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter the name' }]}>
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter the email' }]}>
            <Input prefix={<MailOutlined />} />
          </Form.Item>
          <Form.Item name="phoneNumber" label="Phone Number">
            <Input prefix={<PhoneOutlined />} />
          </Form.Item>
          <Form.Item name="emergencyContact" label="Emergency Contact">
            <Input prefix={<PhoneOutlined />} />
          </Form.Item>
          <Form.Item name="idNumber" label="ID Number">
            <Input prefix={<IdcardOutlined />} />
          </Form.Item>
          <Form.Item name="currentAddress" label="Current Address">
            <Input prefix={<HomeOutlined />} />
          </Form.Item>
          <Form.Item name="permanentAddress" label="Permanent Address">
            <Input prefix={<HomeOutlined />} />
          </Form.Item>
          <Form.Item name="leaseStartDate" label="Lease Start Date">
            <DatePicker prefix={<CalendarOutlined />} format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item name="leaseEndDate" label="Lease End Date">
            <DatePicker prefix={<CalendarOutlined />} format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item name="monthlyRent" label="Monthly Rent">
            <Input type="number" prefix={<BankOutlined />} />
          </Form.Item>
          <Form.Item name="paymentMethod" label="Payment Method">
            <Select prefix={<BankOutlined />}>
              <Option value="Cash">Cash</Option>
              <Option value="Bank Transfer">Bank Transfer</Option>
              <Option value="Cheque">Cheque</Option>
            </Select>
          </Form.Item>
          <Form.Item name="securityDeposit" label="Security Deposit">
            <Input type="number" prefix={<BankOutlined />} />
          </Form.Item>
          <Form.Item name="occupation" label="Occupation">
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item name="employerName" label="Employer Name">
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item name="employerContact" label="Employer Contact">
            <Input prefix={<PhoneOutlined />} />
          </Form.Item>
          <Form.Item name="nationality" label="Nationality">
            <Select prefix={<IdcardOutlined />}>
              <Option value="American">American</Option>
              <Option value="Indian">Indian</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item name="image" label="Profile Image" valuePropName="fileList" getValueFromEvent={e => e.fileList}>
            <Upload
              beforeUpload={() => false}
              onChange={handleImageChange}
              showUploadList={false}
              listType="picture"
            >
              <Button>Upload Image</Button>
            </Upload>
            {imagePreview && <img src={imagePreview} alt="Profile Preview" style={{ width: '100px', marginTop: '10px' }} />}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TenantsList;
