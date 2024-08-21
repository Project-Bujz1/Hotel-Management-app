import { Button, Col, Row, Modal, Card, Typography } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo-transparent-png.png";
import { LoginOutlined } from '@ant-design/icons';
import hostelIcon from "../assets/left-background.png";
import hostel from "../assets/right-background.png";
import styled from 'styled-components';

const { Title, Paragraph, Text } = Typography;
const StyledButton = styled(Button)`
  background: linear-gradient(135deg, #4ca1af 0%, #c4e0e5 100%);
  border: none;
  height: 50px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 25px;
  padding: 0 30px;
  transition: all 0.3s ease;
  color: #fff;

  &:hover {
    opacity: 0.9;
    transform: scale(1.05);
  }
`;

const RealTimeHeader = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();

    const showModal = () => {
      setIsModalVisible(true);
    };
    const handleModalCancel = () => {
      setIsModalVisible(false);
    };

    const handleFreeTrial = () => {
      setIsModalVisible(false);
      localStorage.setItem('isFreeTrial', 'true');
      navigate('/login', { state: { isTrial: true } });
    };

    const handleLogin = () => {
      setIsModalVisible(false);
      localStorage.setItem('isFreeTrial', 'false');
      navigate('/login');
    };

    return (
      <>
      <Row
        justify="space-between"
        align="middle"
        style={{
          padding: '10px 20px',
          background: 'linear-gradient(135deg, #4ca1af 0%, #5fb2bb 25%, #8fd3d9 50%, #a9dee4 75%, #c4e0e5 100%)',
          color: 'white'
        }}
      >
        <Col xs={12} sm={6}>
          <img
            src={logo}
            alt="Logo"
            style={{ height: '40px', marginRight: '10px' }}
          />
          <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
            Smart Annoyers
          </span>
        </Col>
        <Col xs={12} sm={6} style={{ textAlign: 'right' }}>
          <Button
            onClick={showModal}
            type="primary"
            shape="round"
            size="small"
            icon={<LoginOutlined />}
            style={{
              color: "black",
              background: "white",
              border: "none",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
              cursor: "pointer",

            }}
            className="styled-button"
          >
          </Button>
        </Col>
        <Col xs={12} sm={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <img
            src={hostelIcon}
            alt="Hostel-Logo"
            style={{ height: '40px', marginRight: '10px' }}
          />
          <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
            Smart Hostel Master
          </span>
        </Col>
      </Row>
      <Modal
        title="Choose Your Path"
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
        width={800}
      >
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={12}>
            <Card
              hoverable
              onClick={() => {
                handleFreeTrial();
                localStorage.setItem('role', 'Free Trial');
              }}
              style={{ textAlign: 'center' }}
            >
              <Title level={3}>Free Trial</Title>
              <Paragraph>Try our platform for 14 days, no credit card required.</Paragraph>
              <StyledButton size="small" type="primary">Start Free Trial</StyledButton>
            </Card>
          </Col>
          <Col xs={24} sm={12}>
            <Card
              hoverable
              onClick={() => {
                handleLogin();
                localStorage.setItem('role', 'Manager');
              }}
              style={{ textAlign: 'center' }}
            >
              <Title level={3}>Login as Manager</Title>
              <Paragraph>Sign in to manage your hostel efficiently.</Paragraph>
              <StyledButton size="small" type="primary">Manager Login</StyledButton>
            </Card>
          </Col>
          <Col xs={24} sm={12}>
            <Card
              hoverable
              onClick={() => {
                handleLogin();
                localStorage.setItem('role', 'Tenant');
              }}
              style={{ textAlign: 'center' }}
            >
              <Title level={3}>Login as Tenant</Title>
              <Paragraph>Access your account and manage your stay.</Paragraph>
              <StyledButton size="small" type="primary">Tenant Login</StyledButton>
            </Card>
          </Col>
          <Col xs={24} sm={12}>
            <Card
              hoverable
              onClick={() => {
                handleLogin();
                localStorage.setItem('role', 'Admin');
              }}
              style={{ textAlign: 'center' }}
            >
              <Title level={3}>Login as Admin</Title>
              <Paragraph>Administer the entire hostel management system.</Paragraph>
              <StyledButton size="small" type="primary">Admin Login</StyledButton>
            </Card>
          </Col>
        </Row>
      </Modal>
      </>
    );
  };

  export default RealTimeHeader;