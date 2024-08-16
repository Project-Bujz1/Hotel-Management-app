import React from 'react';
import { Typography, Row, Col, Card, Button, Layout } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo-transparent-png.png";
import AppFooter from './AppFooter';

const { Title, Paragraph } = Typography;
const { Header, Content, Footer } = Layout;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

const StyledHeader = styled(Header)`
  background: black;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledContent = styled(Content)`
  padding: 50px 20px;
  background: white;
`;

const StyledCard = styled(Card)`
  background: ${props => props.featured ? 'black' : 'white'};
  color: ${props => props.featured ? 'white' : 'black'};
  border: 2px solid black;
  border-radius: 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }
`;

const PlanTitle = styled(Title)`
  color: ${props => props.featured ? 'white !important' : 'black !important'};
`;

const PlanPrice = styled(Title)`
  color: ${props => props.featured ? 'white !important' : 'black !important'};
`;

const StyledButton = styled(Button)`
  background: ${props => props.featured ? 'white' : 'black'} !important;
  color: ${props => props.featured ? 'black' : 'white'} !important;
  border: none !important;
  height: 50px;
  font-size: 18px;
  font-weight: bold;
  margin-top: auto;

  &:hover {
    opacity: 0.8;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
`;

const FeatureItem = styled.li`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const Subscribe = () => {
  const navigate = useNavigate();

  const plans = [
    {
      title: "Basic",
      price: "₹999",
      features: [
        "Up to 50 tenants",
        "Basic reporting",
        "Email support",
        "Mobile app access"
      ],
      featured: false
    },
    {
      title: "Pro",
      price: "₹1999",
      features: [
        "Up to 200 tenants",
        "Advanced reporting",
        "Priority support",
        "Mobile app access",
        "Custom branding"
      ],
      featured: true
    },
    {
      title: "Enterprise",
      price: "Custom",
      features: [
        "Unlimited tenants",
        "Full feature access",
        "24/7 dedicated support",
        "Mobile app access",
        "Custom integrations",
        "Onboarding assistance"
      ],
      featured: false
    }
  ];

  return (
    <StyledLayout>
      <StyledHeader>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
          <span style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>Smart Hostel Master</span>
        </div>
        <Button type="primary" ghost onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </StyledHeader>

      <StyledContent>
        <Row justify="center" style={{ marginBottom: '40px' }}>
          <Col span={24}>
            <Title level={1} style={{ textAlign: 'center', color: 'black' }}>
              Choose Your Plan
            </Title>
            <Paragraph style={{ textAlign: 'center', fontSize: '18px', maxWidth: '800px', margin: '0 auto' }}>
              Select the perfect plan for your hostel management needs. Upgrade or downgrade anytime.
            </Paragraph>
          </Col>
        </Row>

        <Row gutter={[32, 32]} justify="center">
          {plans.map((plan, index) => (
            <Col xs={24} sm={24} md={8} key={index}>
              <StyledCard featured={plan.featured}>
                <PlanTitle level={2} featured={plan.featured}>{plan.title}</PlanTitle>
                <PlanPrice level={3} featured={plan.featured}>{plan.price}{plan.title !== "Enterprise" && "/month"}</PlanPrice>
                <FeatureList>
                  {plan.features.map((feature, idx) => (
                    <FeatureItem key={idx}>
                      <CheckOutlined style={{ marginRight: '10px', color: plan.featured ? 'white' : 'black' }} />
                      {feature}
                    </FeatureItem>
                  ))}
                </FeatureList>
                <StyledButton 
                  featured={plan.featured} 
                  size="large" 
                  block
                  onClick={() => navigate('/signup', { state: { plan: plan.title } })}
                >
                  {plan.title === "Enterprise" ? "Contact Sales" : "Choose Plan"}
                </StyledButton>
              </StyledCard>
            </Col>
          ))}
        </Row>
      </StyledContent>

      <Footer style={{ textAlign: "center", padding: "0px", background: 'black', color: 'white' }}>
        <AppFooter />
      </Footer>
    </StyledLayout>
  );
};

export default Subscribe;