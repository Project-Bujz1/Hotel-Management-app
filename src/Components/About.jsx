import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Carousel, Button, Layout, Statistic, Card, Modal, Collapse,Tabs, Timeline, Switch , Avatar, Tooltip, Space } from 'antd';
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
  ClockCircleOutlined, 
  GithubOutlined, LinkedinOutlined, TwitterOutlined,   LoginOutlined , InfoCircleOutlined, SmileOutlined, CheckCircleOutlined
} from '@ant-design/icons';
import view1 from '../assets/tech-1.jpg';
import view2 from '../assets/view-4.jpg';
import view3 from '../assets/view-2.jpg';
import view4 from '../assets/view-1.jpg';
import view5 from '../assets/view-3.jpg';
import view6 from '../assets/view-5.jpg';
import view7 from '../assets/view-6.jpg';
import AppFooter from './AppFooter';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;
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
          background:
            'linear-gradient(135deg, #4ca1af 0%, #c4e0e5 100%)',
          color: 'white'
        }}
      >
        <Col>
          <img
            src={logo}
            alt="Logo"
            style={{ height: '40px', marginRight: '10px' }}
          />
          <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
            Smart Annoyers
          </span>
        </Col>
        <Col>
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
      marginLeft: '850px',
      cursor: "pointer", // Cursor effect
    }}
    className="styled-button"
  >
  </Button>
        </Col>
        <Col>
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
  >
    <Row gutter={[16, 16]} justify="center">
      <Col span={12}>
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
      <Col span={12}>
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
      <Col span={12}>
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
      <Col span={12}>
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
            background: 'linear-gradient(135deg, #4ca1af 0%, #c4e0e5 100%)',
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

const TeamMember = ({ name, role, avatar, github, linkedin, twitter }) => (
  <Card hoverable style={{ textAlign: 'center' }}>
    <Avatar size={120} src={avatar} />
    <Title level={4} style={{ marginTop: '20px', marginBottom: '5px' }}>{name}</Title>
    <Text type="secondary">{role}</Text>
    <div style={{ marginTop: '20px' }}>
      {github && (
        <Tooltip title="GitHub">
          <a href={github} target="_blank" rel="noopener noreferrer">
            <GithubOutlined style={{ fontSize: '24px', margin: '0 10px' }} />
          </a>
        </Tooltip>
      )}
      {linkedin && (
        <Tooltip title="LinkedIn">
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            <LinkedinOutlined style={{ fontSize: '24px', margin: '0 10px' }} />
          </a>
        </Tooltip>
      )}
      {twitter && (
        <Tooltip title="Twitter">
          <a href={twitter} target="_blank" rel="noopener noreferrer">
            <TwitterOutlined style={{ fontSize: '24px', margin: '0 10px' }} />
          </a>
        </Tooltip>
      )}
    </div>
  </Card>
);

