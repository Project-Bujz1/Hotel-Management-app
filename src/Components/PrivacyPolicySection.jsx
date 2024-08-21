import { EyeOutlined, FileProtectOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Col, Collapse, Modal, Row, Typography } from "antd";
import React , {useState} from "react";
import styled from "styled-components";
import { StyledCard } from "./common";
import { StyledButton } from "./common";

const PrivacyPolicySection = () => {
const [isModalVisible, setIsModalVisible] = useState(false); 
const showModal = () => setIsModalVisible(true);
const handleOk = () => setIsModalVisible(false);
const handleCancel = () => setIsModalVisible(false);

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

const StyledCard = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 30px;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const StyledSection = styled.section`
  background-color: #f0f2f5;
  padding: 80px 20px;
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: linear-gradient(135deg, #4ca1af 0%, #c4e0e5 100%);
  margin: 0 auto 20px;
  font-size: 40px;
  color: #fff;
`;
  
    return (
      <StyledSection>
        <Row justify="center" gutter={[32, 32]}>
          <Col xs={24} sm={24} md={20} lg={18} xl={16}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: '40px', color: '#4ca1af' }}>
              Your Privacy Matters to Us
            </Title>
            <Row gutter={[32, 32]}>
              <Col xs={24} md={8}>
                <StyledCard>
                  <IconBox>
                    <FileProtectOutlined />
                  </IconBox>
                  <Title level={4} style={{ color: '#4ca1af' }}>Protected</Title>
                  <Paragraph>Your data is safeguarded with industry-standard security measures.</Paragraph>
                </StyledCard>
              </Col>
              <Col xs={24} md={8}>
                <StyledCard>
                  <IconBox>
                    <EyeOutlined />
                  </IconBox>
                  <Title level={4} style={{ color: '#4ca1af' }}>Transparent</Title>
                  <Paragraph>We're clear about how we collect and use your information.</Paragraph>
                </StyledCard>
              </Col>
              <Col xs={24} md={8}>
                <StyledCard>
                  <IconBox>
                    <LockOutlined />
                  </IconBox>
                  <Title level={4} style={{ color: '#4ca1af' }}>Control</Title>
                  <Paragraph>You have full control over your personal data and preferences.</Paragraph>
                </StyledCard>
              </Col>
            </Row>
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <StyledButton onClick={showModal}>Read Our Privacy Policy</StyledButton>
            </div>
          </Col>
        </Row>
        <Modal
          title="Smart Annoyers Privacy Policy"
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
          <Collapse accordion>
            <Panel header="Information Collection and Use" key="1">
              <p>
                Smart Annoyers technologies pvt ltd built the Hostel Master. This SERVICE is provided by Smart Annoyers technologies pvt ltd at no cost to end user and is intended for use as is.
              </p>
              <p>
                Smart Annoyers is used by Administrators of University & Private Hostels. The hostel administration need identification data for a better experience & safety of other residents, while using our Service, they ask for following data, however not all data is mandatory always. We may require you to provide us with certain personally identifiable information, including but not limited to Name, mobile number, address, location (ONLY Limited For emergency support by your community).
              </p>
              <p>
                Resident's Profile image: For identification and mandated by all governments, these hostels may ask you to upload your profile image.
              </p>
              <p>
                Academic information: The University hostel administrators may ask you to update your academic information like course, branch, year for identification & communication purposes.
              </p>
              <p>
                The information that we request will be retained by us and used as described in this privacy policy. At NO stage of business, we share or exchange your information to vendor or third party.
              </p>
            </Panel>
            <Panel header="Log Data - ERROR / Technical faults" key="2">
              <p>
                We inform you that during use of our Service, in case of an error in the app we collect data and information (through internal debugging solution) on your phone called Log Data. This is a worldwide acceptable & standard requirement for all technical/Software solutions.
              </p>
              <p>
                This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics. This information remains confidential always.
              </p>
            </Panel>
            <Panel header="Security" key="3">
              <p>
                We safeguard your Personal Information and use commercially acceptable means of protecting it. Force Majeure clause is applicable for circumstances unforeseen in commercial, natural distress/Disasters, and Government interventions.
              </p>
            </Panel>
            <Panel header="Links to Other Sites" key="4">
              <p>
                This Service may contain links to external sites. If you click on a third-party link, you will be redirected to that site/online services. External sites are not operated by us and we strongly advise you to review the Privacy Policy of these external vendor services. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
              </p>
              <p>
                Smart Annoyers does not share information with third-party /external websites.
              </p>
            </Panel>
            <Panel header="Children’s Privacy" key="5">
              <p>
                These Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do necessary actions.
              </p>
            </Panel>
            <Panel header="Changes to This Privacy Policy" key="6">
              <p>
                We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately after they are posted on this page.
              </p>
            </Panel>
            <Panel header="Contact Us" key="7">
              <p>
                If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us.
              </p>
            </Panel>
          </Collapse>
        </Modal>
      </StyledSection>
    );
  };

  export default PrivacyPolicySection;