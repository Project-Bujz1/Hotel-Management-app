import React, { useEffect, useState } from 'react';
import { Upload, Button, Avatar, Form, Input, Card, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const Profile = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [form] = Form.useForm();
  const [profile, setProfile] = useState({});

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('http://localhost:5000/profile'); // Adjust the URL if needed
        const data = await response.json();
        setProfile(data);
        form.setFieldsValue(data);
        setImageUrl(data.imageUrl);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, [form]);

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      await fetch('http://localhost:5000/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...profile, ...values, imageUrl }),
      });
      message.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      message.error('Failed to update profile!');
    }
  };

  // Handle image change
  const handleImageChange = (info) => {
    if (info.file.status === 'done') {
      setImageUrl(URL.createObjectURL(info.file.originFileObj));
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 20, marginTop: "55px" }}>
      <Card
        style={{ width: 400, borderRadius: 10, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
        title="Profile"
        cover={
          <div style={{ textAlign: 'center', marginBottom: 5, marginTop: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar
              size={118}
              src={imageUrl || 'https://via.placeholder.com/128'}
              style={{ marginBottom: 5 }}
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
              <Button icon={<UploadOutlined />} style={{ marginTop: 5 }}>
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
