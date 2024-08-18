import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Carousel, Button, Layout, Statistic, Card, Modal, Collapse,Tabs, Timeline } from 'antd';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import logo from "../assets/logo-transparent-png.png";
import hostelIcon from "../assets/left-background.png";
import hostel from "../assets/right-background.png";
import CountUp from 'react-countup';
import styled, { keyframes } from 'styled-components';
import { FaRupeeSign } from "react-icons/fa";
import YouTube from 'react-youtube';
import {
  WifiOutlined,
  HomeOutlined,
  SecurityScanOutlined,
  RocketOutlined,
  BarChartOutlined,
  DashboardOutlined,
  TeamOutlined,
  SettingOutlined,
  PlayCircleOutlined,
  FileProtectOutlined, SafetyOutlined, QuestionCircleOutlined, RollbackOutlined, DollarOutlined, CloseCircleOutlined , EyeOutlined, LockOutlined , PlusOutlined, MinusOutlined ,  UserOutlined, 
  MobileOutlined, 
  LaptopOutlined,  
} from '@ant-design/icons';
import view1 from '../assets/tech-3.png';
import view2 from '../assets/collect-slider-2.png';
import view3 from '../assets/view-slider-1.png';
import view4 from '../assets/tech-4.jpg';
import view5 from '../assets/tech-5.png';
import view6 from '../assets/tech-6.png';
import view7 from '../assets/tech-9.webp';
import AppFooter from './AppFooter';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;
const { Footer } = Layout;
const { Panel } = Collapse;
const { TabPane } = Tabs;

const carouselItems = [
  { text: "Revolutionize Hostel Management", image: view1 },
  { text: "Smart Solutions for Modern Living", image: view2 },
  { text: "Smart Hostel Master - Your Digital Concierge", image: view3 },
  { text: "Effortless Room Management", image: view4 },
  { text: "Seamless Tenant Experiences", image: view5 },
  { text: "Data-Driven Decision Making", image: view6 },
  { text: "Access from anywhere and at anytime",image: view7 },
];

const StyledPrevArrow = styled(CaretLeftOutlined)`
  font-size: 48px;
  color: #000; /* Adjust color if needed */
`;

const StyledNextArrow = styled(CaretRightOutlined)`
  font-size: 48px;
  color: #000; /* Adjust color if needed */
`;

const Typewriter = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentTextIndex = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.substring(0, currentTextIndex + 1));
      currentTextIndex++;
      if (currentTextIndex === text.length) {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayedText}</span>;
};

// const StyledButton = styled(Button)`
//   border-radius: 50px;
//   padding: 0 40px;
//   height: 50px;
//   font-size: 18px;
//   background-color: black !important;
//   border-color: white !important;
//   color: white !important;
//   font-weight: 600;
//   box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
//   transition: all 0.15s ease;

//   &:hover {
//     background-color: white !important;
//     border-color: black !important;
//     color: black !important;
//   }
// `;


const RealTimeHeader = () => {


  return (
    <Row justify="space-between" align="middle" style={{ padding: '10px 20px', background: 'black', color: 'white' }}>
           <Col>
        <img src={logo} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Smart Annoyers</span>
      </Col>
      <Col>
      <img src={hostelIcon} alt="Hostel-Logo" style={{ height: '40px', marginRight: '10px' }} />
        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Smart Hostel Master</span>
      </Col>
    </Row>
  );
};
const FeatureCard = ({ feature, onClick }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="feature-card"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={onClick}
      style={{
        perspective: '1000px',
        width: '80%',
        height: '200px',
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transition: 'transform 0.6s',
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'black',
            color: 'white',
            borderRadius: '15px',
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '10px' }}>{feature.icon}</div>
          <h3 style={{ margin: 0 }}>{feature.title}</h3>
        </div>
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'white',
            color: 'black',
            borderRadius: '15px',
            padding: '10px',
            textAlign: 'center',
          }}
        >
          <p>{feature.description}</p>
          <StyledButton type="primary">Learn More</StyledButton>
        </div>
      </div>
    </div>
  );
};



