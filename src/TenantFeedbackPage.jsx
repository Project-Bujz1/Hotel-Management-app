import React, { useState, useEffect } from 'react';
import { Card, List, Typography, Empty, Form, Input, Button, Select, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const TenantFeedbackPage = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    if (userRole !== 'Tenant') {
      message.error('Access denied. Only tenants can access this page.');
      navigate.push('/'); // Redirect to home or login page
    } else {
      // Fetch existing feedback from the database
      fetchFeedback();
    }
  }, [navigate]);

  const fetchFeedback = async () => {
    // Fetch feedback from the database
    const response = await fetch('/api/feedback');
    const data = await response.json();
    setFeedbackList(data);
  };

  const handleSubmitFeedback = async (values) => {
    const newFeedback = {
      content: values.content,
      category: values.category,
      likes: 0,
      dislikes: 0,
      date: new Date().toLocaleDateString(),
    };

    // Upload feedback to the database
    const response = await fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    });

    if (response.ok) {
      setFeedbackList([...feedbackList, newFeedback]);
      message.success('Feedback submitted successfully');
    } else {
      message.error('Failed to submit feedback');
    }
  };

  return (
    <div style={{ padding: '2rem', marginTop: '75px' }}>
      <Title level={2}>Tenant Feedback</Title>
      <Form layout="vertical" onFinish={handleSubmitFeedback}>
        <Form.Item
          name="category"
          label="Feedback Category"
          rules={[{ required: true, message: 'Please select a category' }]}
        >
          <Select placeholder="Select a category">
            <Option value="facilities">Facilities</Option>
            <Option value="food">Food</Option>
            <Option value="cleanliness">Cleanliness</Option>
            <Option value="security">Security</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="content"
          label="Your Feedback"
          rules={[{ required: true, message: 'Please provide your feedback' }]}
        >
          <TextArea rows={4} placeholder="Enter your feedback" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit Feedback
          </Button>
        </Form.Item>
      </Form>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 3,
          xxl: 4,
        }}
        dataSource={feedbackList}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.category} hoverable>
              <Paragraph>{item.content}</Paragraph>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                <span>Likes: {item.likes}</span>
                <span>Dislikes: {item.dislikes}</span>
                <span>Date: {item.date}</span>
              </div>
            </Card>
          </List.Item>
        )}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="No feedback yet"
            />
          ),
        }}
      />
    </div>
  );
};

export default TenantFeedbackPage;
