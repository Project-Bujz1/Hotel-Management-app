import React from 'react';
import { Button, message } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const token = localStorage.getItem('token');
    localStorage.removeItem('token');

    try {
      // await axios.post('https://hotel-management-app-5.onrender.com/signout', {}, {
      //   headers: { Authorization: `Bearer ${token}` }
      // });

      // Remove token from local storage
      localStorage.removeItem('token');
      window.location.href = '/login'; // Redirect to login
            navigate('/login');

      // Provide feedback to user
      message.success('Successfully signed out');
      
      // Redirect user to login page
      navigate('/login');
    } catch (error) {
      console.error('Sign out failed:', error);
      message.error('Sign out failed, please try again');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', marginTop: '75px' }}>
      <Button
        type="primary"
        icon={<LogoutOutlined />}
        onClick={handleSignOut}
      >
        Sign Out
      </Button>
    </div>
  );
};

export default SignOut;
