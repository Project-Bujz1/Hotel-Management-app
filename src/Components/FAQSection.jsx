import { Card, Col, Row, Typography } from "antd";
import React, {useState } from "react";
import { StyledButton } from "./common";

const { Title, Paragraph, Text } = Typography;

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

  export default FAQSection;