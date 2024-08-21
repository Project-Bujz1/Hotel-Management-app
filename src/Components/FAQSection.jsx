import { Card, Col, Collapse, Row, Typography } from "antd";
import React, { useState } from "react";
import styled from "styled-components";

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

const StyledFAQSection = styled.div`
  padding: 60px 20px;
background : "white"
  color: #333;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const StyledCard = styled(Card)`
  background: linear-gradient(135deg, #4ca1af, #c4e0e5);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const StyledCollapse = styled(Collapse)`
  .ant-collapse-header {
    font-size: 18px;
    font-weight: bold;
    color: #4ca1af;
  }

  .ant-collapse-content-box {
    padding: 20px;
  }
`;

const FAQSection = () => {
  const [expandedKeys, setExpandedKeys] = useState([]);

  const allFAQs = [
    {
      type: "General FAQs",
      items: [
        { question: "What is Smart Hostel Master?", answer: "Smart Hostel Master is a comprehensive hostel management platform..." },
        { question: "How do I get started?", answer: "You can start by signing up for our free trial..." },
        { question: "Is my data secure?", answer: "Yes, we use industry-standard encryption and security measures..." },
        { question: "Can I upgrade my plan later?", answer: "Absolutely! You can upgrade your plan at any time..." },
        { question: "Do you offer customer support?", answer: "Yes, we provide 24/7 customer support..." },
        { question: "Is there a mobile app?", answer: "Yes, we have mobile apps for both iOS and Android..." },
      ],
    },
    {
      type: "Product-Related FAQs",
      items: [
        { question: "Can a resident add their family member's details in the app?", answer: "Yes, activated residents can add their family member's details." },
        { question: "Can a resident reopen a complaint if they are not satisfied with the solution?", answer: "Yes, they can." },
        { question: "Can a resident add clarification on a complaint?", answer: "Yes, a resident can add clarification and feedback on a complaint." },
        { question: "Do residents get a notification when a complaint is resolved?", answer: "Yes, when the admin or management team marks a complaint as completed, the resident gets a notification." },
        { question: "How do we manage complaints?", answer: "Residents or management can add complaints by selecting a department and subject. The complaint is registered with the selected department. The admin can assign team members to resolve the complaint. The admin can also change the status of the complaint based on progress. The admin can raise a complaint on behalf of others." },
        { question: "Can a resident use the app without activation from management?", answer: "No, they can't use the app without activation from management." },
        { question: "How many users can an admin create?", answer: "There is no limit. The admin can create multiple users." },
        { question: "How does a management user sign up in Smart Hostel Master?", answer: "The management admin user account will be created by Smart Hostel Master. The admin user can create other management team accounts. To add a user, the admin follows the path: Admin > User > Add User. They can then add the user's details and create the account." },
        { question: "Do you have different apps for management and residents?", answer: "Yes, we have separate apps for management and residents. We also provide a web app for reporting purposes." },
        { question: "How do we manage residents? Or how could a resident sign up in Smart Hostel Master?", answer: "Residents can sign up with the Fretbox resident app. The admin receives a notification when a resident signs up. The admin can approve the verified residents. The admin can also add residents directly." },
        { question: "What happens if a resident leaves the hostel?", answer: "The management can deactivate the resident's account when they are leaving the hostel." },
        { question: "Can a deactivated resident still use the app?", answer: "No, a deactivated resident cannot use the app." },
        { question: "How do admins sign up for the web app?", answer: "The admins don't need to sign up for the web app. They can use the same login credentials to sign in to the web app." },
        { question: "Can an admin deactivate a team member's account?", answer: "Yes, the admin can deactivate team members' and residents' accounts." },
      ],
    },
  ];

  const onAccordionChange = (keys) => {
    setExpandedKeys(keys);
  };

  return (
    <StyledFAQSection>
      <Row justify="center">
        <Col xs={24} sm={24} md={20} lg={18} xl={16}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '30px', color: '#4ca1afs' }}>
            Frequently Asked Questions
          </Title>
          <StyledCollapse
            accordion
            onChange={onAccordionChange}
            expandIconPosition="right"
            style={{ marginBottom: '30px' }}
          >
           {allFAQs.map((faqType, index) => (
  <Panel
    header={faqType.type}
    key={index}
    style={{
      background: 'linear-gradient(135deg, #4ca1af 0%, #c4e0e5 100%)',
      border: '1px solid white', // White border
      borderRadius: '8px', // Adjust the radius as needed
      color: 'white', // White text color
    }}
  >
    {faqType.items.map((faq, itemIndex) => (
      <StyledCard
        key={itemIndex}
        style={{
          border: '1px solid white', // White border for cards
          borderRadius: '8px', // Adjust the radius as needed
          color: 'white', // White text color
        }}
      >
        <Title level={4} style={{ color: 'white' }}>{faq.question}</Title>
        <Paragraph style={{ color: 'white' }}>{faq.answer}</Paragraph>
      </StyledCard>
    ))}
  </Panel>
))}

          </StyledCollapse>
        </Col>
      </Row>
    </StyledFAQSection>
  );
};

export default FAQSection;