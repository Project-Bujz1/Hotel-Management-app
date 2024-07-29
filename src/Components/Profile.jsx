import React, { useState } from 'react';
import { Upload, Button, Avatar, Form, Input, Card, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const Profile = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [form] = Form.useForm();

  // Handle image upload and preview
  const handleImageChange = (info) => {
    if (info.file.status === 'done') {
      setImageUrl(URL.createObjectURL(info.file.originFileObj));
    }
  };

  // Handle form submission
  const handleSubmit = (values) => {
    message.success('Profile updated successfully!');
    console.log('Form values:', values);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 20, marginTop: "75px" }}>
      <Card
        style={{ width: 500, borderRadius: 10, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
        title="Profile"
        cover={
          <div style={{ textAlign: 'center', marginBottom: 20 , marginTop: 10}}>
            <Avatar
              size={128}
              src={imageUrl || 'https://via.placeholder.com/128'}
              style={{ marginBottom: 10 }}
            />
            <Upload
              showUploadList={false}
              customRequest={({ file, onSuccess }) => {
                setTimeout(() => {
                  handleImageChange({ file: { status: 'done', originFileObj: file } });
                  onSuccess(null, file);
                }, 1000);
              }}
            >
              <Button icon={<UploadOutlined />} style={{ marginBottom: 10 }}>
                Upload Picture
              </Button>
            </Upload>
          </div>
        }
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter your name!' }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please enter your email!' }]}
          >
            <Input type="email" placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: 'Please enter your phone number!' }]}
          >
            <Input placeholder="Enter your phone number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Save Profile
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Profile;
