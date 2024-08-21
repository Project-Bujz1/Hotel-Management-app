import React from "react";
import { Button, Card, Col, Row, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
const { Title, Paragraph, Text } = Typography;

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
  
  export default SubscriptionSection;