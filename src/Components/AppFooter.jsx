import React from "react";
import { Layout, Row, Col, Typography } from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;
const { Title, Text } = Typography;

const AppFooter = () => (
  <Footer
    style={{
      backgroundColor: "#000", // Black background
      color: "#fff", // White text
      padding: "40px 20px",
      width: "100%",
      position: "relative",
      bottom: 0,
      borderTop: "2px solid #fff", // White top border
    }}
  >
    <Row gutter={[16, 24]} justify="center">
      <Col xs={24} sm={24} md={8} lg={6}>
        <div style={{ textAlign: "center" }}>
          <Title level={3} style={{ color: "#fff", marginBottom: "20px", fontSize: "24px" }}>
            Follow Us
          </Title>
          <div style={{ fontSize: "28px" }}>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#fff", margin: "0 15px", transition: "color 0.3s" }}
            >
              <FacebookOutlined />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#fff", margin: "0 15px", transition: "color 0.3s" }}
            >
              <InstagramOutlined />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#fff", margin: "0 15px", transition: "color 0.3s" }}
            >
              <TwitterOutlined />
            </a>
          </div>
        </div>
      </Col>
      <Col xs={24} sm={24} md={8} lg={6}>
        <div style={{ textAlign: "center" }}>
          <Title level={3} style={{ color: "#fff", marginBottom: "20px", fontSize: "24px" }}>
            Contact Us
          </Title>
          <div style={{ marginBottom: "15px" }}>
            <Text style={{ color: "#fff", display: "block", marginBottom: "5px", fontSize: "16px" }}>
              <MailOutlined style={{ marginRight: "8px" }} /> hostel@example.com
            </Text>
            <Text style={{ color: "#fff", display: "block", marginBottom: "5px", fontSize: "16px" }}>
              <PhoneOutlined style={{ marginRight: "8px" }} /> +91 90300 62699
            </Text>
            <Text style={{ color: "#fff", fontSize: "16px" }}>
              <strong>Address:</strong>
              <div>MVP Main Rd, Sector 10, MVP Colony</div>
              <div>Visakhapatnam, Andhra Pradesh 530017</div>
            </Text>
          </div>
        </div>
      </Col>
      <Col xs={24} sm={24} md={8} lg={6}>
        <div style={{ textAlign: "center" }}>
          <Title level={3} style={{ color: "#fff", marginBottom: "20px", fontSize: "24px" }}>
            Facilities
          </Title>
          <ul style={{ listStyleType: "none", padding: 0, margin: 0, fontSize: "16px" }}>
            <li style={{ marginBottom: "10px", color: "#fff" }}>AC Rooms</li>
            <li style={{ marginBottom: "10px", color: "#fff" }}>Kitchen</li>
            <li style={{ marginBottom: "10px", color: "#fff" }}>24 Hours Water Supply</li>
            <li style={{ marginBottom: "10px", color: "#fff" }}>Corporate Accommodation</li>
          </ul>
        </div>
      </Col>
      <Col xs={24} sm={24} md={8} lg={6}>
        <div style={{ textAlign: "center" }}>
          <Title level={3} style={{ color: "#fff", marginBottom: "20px", fontSize: "24px" }}>
            Company
          </Title>
          <ul style={{ listStyleType: "none", padding: 0, margin: 0, fontSize: "16px" }}>
            <li><a href="#" style={{ color: "#bbbbbb", textDecoration: "none", display: "block", marginBottom: "10px", transition: "color 0.3s" }}>About Us</a></li>
            <li><a href="#" style={{ color: "#bbbbbb", textDecoration: "none", display: "block", marginBottom: "10px", transition: "color 0.3s" }}>Our Services</a></li>
            <li><a href="#" style={{ color: "#bbbbbb", textDecoration: "none", display: "block", marginBottom: "10px", transition: "color 0.3s" }}>Privacy Policy</a></li>
            <li><a href="#" style={{ color: "#bbbbbb", textDecoration: "none", display: "block", marginBottom: "10px", transition: "color 0.3s" }}>Affiliate Program</a></li>
          </ul>
        </div>
      </Col>
    </Row>
    <div style={{ textAlign: "center", marginTop: "40px", fontSize: "14px" }}>
      <Text style={{ color: "#fff" }}>© {new Date().getFullYear()} Your Hostel Name. All rights reserved.</Text>
    </div>
  </Footer>
);

export default AppFooter;
