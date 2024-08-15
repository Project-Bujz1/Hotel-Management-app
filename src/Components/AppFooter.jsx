import React from "react";
import { Layout, Row, Col, Typography, Divider } from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  MailOutlined,
  PhoneOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;
const { Title, Text } = Typography;

const AppFooter = () => (
  <Footer
    style={{
      backgroundColor: "#000",
      color: "#fff",
      padding: "40px 0",
      width: "100%",
      borderTop: "2px solid #333",
    }}
  >
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
      <Row gutter={[32, 32]} justify="space-between">
        <Col xs={24} sm={12} md={6}>
          <Title level={4} style={{ color: "#fff", marginBottom: "20px" }}>
            Smart Annoyers
          </Title>
          <Text style={{ color: "#bbb" }}>
            Revolutionizing hostel management with cutting-edge software solutions.
          </Text>
          <div style={{ marginTop: "20px" }}>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", marginRight: "15px", fontSize: "20px" }}>
              <FacebookOutlined />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", marginRight: "15px", fontSize: "20px" }}>
              <InstagramOutlined />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", marginRight: "15px", fontSize: "20px" }}>
              <TwitterOutlined />
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", fontSize: "20px" }}>
              <LinkedinOutlined />
            </a>
          </div>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Title level={4} style={{ color: "#fff", marginBottom: "20px" }}>
            Quick Links
          </Title>
          <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
            {["About Us", "Our Services", "Privacy Policy", "Affiliate Program"].map((item, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                <a href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} style={{ color: "#bbb", textDecoration: "none", transition: "color 0.3s" }}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Title level={4} style={{ color: "#fff", marginBottom: "20px" }}>
            Our Solutions
          </Title>
          <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
            {["Smart Hostel Master", "Custom Software", "System Integration", "Consulting"].map((item, index) => (
              <li key={index} style={{ marginBottom: "10px", color: "#bbb" }}>
                {item}
              </li>
            ))}
          </ul>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Title level={4} style={{ color: "#fff", marginBottom: "20px" }}>
            Contact Us
          </Title>
          <Text style={{ color: "#bbb", display: "block", marginBottom: "10px" }}>
            <MailOutlined style={{ marginRight: "8px" }} /> info@smartannoyers.com
          </Text>
          <Text style={{ color: "#bbb", display: "block", marginBottom: "10px" }}>
            <PhoneOutlined style={{ marginRight: "8px" }} /> +91 95533 13334
          </Text>
          <Text style={{ color: "#bbb" }}>
            Gandhi Nagar, Samalkot,<br />
            Andhra Pradesh, India
          </Text>
        </Col>
      </Row>
      <Divider style={{ borderColor: "#333", margin: "30px 0" }} />
      <Row justify="space-between" align="middle">
        <Col>
          <Text style={{ color: "#bbb" }}>
            © {new Date().getFullYear()} Smart Annoyers Software Solutions Pvt. Ltd. All rights reserved.
          </Text>
        </Col>
        <Col>
          <a href="/terms" style={{ color: "#bbb", marginRight: "15px" }}>Terms of Service</a>
          <a href="/privacy" style={{ color: "#bbb" }}>Privacy Policy</a>
        </Col>
      </Row>
    </div>
  </Footer>
);

export default AppFooter;