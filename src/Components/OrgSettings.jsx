// src/Components/OrgSettings.js
import React, { useState } from 'react';
import { Card, Input, Button, Typography, Upload, Form, Row, Col, Select, message, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Option } = Select;

const OrgSettings = () => {
  const [orgName, setOrgName] = useState('My Organization');
  const [address, setAddress] = useState('123 Main St, City, Country');
  const [totalRooms, setTotalRooms] = useState(50);
  const [currentOccupancy, setCurrentOccupancy] = useState(30);
  const [hostelInfo, setHostelInfo] = useState('');
  const [mealPlan, setMealPlan] = useState('basic');
  const [imageList, setImageList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const handleSave = () => {
    // Implement save logic here (e.g., API call or context update)
    console.log('Settings saved:', { orgName, address, totalRooms, currentOccupancy, hostelInfo, mealPlan });
    message.success('Settings saved successfully!');
  };

  const handleImageChange = ({ fileList }) => {
    setImageList(fileList);
  };

  const handleImagePreview = (file) => {
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const handleImageCancel = () => setPreviewVisible(false);

  return (
    <div style={{ padding: '20px', marginTop: '75px' }}>
      <Card>
        <Title level={4}>Organization Name</Title>
        <Input
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
          placeholder="Enter organization name"
          style={{ marginBottom: '20px' }}
        />
        <Title level={4}>Address</Title>
        <Input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter address"
          style={{ marginBottom: '20px' }}
        />
        <Title level={4}>Hostel Details</Title>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Total Rooms">
              <Input
                type="number"
                value={totalRooms}
                onChange={(e) => setTotalRooms(Number(e.target.value))}
                placeholder="Enter total number of rooms"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Current Occupancy">
              <Input
                type="number"
                value={currentOccupancy}
                onChange={(e) => setCurrentOccupancy(Number(e.target.value))}
                placeholder="Enter current occupancy"
              />
            </Form.Item>
          </Col>
        </Row>
        <Title level={4}>Hostel Information</Title>
        <Input.TextArea
          value={hostelInfo}
          onChange={(e) => setHostelInfo(e.target.value)}
          placeholder="Enter additional information about the hostel"
          rows={4}
        />
        <Title level={4}>Meal Plan</Title>
        <Select
          value={mealPlan}
          onChange={(value) => setMealPlan(value)}
          style={{ width: '100%' }}
        >
          <Option value="basic">Basic</Option>
          <Option value="standard">Standard</Option>
          <Option value="premium">Premium</Option>
        </Select>
        <Title level={4}>Hostel Images</Title>
        <Upload
          action="/upload" // Set your upload URL here
          listType="picture-card"
          fileList={imageList}
          onChange={handleImageChange}
          onPreview={handleImagePreview}
        >
          {imageList.length < 5 && '+ Upload'}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={handleImageCancel}>
          <img alt="Preview" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        <Button type="primary" onClick={handleSave}>Save Changes</Button>
      </Card>
    </div>
  );
};

export default OrgSettings;
