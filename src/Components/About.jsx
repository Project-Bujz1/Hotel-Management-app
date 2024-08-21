import React, { useState } from 'react';
import { Row, Col, Carousel, Modal, Card, Button, Typography, Statistic , Layout } from 'antd';
import { CaretLeftOutlined, CaretRightOutlined, HomeOutlined, WifiOutlined, RocketOutlined, LoginOutlined, PlayCircleOutlined, BarChartOutlined } from '@ant-design/icons';
import { FaRupeeSign } from 'react-icons/fa';
import YouTube from 'react-youtube';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Typewriter from './TypeWriter';
import FeatureCard from './FeatureCard';
import SubscriptionSection from './SubscriptionSection';
import PrivacyPolicySection from './PrivacyPolicySection';
import FAQSection from './FAQSection';
import TermsAndConditionsSection from './TermsAndConditionsSection';
import RefundPolicySection from './RefundPolicySection';
import HowToUseSection from './HowToUseSection';
import BenefitsSection from './BenefitsSection';
import AboutUsSection from './AboutUs';
import RealTimeHeader from './RealTimeHeader';
import AppFooter from './AppFooter';
import view1 from '../assets/tech-1.jpg';
import view2 from '../assets/view-4.jpg';
import view3 from '../assets/view-2.jpg';
import view4 from '../assets/view-1.jpg';
import view5 from '../assets/view-3.jpg';
import view6 from '../assets/view-5.jpg';
import view7 from '../assets/view-6.jpg';
import {
  SecurityScanOutlined,
  FileProtectOutlined, SafetyOutlined, QuestionCircleOutlined, RollbackOutlined, DollarOutlined, CloseCircleOutlined , EyeOutlined, LockOutlined , PlusOutlined, MinusOutlined ,  UserOutlined, 
  MobileOutlined, 
  LaptopOutlined,
  ClockCircleOutlined, 
  GithubOutlined, LinkedinOutlined, TwitterOutlined,  InfoCircleOutlined, SmileOutlined, CheckCircleOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

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

const carouselItems = [
  { text: "Revolutionize Hostel Management", image: view1 },
  { text: "Smart Solutions for Modern Living", image: view2 },
  { text: "Smart Hostel Master - Your Digital Concierge", image: view3 },
  { text: "Effortless Room Management", image: view4 },
  { text: "Seamless Tenant Experiences", image: view5 },
  { text: "Data-Driven Decision Making", image: view6 },
  { text: "Access from anywhere and at anytime", image: view7 },
];

const StyledPrevArrow = styled(CaretLeftOutlined)`
  font-size: 48px;
  color: #000;
`;

const StyledNextArrow = styled(CaretRightOutlined)`
  font-size: 48px;
  color: #000;
`;

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);
  const navigate = useNavigate();
  const { Footer } = Layout;

  const features = [
    { icon: <WifiOutlined />, title: "Smart Room Management", description: "AI-powered room allocation and maintenance tracking", route: "/smart-room" },
    { icon: <HomeOutlined />, title: "Tenant Harmony", description: "Personalized experiences and community building features", route: "/tenant-harmony" },
    { icon: <SecurityScanOutlined />, title: "Predictive Analytics", description: "Forecast occupancy and optimize operations", route: "/predictive-analytics" },
    { icon: <FaRupeeSign />, title: "Financial Wizardry", description: "Automated invoicing and smart payment reminders", route: "/financial" },
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

  const handleLogin = (role) => {
    setIsModalVisible(false);
    localStorage.setItem('isFreeTrial', 'false');
    navigate('/login');
    localStorage.setItem('role', role);
  };

  return (
    <div style={{ background: 'white', overflowX: 'hidden' }}>
      <RealTimeHeader />

      {/* Enhanced Carousel */}
      <Carousel
        autoplay
        autoplaySpeed={3000}
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
            </div>
          </div>
        ))}
      </Carousel>

      <Row justify="center" style={{ marginBottom: 40, background: 'linear-gradient(135deg, #4ca1af 0%, #c4e0e5 100%)', padding: '40px 0' }}>
        <Col xs={22} sm={20} md={16} lg={12} xl={10}>
          <Title level={2} style={{ textAlign: "center", color: 'white' }}>Our Impact</Title>
          <Row gutter={16}>
            {[
              { title: 'Happy Hostels', icon: <HomeOutlined />, value: 1000 },
              { title: 'Satisfied Tenants', icon: <WifiOutlined />, value: 50000 },
              { title: 'Cities', icon: <RocketOutlined />, value: 50 },
            ].map((stat, index) => (
              <Col span={8} key={index}>
                <Statistic
                  title={<span style={{ color: 'white' }}>{stat.title}</span>}
                  valueRender={() => <Typewriter text={stat.value.toLocaleString()} />}
                  prefix={<span style={{ color: 'white' }}>{stat.icon}</span>}
                  valueStyle={{ color: 'white' }}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      <Row justify="center" style={{ marginBottom: 40, padding: '40px 0px', background: '#f0f2f5' }}>
        <Col span={22}>
          <Title level={2} style={{ textAlign: "center", marginBottom: 40 }}>Our Features</Title>
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
                <FeatureCard feature={feature} onClick={() => navigate(feature.route)} />
              </div>
            ))}
          </Carousel>
        </Col>
      </Row>

      <SubscriptionSection />
      <PrivacyPolicySection />
      <FAQSection />
      <TermsAndConditionsSection />
      <RefundPolicySection />
      <HowToUseSection />
      <BenefitsSection />
      <AboutUsSection />

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
