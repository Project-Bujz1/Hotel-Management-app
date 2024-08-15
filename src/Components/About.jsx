import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Carousel, Button, Layout, Statistic, Card } from 'antd';
import logo from "../assets/logo-transparent-png.png";
import {
  WifiOutlined,
  HomeOutlined,
  SecurityScanOutlined,
  RocketOutlined,
  DollarOutlined,
  BarChartOutlined,
  DashboardOutlined,
  TeamOutlined,
  SettingOutlined 
} from '@ant-design/icons';
import viewPoint from '../assets/viewPoint.jpg';
import arealView from '../assets/arealView.jpg';
import view1 from '../assets/view-1.jpg';
import view2 from '../assets/view-2.jpg';
import view3 from '../assets/view-3.jpg';
import view4 from '../assets/view-4.jpg';
import view5 from '../assets/view-5.jpg';
import view6 from '../assets/view-6.jpg';
import AppFooter from './AppFooter';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;
const { Footer } = Layout;

const carouselItems = [
  { text: "Revolutionizing Hostel Management", image: view1 },
  { text: "Smart Solutions for Modern Living", image: view2 },
  { text: "Smart Hostel Master - Your Digital Concierge", image: view3 },
  { text: "Effortless Room Management", image: view4 },
  { text: "Seamless Tenant Experiences", image: view5 },
  { text: "Data-Driven Decision Making", image: view6 },
  { text: "Instant Issue Resolution", image: viewPoint },
  { text: "Automated Financial Management", image: arealView },
];

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
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Row justify="space-between" align="middle" style={{ padding: '10px 20px', background: 'black', color: 'white' }}>
           <Col>
        <img src={logo} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Smart Annoyers</span>
      </Col>
      <Col>
        <span style={{ fontSize: '16px' }}>{time.toLocaleString()}</span>
      </Col>
    </Row>
  );
};

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ background: 'white', overflowX: 'hidden' }}>
      <RealTimeHeader />
      <Carousel autoplay effect="fade" style={{ width: "100%", height: "60vh", overflow: "hidden" }}>
        {carouselItems.map((item, index) => (
          <div key={index}>
            <div
              style={{
                width: "100%",
                height: "60vh",
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#fff",
                textTransform: "uppercase",
                fontFamily: "'Raleway', sans-serif",
                textShadow: "2px 2px 4px #000000",
                fontSize: "3rem",
                fontWeight: "900",
                lineHeight: "3.5rem",
              }}
            >
              <Typewriter text={item.text} />
            </div>
          </div>
        ))}
      </Carousel>


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
      <Button
        type="primary"
        size="large"
        onClick={() => navigate('/login')}
        style={{
          borderRadius: '50px',
          padding: '0 40px',
          height: '50px',
          fontSize: '18px',
          backgroundColor: '#007bff',
          borderColor: '#007bff',
          color: 'white',
          fontWeight: 600,
          boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.15s ease'
        }}
      >
        Get Started with a Free Demo
      </Button>
    </div>
  </Col>
</Row>
      <Row gutter={[16, 16]} justify="center" style={{ marginBottom: 40 }}>
        {[
          { icon: <WifiOutlined style={{ color: 'white' }} />, title: "Smart Room Management", description: "AI-powered room allocation and maintenance tracking" },
          { icon: <HomeOutlined style={{ color: 'white' }} />, title: "Tenant Harmony", description: "Personalized experiences and community building features" },
          { icon: <SecurityScanOutlined style={{ color: 'white' }} />, title: "Predictive Analytics", description: "Forecast occupancy and optimize operations" },
          { icon: <DollarOutlined style={{ color: 'white' }} />, title: "Financial Wizardry", description: "Automated invoicing and smart payment reminders" },
          { icon: <BarChartOutlined style={{ color: 'white' }} />, title: "Performance Insights", description: "Real-time dashboards for informed decision making" },
          { icon: <RocketOutlined style={{ color: 'white' }} />, title: "Continuous Innovation", description: "Regular updates with cutting-edge features" },
        ].map((feature, index) => (
          <Col xs={20} sm={12} md={8} lg={6} xl={4} key={index}>
            <Card 
              hoverable 
              style={{ height: '100%', textAlign: 'center', borderRadius: '15px', border: '1px solid black' }}
              cover={<div style={{ fontSize: '3rem', padding: '20px', background: 'black', color: 'white' }}>{feature.icon}</div>}
            >
              <Card.Meta
                title={<span style={{ fontSize: '18px', fontWeight: 'bold', color: 'black' }}>{feature.title}</span>}
                description={<span style={{ fontSize: '14px', color: 'black' }}>{feature.description}</span>}
              />
            </Card>
          </Col>
        ))}
      </Row>
      <Row justify="center" style={{ marginBottom: 40, background: 'black', padding: '40px 0' }}>
        <Col xs={22} sm={20} md={16} lg={12} xl={10}>
          <Title level={2} style={{ textAlign: "center", color: 'white' }}>
            Our Impact
          </Title>
          <Row gutter={16}>
            <Col span={8}>
              <Statistic 
        title={<span style={{ color: 'white' }}>Happy Hostels</span>}
        value={1000}  prefix={<HomeOutlined style={{ color: 'white' }} />} valueStyle={{ color: 'white' }} />
            </Col>
            <Col span={8}>
              <Statistic 
        title={<span style={{ color: 'white' }}>Satisfied Tenants</span>}
        value={50000} prefix={<WifiOutlined style={{ color: 'white' }} />} valueStyle={{ color: 'white' }} />
            </Col>
            <Col span={8}>
              <Statistic
        title={<span style={{ color: 'white' }}>Cities</span>}
        value={50} prefix={<RocketOutlined style={{ color: 'white' }} />} valueStyle={{ color: 'white' }} />
            </Col>
          </Row>
        </Col>
      </Row>
      <Footer style={{ textAlign: "center", padding: "0px", background: 'black', color: 'white' }}>
        <AppFooter />
      </Footer>
    </div>
  );
};

export default Home;
