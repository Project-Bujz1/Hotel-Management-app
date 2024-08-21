import React from "react";
import { GlassCard, IconBox, StyledSection } from "./common";
import { Col, Row, Typography } from "antd";
import { CheckCircleOutlined, InfoCircleOutlined, LockOutlined, SmileOutlined } from "@ant-design/icons";
import TeamMember from "./TeamMember";
const { Title, Paragraph, Text } = Typography;

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
                  <InfoCircleOutlined style={{ fontSize: '32px', color: 'white' }} />
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
                  <SmileOutlined style={{ fontSize: '32px', color: 'white' }} />
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
                  <LockOutlined style={{ fontSize: '32px', color: 'white' }} />
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
                  <CheckCircleOutlined style={{ fontSize: '32px', color: 'white' }} />
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

  export default AboutUsSection;