const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;


const StepCard = styled(Card)`
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
`;

const IconWrapper = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
  color: #764ba2;
  animation: ${float} 3s ease-in-out infinite;
`;

const StepNumber = styled.div`
  position: absolute;
  top: -4px;
  left: -4px;
  width: 40px;
  height: 40px;
  background: #764ba2;
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
`;

const DeviceSwitch = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

const DeviceButton = styled.button`
  background: ${props => props.active ? '#764ba2' : 'transparent'};
  color: ${props => props.active ? 'white' : '#764ba2'};
  border: 2px solid #764ba2;
  padding: 10px 20px;
  margin: 0 10px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #764ba2;
    color: white;
  }
`;

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
          <Title level={2} style={{ textAlign: 'center', marginBottom: '40px', color: '#764ba2' }}>
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

const StyledSubscriptionCard = styled(Card)`
  border-radius: 20px;
  text-align: center;
  background : black;
  color: white;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

const SubscriptionButton = styled(Button)`
  border-radius: 50px;
  padding: 0 40px;
  height: 50px;
  font-size: 18px;
  background-color: black !important;
  border-color: white !important;
  color: white !important;
  font-weight: 600;
  margin-top: 20px;

  &:hover {
    background-color: white !important;
    border-color: black !important;
    color: black !important;
  }
`;



const StyledCard = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 30px;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

// const StyledButton = styled(Button)`
//   background-color: #fff;
//   color: #6e8efb;
//   border: none;
//   height: 50px;
//   font-size: 18px;
//   font-weight: bold;
//   border-radius: 25px;
//   padding: 0 30px;
//   transition: all 0.3s ease;

//   &:hover {
//     background-color: #a777e3;
//     color: #fff;
//   }
// `;


const PrivacyPolicySection = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleOk = () => setIsModalVisible(false);
  const handleCancel = () => setIsModalVisible(false);

  return (
    <StyledSection>
      <Row justify="center" gutter={[32, 32]}>
        <Col xs={24} sm={24} md={20} lg={18} xl={16}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '40px', color: '#FF6A88' }}>
            Your Privacy Matters to Us
          </Title>
          <Row gutter={[32, 32]}>
            <Col xs={24} md={8}>
              <StyledCard>
                <IconBox>
                  <FileProtectOutlined />
                </IconBox>
                <Title level={4} style={{ color: '#FF6A88' }}>Protected</Title>
                <Paragraph>Your data is safeguarded with industry-standard security measures.</Paragraph>
              </StyledCard>
            </Col>
            <Col xs={24} md={8}>
              <StyledCard>
                <IconBox>
                  <EyeOutlined />
                </IconBox>
                <Title level={4} style={{ color: '#FF6A88' }}>Transparent</Title>
                <Paragraph>We're clear about how we collect and use your information.</Paragraph>
              </StyledCard>
            </Col>
            <Col xs={24} md={8}>
              <StyledCard>
                <IconBox>
                  <LockOutlined />
                </IconBox>
                <Title level={4} style={{ color: '#FF6A88' }}>Control</Title>
                <Paragraph>You have full control over your personal data and preferences.</Paragraph>
              </StyledCard>
            </Col>
          </Row>
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <StyledButton onClick={showModal}>Read Our Privacy Policy</StyledButton>
          </div>
        </Col>
      </Row>
      <Modal
        title="Smart Annoyers Software Solutions Privacy Policy"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        footer={[
          <Button key="close" onClick={handleCancel}>
            Close
          </Button>
        ]}
      >
        <Collapse accordion>
          <Panel header="Information Collection and Use" key="1">
            <p>Smart Annoyers Software Solutions collects and uses personal information for providing and improving our services. We do not share your information with third parties except as described in this Privacy Policy.</p>
          </Panel>
          <Panel header="Data Protection" key="2">
            <p>We implement robust security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.</p>
          </Panel>
          <Panel header="Your Rights" key="3">
            <p>You have the right to access, correct, or delete your personal information. Contact us if you wish to exercise these rights or have any questions about our privacy practices.</p>
          </Panel>
          <Panel header="Policy Updates" key="4">
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
          </Panel>
        </Collapse>
      </Modal>
    </StyledSection>
  );
};


