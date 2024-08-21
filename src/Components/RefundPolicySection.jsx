import React , {useState} from "react";
import { StyledSection, PolicyCard, IconBox, StyledButton } from "./common";
import { Button, Col, Modal, Row, Timeline, Typography } from "antd";
import { CloseCircleOutlined, DollarOutlined, RollbackOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

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
  export default RefundPolicySection;  