import { BarChartOutlined, LaptopOutlined, MobileOutlined, SettingOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import { DeviceButton, DeviceSwitch, IconWrapper, StepCard, StepNumber, StyledSection } from "./common";
import { Col, Row, Typography } from "antd";
const { Title, Paragraph, Text } = Typography;

const HowToUseSection = () => {
    const [activeDevice, setActiveDevice] = React.useState('desktop');
  
    const steps = [
      {
        title: "Sign Up",
        description: "Create your account on our website or mobile app.",
        icon: <UserOutlined />,
      },
      {
        title: "Set Up Your Hostel",
        description: "Add your hostel details, rooms, and amenities.",
        icon: <SettingOutlined />,
      },
      {
        title: "Manage Residents",
        description: "Add, remove, or update resident information easily.",
        icon: <TeamOutlined />,
      },
      {
        title: "Track Finances",
        description: "Monitor rent payments, expenses, and generate reports.",
        icon: <BarChartOutlined />,
      },
    ];
  
    return (
      <StyledSection>
        <Row justify="center">
          <Col xs={24} sm={24} md={20} lg={18} xl={16}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: '40px', color: '#4ca1af' }}>
              How to Use Smart Hostel Master
            </Title>
            
            <DeviceSwitch>
              <DeviceButton 
                active={activeDevice === 'desktop'} 
                onClick={() => setActiveDevice('desktop')}
              >
                <LaptopOutlined /> Desktop
              </DeviceButton>
              <DeviceButton 
                active={activeDevice === 'mobile'} 
                onClick={() => setActiveDevice('mobile')}
              >
                <MobileOutlined /> Mobile
              </DeviceButton>
            </DeviceSwitch>
  
            <Row gutter={[32, 32]}>
              {steps.map((step, index) => (
                <Col xs={24} sm={12} md={12} lg={6} key={index}>
                  <StepCard>
                    <StepNumber>{index + 1}</StepNumber>
                    <IconWrapper>{step.icon}</IconWrapper>
                    <Title level={4}>{step.title}</Title>
                    <Paragraph>
                      {activeDevice === 'desktop' 
                        ? `On your computer: ${step.description}` 
                        : `On your phone: ${step.description}`}
                    </Paragraph>
                  </StepCard>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </StyledSection>
    );
  };
  
export default HowToUseSection;