const FAQSection = () => {
  const [visibleFAQs, setVisibleFAQs] = useState(3);
  const allFAQs = [
    { question: "What is Smart Hostel Master?", answer: "Smart Hostel Master is a comprehensive hostel management platform..." },
    { question: "How do I get started?", answer: "You can start by signing up for our free trial..." },
    { question: "Is my data secure?", answer: "Yes, we use industry-standard encryption and security measures..." },
    { question: "Can I upgrade my plan later?", answer: "Absolutely! You can upgrade your plan at any time..." },
    { question: "Do you offer customer support?", answer: "Yes, we provide 24/7 customer support..." },
    { question: "Is there a mobile app?", answer: "Yes, we have mobile apps for both iOS and Android..." },
  ];

  const showMore = () => {
    setVisibleFAQs(prevVisible => 
      prevVisible + 3 > allFAQs.length ? allFAQs.length : prevVisible + 3
    );
  };

  const showLess = () => {
    setVisibleFAQs(3);
  };

  return (
    <Row justify="center" style={{ padding: '60px 20px', backgroundColor: '#ffffff' }}>
      <Col xs={24} sm={24} md={20} lg={18} xl={16}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>
          Frequently Asked Questions
        </Title>
        {allFAQs.slice(0, visibleFAQs).map((faq, index) => (
          <Card key={index} style={{ marginBottom: '20px' }}>
            <Title level={4}>{faq.question}</Title>
            <Paragraph>{faq.answer}</Paragraph>
          </Card>
        ))}
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          {visibleFAQs < allFAQs.length ? (
            <StyledButton onClick={showMore}>View More</StyledButton>
          ) : (
            <StyledButton onClick={showLess}>Show Less</StyledButton>
          )}
        </div>
      </Col>
    </Row>
  );
};


// const StyledSection = styled.section`
//   background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
//   padding: 80px 20px;
// `;

const FAQCard = styled(Card)`
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }

  .ant-collapse-header {
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 18px;
    color: #1890ff;
  }

  .ant-collapse-content-box {
    font-size: 16px;
  }
`;

// const StyledButton = styled(Button)`
//   background: linear-gradient(45deg, #1890ff, #36d1dc);
//   border: none;
//   height: 50px;
//   font-size: 18px;
//   font-weight: bold;
//   border-radius: 25px;
//   padding: 0 30px;
//   transition: all 0.3s ease;
//   color: #fff;

//   &:hover {
//     opacity: 0.9;
//     transform: scale(1.05);
//   }
// `;



const StyledSection = styled.section`
  background-color: #f0f2f5;
  padding: 80px 20px;
`;

const GlassCard = styled.div`
  background: rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

// const StyledButton = styled(Button)`
//   background: linear-gradient(90deg, #4ca1af 0%, #c4e0e5 100%);
//   border: none;
//   height: 50px;
//   font-size: 18px;
//   font-weight: bold;
//   border-radius: 25px;
//   padding: 0 30px;
//   transition: all 0.3s ease;
//   color: #fff;

//   &:hover {
//     opacity: 0.9;
//     transform: scale(1.05);
//   }
// `;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: linear-gradient(135deg, #4ca1af 0%, #c4e0e5 100%);
  margin: 0 auto 20px;
  font-size: 40px;
  color: #fff;