const AboutUsSection = () => {
  const team = [
    {
      name: "Akash",
      role: "Lead Developer",
      avatar: "path_to_akash_image.jpg",
      github: "https://github.com/Akash",
      linkedin: "https://linkedin.com/in/Akash",
      twitter: "https://twitter.com/Akash",
    },
    {
      name: "Akash",
      role: "Lead Developer",
      avatar: "path_to_akash_image.jpg",
      github: "https://github.com/Akash",
      linkedin: "https://linkedin.com/in/Akash",
      twitter: "https://twitter.com/Akash",
    },
    {
      name: "Akash",
      role: "Lead Developer",
      avatar: "path_to_akash_image.jpg",
      github: "https://github.com/Akash",
      linkedin: "https://linkedin.com/in/Akash",
      twitter: "https://twitter.com/Akash",
    },
    
    // Add more team members here
  ];

  return (
    <StyledSection style={{ background: '#f5f5f5' }}>
      <div style={{ textAlign: 'center', padding: '50px 0' }}>
        <Title level={2}>About Us</Title>
        <Paragraph style={{ marginBottom: '50px' }}>
          We innovate every day to make life easier for our customers.
        </Paragraph>
        <Row gutter={[32, 32]} justify="center">
          <Col xs={24} sm={12} md={6}>
            <GlassCard>
              <IconBox>
                <InfoCircleOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
              </IconBox>
              <Title level={4} style={{ textAlign: 'center' }}>Customer Service</Title>
              <Paragraph>
                Customer Service And Delight Are Smart Annoyers's Core Values.
              </Paragraph>
            </GlassCard>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <GlassCard>
              <IconBox>
                <SmileOutlined style={{ fontSize: '32px', color: '#52c41a' }} />
              </IconBox>
              <Title level={4} style={{ textAlign: 'center' }}>Customer Feedback</Title>
              <Paragraph>
                Smart Annoyers is developed with customer feedback and ideas, fitting well with the co-living industry.
              </Paragraph>
            </GlassCard>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <GlassCard>
              <IconBox>
                <LockOutlined style={{ fontSize: '32px', color: '#faad14' }} />
              </IconBox>
              <Title level={4} style={{ textAlign: 'center' }}>Honesty & Due Diligence</Title>
              <Paragraph>
                All our contracts and agreements are verified and certified. We ensure data protection and privacy.
              </Paragraph>
            </GlassCard>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <GlassCard>
              <IconBox>
                <CheckCircleOutlined style={{ fontSize: '32px', color: '#eb2f96' }} />
              </IconBox>
              <Title level={4} style={{ textAlign: 'center' }}>Quality Delivered</Title>
              <Paragraph>
                World-class quality output is provided 24x7 with a customer-centric focus.
              </Paragraph>
            </GlassCard>
          </Col>
        </Row>
        <Title level={3} style={{ marginTop: '50px' }}>Meet the Innovators Behind Smart Hostel Master </Title>
      <Row gutter={[32, 32]} justify="center">
        {team.map((member, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <TeamMember {...member} />
          </Col>
        ))}
      </Row>
    </div>
  </StyledSection>
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
  color: #4ca1af;
  animation: ${float} 3s ease-in-out infinite;
`;

const StepNumber = styled.div`
  position: absolute;
  top: -4px;
  left: -4px;
  width: 40px;
  height: 40px;
  background: #4ca1af;
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
  background: ${props => props.active ? 'linear-gradient(135deg, #4ca1af 0%, #c4e0e5 100%)' : 'transparent'};
  color: ${props => props.active ? 'white' : 'linear-gradient(135deg, #4ca1af 0%, #c4e0e5 100%)'};
  border: 2px solid #4ca1af;
  padding: 10px 20px;
  margin: 0 10px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #4ca1af;
    color: white;
  }
`;

const BenefitsSection = () => {
  const [showAfter, setShowAfter] = useState(false);

  const benefits = [
    {
      title: "Time Management",
      before: "Hours spent on manual record-keeping",
      after: "Automated systems save 70% of admin time",
      icon: <ClockCircleOutlined />,
    },
    {
      title: "Efficiency",
      before: "Slow, error-prone processes",
      after: "Streamlined operations with 99% accuracy",
      icon: <RocketOutlined />,
    },
    {
      title: "Tenant Satisfaction",
      before: "Limited communication channels",
      after: "24/7 digital support and feedback system",
      icon: <TeamOutlined />,
    },
    {
      title: "Insights",
      before: "Guesswork in decision-making",
      after: "Data-driven insights for smarter choices",
      icon: <BarChartOutlined />,
    },
  ];

  return (
    <div style={{ padding: '50px 0', background: '#f0f2f5' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>
        Transform Your Hostel Experience
      </Title>
      <Row justify="center" style={{ marginBottom: '20px' }}>
        <Switch
          checkedChildren="After"
          unCheckedChildren="Before"
          onChange={setShowAfter}
        />
      </Row>
      <Row gutter={[16, 16]} justify="center">
        {benefits.map((benefit, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card
              hoverable
              style={{ height: '100%', textAlign: 'center' }}
              cover={
                <div style={{ fontSize: '48px', padding: '24px', color: showAfter ? '#52c41a' : '#faad14' }}>
                  {benefit.icon}
                </div>
              }
            >
              <Card.Meta
                title={benefit.title}
                description={
                  <Typography.Text strong>
                    {showAfter ? benefit.after : benefit.before}
                    </Typography.Text>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

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

const StyledSubscriptionCard = styled(Card)`
  border-radius: 20px;
  text-align: center;
  background: linear-gradient(135deg, #4ca1af 0%, #c4e0e5 100%);
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
  background-color: white !important;
  border-color: white !important;
  color: #4ca1af !important;
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



const PrivacyPolicySection = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleOk = () => setIsModalVisible(false);
  const handleCancel = () => setIsModalVisible(false);

  return (
    <StyledSection>
      <Row justify="center" gutter={[32, 32]}>
        <Col xs={24} sm={24} md={20} lg={18} xl={16}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '40px', color: '#4ca1af' }}>
            Your Privacy Matters to Us
          </Title>
          <Row gutter={[32, 32]}>
            <Col xs={24} md={8}>
              <StyledCard>
                <IconBox>
                  <FileProtectOutlined />
                </IconBox>
                <Title level={4} style={{ color: '#4ca1af' }}>Protected</Title>
                <Paragraph>Your data is safeguarded with industry-standard security measures.</Paragraph>
              </StyledCard>
            </Col>
            <Col xs={24} md={8}>
              <StyledCard>
                <IconBox>
                  <EyeOutlined />
                </IconBox>
                <Title level={4} style={{ color: '#4ca1af' }}>Transparent</Title>
                <Paragraph>We're clear about how we collect and use your information.</Paragraph>
              </StyledCard>
            </Col>
            <Col xs={24} md={8}>
              <StyledCard>
                <IconBox>
                  <LockOutlined />
                </IconBox>
                <Title level={4} style={{ color: '#4ca1af' }}>Control</Title>
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
        title="Smart Annoyers Privacy Policy"
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
            <p>
              Smart Annoyers technologies pvt ltd built the Hostel Master. This SERVICE is provided by Smart Annoyers technologies pvt ltd at no cost to end user and is intended for use as is.
            </p>
            <p>
              Smart Annoyers is used by Administrators of University & Private Hostels. The hostel administration need identification data for a better experience & safety of other residents, while using our Service, they ask for following data, however not all data is mandatory always. We may require you to provide us with certain personally identifiable information, including but not limited to Name, mobile number, address, location (ONLY Limited For emergency support by your community).
            </p>
            <p>
              Resident's Profile image: For identification and mandated by all governments, these hostels may ask you to upload your profile image.
            </p>
            <p>
              Academic information: The University hostel administrators may ask you to update your academic information like course, branch, year for identification & communication purposes.
            </p>
            <p>
              The information that we request will be retained by us and used as described in this privacy policy. At NO stage of business, we share or exchange your information to vendor or third party.
            </p>
          </Panel>
          <Panel header="Log Data - ERROR / Technical faults" key="2">
            <p>
              We inform you that during use of our Service, in case of an error in the app we collect data and information (through internal debugging solution) on your phone called Log Data. This is a worldwide acceptable & standard requirement for all technical/Software solutions.
            </p>
            <p>
              This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics. This information remains confidential always.
            </p>
          </Panel>
          <Panel header="Security" key="3">
            <p>
              We safeguard your Personal Information and use commercially acceptable means of protecting it. Force Majeure clause is applicable for circumstances unforeseen in commercial, natural distress/Disasters, and Government interventions.
            </p>
          </Panel>
          <Panel header="Links to Other Sites" key="4">
            <p>
              This Service may contain links to external sites. If you click on a third-party link, you will be redirected to that site/online services. External sites are not operated by us and we strongly advise you to review the Privacy Policy of these external vendor services. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
            </p>
            <p>
              Smart Annoyers does not share information with third-party /external websites.
            </p>
          </Panel>
          <Panel header="Children’s Privacy" key="5">
            <p>
              These Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do necessary actions.
            </p>
          </Panel>
          <Panel header="Changes to This Privacy Policy" key="6">
            <p>
              We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately after they are posted on this page.
            </p>
          </Panel>
          <Panel header="Contact Us" key="7">
            <p>
              If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us.
            </p>
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
                <Title level={4} style={{ textAlign: 'center' }}>License</Title>
                <Paragraph style={{ textAlign: 'center' }}>
                  Any use of Smart Annoyers logo is prohibited without prior approval from Smart Annoyers Technologies. Smart Annoyers applications and its source code are proprietary and not distributable under any circumstances.
                </Paragraph>
              </Col>
              <Col xs={24} md={8}>
                <IconBox>
                  <SafetyOutlined />
                </IconBox>
                <Title level={4} style={{ textAlign: 'center' }}>Subscription & Payment</Title>
                <Paragraph style={{ textAlign: 'center' }}>
                  A valid subscription is required to use Smart Annoyers. You authorize us to remind you about subscription expiry. Refunds are not provided for subscription fees.
                </Paragraph>
              </Col>
              <Col xs={24} md={8}>
                <IconBox>
                  <QuestionCircleOutlined />
                </IconBox>
                <Title level={4} style={{ textAlign: 'center' }}>Support</Title>
                <Paragraph style={{ textAlign: 'center' }}>
                  Our support team is here to assist you. For emergencies, contact the CEO directly. We aim to provide the best customer experience.
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
          <TabPane tab="License" key="1">
            <p>Hostel Master and its source code are property of Smart Annoyers Technologies. Any use of the Smart Annoyers logo is prohibited without prior approval. The application and its APIs are not for public use; a subscription is required for access.</p>
          </TabPane>
          <TabPane tab="Subscription & Payment" key="2">
            <p>A valid subscription is required for use. You authorize Smart Annoyers to remind you about upcoming expirations. Renewals should be done in advance. Refunds are not provided except for failed transactions, which will be handled within 7 working days.</p>
          </TabPane>
          <TabPane tab="Support" key="3">
            <p>We are committed to providing the best support. Contact our support team for assistance. In emergencies, you can email the CEO directly for urgent matters.</p>
          </TabPane>
          <TabPane tab="Limitations of Liability" key="4">
            <p>Smart Annoyers aims to offer the best customer experience and technical support. However, we limit our liability for any damages arising from the use or inability to use our services.</p>
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
            <Title level={2} style={{ textAlign: 'center', marginBottom: '40px', color: '#4ca1af' }}>
              Return, Refund and Cancellation Policy
            </Title>
            <Row gutter={[32, 32]}>
              <Col xs={24} md={8}>
                <IconBox>
                  <RollbackOutlined />
                </IconBox>
                <Title level={4} style={{ textAlign: 'center' }}>Returns</Title>
                <Paragraph style={{ textAlign: 'center' }}>
                  Learn about our return process and eligible items.
                </Paragraph>
              </Col>
              <Col xs={24} md={8}>
                <IconBox>
                  <DollarOutlined />
                </IconBox>
                <Title level={4} style={{ textAlign: 'center' }}>Refunds</Title>
                <Paragraph style={{ textAlign: 'center' }}>
                  Understand our refund policy and processing times.
                </Paragraph>
              </Col>
              <Col xs={24} md={8}>
                <IconBox>
                  <CloseCircleOutlined />
                </IconBox>
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
                  fontSize: "3rem",
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
      <Row justify="center" style={{ marginBottom: 40, background: 'linear-gradient(135deg, #4ca1af 0%, #c4e0e5 100%)', padding: '40px 0' }}>
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
    <Col span={12}>
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
    <Col span={12}>
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
    <Col span={12}>
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
      <BenefitsSection />
      <AboutUsSection />
       <Footer style={{ textAlign: "center", padding: "0px", background: 'black', color: 'white' }}>
        <AppFooter />
      </Footer>
    </div>
  );
};

export default Home;