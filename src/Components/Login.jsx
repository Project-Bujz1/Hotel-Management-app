import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Typography, Divider, message } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import logo from "../assets/logo-transparent-png.png";
import leftBackground from "../assets/left-background.png"; 
import rightBackground from "../assets/right-background.png"; 

const { Title } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isTrial, setIsTrial] = useState(false);

  useEffect(() => {
    if (location.state && location.state.isTrial) {
      setIsTrial(true);
    }
  }, [location]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:5000/login', values);
      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      message.success('Login successful!');
      if (isTrial) {
        // Start free trial logic here
        message.info('Your 14-day free trial has started!');
      }
      navigate('/rooms'); // Redirect to the home or dashboard page after login
    } catch (error) {
      console.error('Login error:', error);
      message.error('Login failed! Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Background images */}
      <img src={leftBackground} alt="leftBackground" className='left-background' />      
      <div className="auth-form">
        <Title level={2} style={{ textAlign: 'center' }}>
          {isTrial ? 'Start Your Free Trial' : 'Login'}
        </Title>
        <img src={logo} alt="Logo" className="logo" />
        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              {isTrial ? 'Start Free Trial' : 'Login'}
            </Button>
          </Form.Item>
          <Divider />
          <Form.Item style={{ textAlign: 'center' }}>
            <Button type="link" onClick={() => navigate('/signup')}>Create an account</Button>
            <Button type="link" onClick={() => navigate('/forgot-password')} style={{ float: 'right' }}>Forgot password?</Button>
          </Form.Item>
        </Form>
      </div>
      <img src={rightBackground} alt="rightBackground" className='right-background' />
    </div>
  );
};

export default Login;