`;

const TermsAndConditionsSection = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleOk = () => setIsModalVisible(false);
  const handleCancel = () => setIsModalVisible(false);

  return (
    <StyledSection>
      <Row justify="center" gutter={[32, 32]}>
        <Col xs={24} sm={24} md={20} lg={18} xl={16}>
          <GlassCard>
            <Title level={2} style={{ textAlign: 'center', marginBottom: '40px', color: '#4ca1af' }}>
              Terms and Conditions
            </Title>
            <Row gutter={[32, 32]}>
              <Col xs={24} md={8}>
                <IconBox>
                  <FileProtectOutlined />
                </IconBox>
                <Title level={4} style={{ textAlign: 'center' }}>Legal Agreement</Title>
                <Paragraph style={{ textAlign: 'center' }}>
                  Our terms form a legally binding agreement between you and Smart Annoyers Software Solutions.
                </Paragraph>
              </Col>
              <Col xs={24} md={8}>
                <IconBox>
                  <SafetyOutlined />
                </IconBox>
                <Title level={4} style={{ textAlign: 'center' }}>User Responsibilities</Title>
                <Paragraph style={{ textAlign: 'center' }}>
                  Learn about your rights and responsibilities when using our services.
                </Paragraph>
              </Col>
              <Col xs={24} md={8}>
                <IconBox>
                  <QuestionCircleOutlined />
                </IconBox>
                <Title level={4} style={{ textAlign: 'center' }}>FAQ</Title>
                <Paragraph style={{ textAlign: 'center' }}>
                  Find answers to commonly asked questions about our terms and conditions.
                </Paragraph>
              </Col>
            </Row>
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <StyledButton onClick={showModal}>Read Full Terms</StyledButton>
            </div>
          </GlassCard>
        </Col>
      </Row>
      <Modal
        title="Smart Annoyers Software Solutions - Terms and Conditions"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        footer={[
          <Button key="close" onClick={handleCancel}>
            Close
          </Button>
        ]}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="General Terms" key="1">
            <p>These terms and conditions outline the rules and regulations for the use of Smart Annoyers Software Solutions' services.</p>
          </TabPane>
          <TabPane tab="User Agreement" key="2">
            <p>By accessing our services, you agree to be bound by these terms and conditions, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
          </TabPane>
          <TabPane tab="Intellectual Property" key="3">
            <p>The content, features, and functionality of our services are owned by Smart Annoyers Software Solutions and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>
          </TabPane>
          <TabPane tab="Limitations" key="4">
            <p>In no event shall Smart Annoyers Software Solutions be liable for any damages arising out of the use or inability to use our services.</p>
          </TabPane>
        </Tabs>
      </Modal>
    </StyledSection>
  );
};



const PolicyCard = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  }
`;

const StyledButton = styled(Button)`
  background: linear-gradient(45deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%);
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

const IconCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(45deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%);
  margin: 0 auto 20px;
  font-size: 30px;
  color: #fff;
`;

const RefundPolicySection = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleOk = () => setIsModalVisible(false);
  const handleCancel = () => setIsModalVisible(false);

  return (
    <StyledSection>
      <Row justify="center" gutter={[32, 32]}>
        <Col xs={24} sm={24} md={20} lg={18} xl={16}>
          <PolicyCard>
            <Title level={2} style={{ textAlign: 'center', marginBottom: '40px', color: '#FF6A88' }}>
              Return, Refund and Cancellation Policy
            </Title>
            <Row gutter={[32, 32]}>
              <Col xs={24} md={8}>
                <IconCircle>
                  <RollbackOutlined />
                </IconCircle>
                <Title level={4} style={{ textAlign: 'center' }}>Returns</Title>
                <Paragraph style={{ textAlign: 'center' }}>
                  Learn about our return process and eligible items.
                </Paragraph>
              </Col>
              <Col xs={24} md={8}>
                <IconCircle>
                  <DollarOutlined />
                </IconCircle>
                <Title level={4} style={{ textAlign: 'center' }}>Refunds</Title>
                <Paragraph style={{ textAlign: 'center' }}>
                  Understand our refund policy and processing times.
                </Paragraph>
              </Col>
              <Col xs={24} md={8}>
                <IconCircle>
                  <CloseCircleOutlined />
                </IconCircle>
                <Title level={4} style={{ textAlign: 'center' }}>Cancellations</Title>
                <Paragraph style={{ textAlign: 'center' }}>
                  Find out how to cancel orders or subscriptions.
                </Paragraph>
              </Col>
            </Row>
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <StyledButton onClick={showModal}>Read Full Policy</StyledButton>
            </div>
          </PolicyCard>
        </Col>
      </Row>
      <Modal
        title="Smart Annoyers Software Solutions - Refund Policy"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        footer={[
          <Button key="close" onClick={handleCancel}>
            Close
          </Button>
        ]}
      >
        <Timeline>
          <Timeline.Item color="red">
            <Title level={4}>No Refunds for Subscription Fees</Title>
            <Paragraph>
              Smart Annoyers Software Solutions will not refund the subscription fee paid for the plans.
            </Paragraph>
          </Timeline.Item>
          <Timeline.Item color="green">
            <Title level={4}>Failed Transactions</Title>
            <Paragraph>
              A failed transaction while paying online towards Smart Annoyers will be settled by Smart Annoyers Software Solutions within 7 working days, and will be refunded to the original payment source.
            </Paragraph>
          </Timeline.Item>
          <Timeline.Item color="blue">
            <Title level={4}>Cancellation Policy</Title>
            <Paragraph>
              Details about cancellation policy would be listed here.
            </Paragraph>
          </Timeline.Item>
          <Timeline.Item color="orange">
            <Title level={4}>Contact Us</Title>
            <Paragraph>
              If you have any questions about our Return, Refund, and Cancellation Policy, please contact our customer support team.
            </Paragraph>
          </Timeline.Item>
        </Timeline>
      </Modal>
    </StyledSection>
  );
};

