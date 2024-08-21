import React , {useState} from "react";
import { StyledSection, GlassCard, IconBox, StyledButton } from "./common";
import { Button, Col, Modal, Row, Tabs, Typography } from "antd";
import { FileProtectOutlined, QuestionCircleOutlined, SafetyOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;


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
  
  export default TermsAndConditionsSection;