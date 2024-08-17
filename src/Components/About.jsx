import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Carousel, Button, Layout, Statistic, Card, Modal } from 'antd';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import logo from "../assets/logo-transparent-png.png";
import hostelIcon from "../assets/left-background.png";
import hostel from "../assets/right-background.png";
import CountUp from 'react-countup';
import styled from 'styled-components';
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
  PlayCircleOutlined  
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

const StyledButton = styled(Button)`
  border-radius: 50px;
  padding: 0 40px;
  height: 50px;
  font-size: 18px;
  background-color: black !important;
  border-color: white !important;
  color: white !important;
  font-weight: 600;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.15s ease;

  &:hover {
    background-color: white !important;
    border-color: black !important;
    color: black !important;
  }
`;


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
    navigate('/login', { state: { isTrial: true } });
  };

  const handleSubscription = () => {
    setIsModalVisible(false);
    navigate('/subscribe');
  };

  const handleLogin = () => {
    setIsModalVisible(false);
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

      <Footer style={{ textAlign: "center", padding: "0px", background: 'black', color: 'white' }}>
        <AppFooter />
      </Footer>
    </div>
  );
};

export default Home;