const SubscriptionSection = () => {
  const navigate = useNavigate();

  const subscriptionPlans = [
    {
      title: "Basic Plan",
      price: "₹999",
      duration: "Per Month",
      features: [
        "Manage up to 50 tenants",
        "Basic reporting",
        "Email support",
      ],
    },
    {
      title: "Pro Plan",
      price: "₹1999",
      duration: "Per Month",
      features: [
        "Manage up to 200 tenants",
        "Advanced reporting",
        "Priority email support",
        "Custom branding",
      ],
    },
    {
      title: "Enterprise Plan",
      price: "Contact Us",
      duration: "Custom Pricing",
      features: [
        "Unlimited tenants",
        "Full access to all features",
        "Dedicated account manager",
        "24/7 support",
      ],
    },
  ];

  return (
    <Row
      justify="center"
      style={{ 
        width: '100%', 
        padding: '60px 20px', 
        backgroundColor: '#e9ecef',
      }}
    >
      <Col xs={24} sm={24} md={20} lg={18} xl={16}>
        <Title
          level={1}
          style={{
            textAlign: 'center',
            fontFamily: "'Montserrat', sans-serif",
            color: '#343a40',
            marginBottom: '30px',
            fontSize: '2.5rem',
            fontWeight: 700,
            letterSpacing: '-0.5px',
          }}
        >
          Subscription Plans
        </Title>
        <Paragraph
          style={{
            width: '100%',
            fontSize: '18px',
            color: '#495057',
            textAlign: 'center',
            margin: '0 auto 40px',
            lineHeight: '1.8',
            maxWidth: '800px',
          }}
        >
          Choose the plan that best fits your hostel management needs. Upgrade anytime to access more features and better support.
        </Paragraph>

        <Row gutter={[16, 16]} justify="center">
          {subscriptionPlans.map((plan, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <StyledSubscriptionCard>
                <Title level={3} style={{ color: 'white', marginBottom: '20px' }}>
                  {plan.title}
                </Title>
                <Title level={2} style={{ color: 'white' }}>
                  {plan.price}
                </Title>
                <Paragraph style={{ color: 'white' }}>
                  {plan.duration}
                </Paragraph>
                <ul style={{ color: 'white', textAlign: 'left', paddingLeft: '20px', marginBottom: '20px' }}>
                  {plan.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                <SubscriptionButton
                  type="primary"
                  size="large"
                  onClick={() => navigate('/subscribe')}
                >
                  Subscribe Now
                </SubscriptionButton>
              </StyledSubscriptionCard>
            </Col>
          ))}
        </Row>
        
      </Col>
    </Row>
  );
};
const Home = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);
  const features = [
    { icon: <WifiOutlined />, title: "Smart Room Management", description: "AI-powered room allocation and maintenance tracking", route: "/smart-room" },
    { icon: <HomeOutlined />, title: "Tenant Harmony", description: "Personalized experiences and community building features", route: "/tenant-harmony" },
    { icon: <SecurityScanOutlined />, title: "Predictive Analytics", description: "Forecast occupancy and optimize operations", route: "/predictive-analytics" },
    { icon: <FaRupeeSign  />, title: "Financial Wizardry", description: "Automated invoicing and smart payment reminders", route: "/financial" },
    { icon: <BarChartOutlined />, title: "Performance Insights", description: "Real-time dashboards for informed decision making", route: "/performance" },
    { icon: <RocketOutlined />, title: "Continuous Innovation", description: "Regular updates with cutting-edge features", route: "/innovation" },
  ];
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const showVideoModal = () => {
    setIsVideoModalVisible(true);
  };

  const handleVideoModalCancel = () => {
    setIsVideoModalVisible(false);
  };

  const handleFreeTrial = () => {
    setIsModalVisible(false);
    localStorage.setItem('isFreeTrial', 'true');
    navigate('/login', { state: { isTrial: true } });
  };

  const handleSubscription = () => {
    setIsModalVisible(false);
    navigate('/subscribe');
  };

  const handleLogin = () => {
    setIsModalVisible(false);
    localStorage.setItem('isFreeTrial', 'false');
    navigate('/login');
  };

  return (
    <div style={{ background: 'white', overflowX: 'hidden' }}>
      <RealTimeHeader />
      
      {/* Enhanced Carousel */}
      <Carousel
        autoplay
        autoplaySpeed={3000}
        // effect="fade"
        style={{
          width: "100%",
          height: "90vh",
          overflow: "hidden",
        }}
      >
        {carouselItems.map((item, index) => (
          <div key={index}>
            <div
              style={{
                width: "100%",
                height: "90vh",
                backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "#fff",
                textAlign: "center",
                padding: "0 20px",
              }}
            >
              <h2
                style={{
                  fontSize: "4rem",
                  fontWeight: "900",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  marginBottom: "20px",
                  fontFamily: "'Raleway', sans-serif",
                  textShadow: "2px 2px 4px #000000",
                }}
              >
                <Typewriter text={item.text} />
              </h2>
              <p
                style={{
                  fontSize: "1.5rem",
                  maxWidth: "800px",
                  lineHeight: "1.6",
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                {/* Experience the future of hostel management with our innovative solutions. */}
              </p>
            </div>
          </div>
        ))}
      </Carousel>
      <Row justify="center" style={{ marginBottom: 40, background: 'black', padding: '40px 0' }}>
      <Col xs={22} sm={20} md={16} lg={12} xl={10}>
        <Title level={2} style={{ textAlign: "center", color: 'white' }}>
          Our Impact
        </Title>
        <Row gutter={16}>
          <Col span={8}>
            <Statistic
              title={<span style={{ color: 'white' }}>Happy Hostels</span>}
              valueRender={() => (
                <CountUp end={1000} duration={3} />
              )}
              prefix={<HomeOutlined style={{ color: 'white' }} />}
              valueStyle={{ color: 'white' }}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title={<span style={{ color: 'white' }}>Satisfied Tenants</span>}
              valueRender={() => (
                <CountUp end={50000} duration={3} />
              )}
              prefix={<WifiOutlined style={{ color: 'white' }} />}
              valueStyle={{ color: 'white' }}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title={<span style={{ color: 'white' }}>Cities</span>}
              valueRender={() => (
                <CountUp end={50} duration={3} />
              )}
              prefix={<RocketOutlined style={{ color: 'white' }} />}
              valueStyle={{ color: 'white' }}
            />
          </Col>
        </Row>
      </Col>
    </Row>
      <Row
        justify="center"
        style={{ 
          width: '100%', 
          padding: '60px 20px', 
          backgroundColor: '#f8f9fa',
          backgroundImage: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
        }}
      >
        <Col xs={24} sm={24} md={20} lg={18} xl={16}>
          <Title
            level={1}
            style={{
              textAlign: 'center',
              fontFamily: "'Montserrat', sans-serif",
              color: '#343a40',
              marginBottom: '30px',
              fontSize: '2.5rem',
              fontWeight: 700,
              letterSpacing: '-0.5px'
            }}
          >
            
            Revolutionize Your Hostel Management
          </Title>
          <Paragraph
            style={{
              width: '100%',
              fontSize: '18px',
              color: '#495057',
              textAlign: 'center',
              margin: '0 auto 40px',
              lineHeight: '1.8',
              maxWidth: '800px'
            }}
          >
            Smart Hostel Master: The cutting-edge solution for modern hostel operations. Streamline your processes, enhance guest experiences, and boost your efficiency with our comprehensive management platform.
          </Paragraph>
          <div style={{ textAlign: 'center' }}>
          <StyledButton
      type="primary"
      onClick={showVideoModal}
      style={{              marginBottom: '30px',
      }}
    >
      <PlayCircleOutlined /> 
      Play Demo
    </StyledButton>

          </div>

          <div style={{ textAlign: 'center' }}>
            <StyledButton
              type="primary"
              size="large"
              onClick={showModal}
            >
              Get Started
            </StyledButton>

          </div>

        </Col>
      </Row>
      <Row justify="center" style={{ marginBottom: 40, padding: '40px 0px', background: '#f0f2f5' }}>
        <Col span={22}>
          <Title level={2} style={{ textAlign: "center", marginBottom: 40 }}>
            Our Features
          </Title>
          <Carousel
          autoplay
          autoplaySpeed={2000}
            slidesToShow={3}
            slidesToScroll={1}
            dots={true}
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 2,
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 1,
                }
              }
            ]}
          >
            {features.map((feature, index) => (
              <div key={index} style={{ padding: '10 10px' }}>
                <FeatureCard 
                  feature={feature} 
                  onClick={() => navigate(feature.route)}
                />
              </div>
            ))}
          </Carousel>
          
        </Col>
      </Row>
      <SubscriptionSection/>


      <Modal
  title="Choose Your Path"
  visible={isModalVisible}
  onCancel={handleModalCancel}
  footer={null}
>
  <Row gutter={[16, 16]} justify="center">
    <Col span={12}>
      <Card
        hoverable
        onClick={handleFreeTrial}
        style={{ textAlign: 'center' }}
      >
        <Title level={3}>Free Trial</Title>
        <Paragraph>Try our platform for 14 days, no credit card required.</Paragraph>
        <StyledButton size="small" type="primary">Start Free Trial</StyledButton>
      </Card>
    </Col>
    <Col span={12}>
      <Card
        hoverable
        onClick={handleSubscription}
        style={{ textAlign: 'center' }}
      >
        <Title level={3}>Subscription</Title>
        <Paragraph>Choose a plan that fits your needs and get full access.</Paragraph>
        <StyledButton type="primary">View Plans</StyledButton>
      </Card>
    </Col>
    <Col span={12}>
      <Card
        hoverable
        onClick={handleLogin}
        style={{ textAlign: 'center' }}
      >
        <Title level={3}>Login</Title>
        <Paragraph>Already have an account? Sign in now.</Paragraph>
        <StyledButton size="small" type="primary">Login</StyledButton>
      </Card>
    </Col>
  </Row>
</Modal>

      <Modal
        title="Product Demo"
        visible={isVideoModalVisible}
        onCancel={handleVideoModalCancel}
        footer={null}
        width={800}
      >
        <YouTube
          videoId="DQG6ldU-9WE"
          opts={{
            height: '450',
            width: '100%',
            playerVars: {
              autoplay: 1,
            },
          }}
        />
      </Modal>
      <PrivacyPolicySection />
      <FAQSection />
      <TermsAndConditionsSection />
      <RefundPolicySection />
      <HowToUseSection/>
      <Footer style={{ textAlign: "center", padding: "0px", background: 'black', color: 'white' }}>
        <AppFooter />
      </Footer>
    </div>
  );
};

export default Home;