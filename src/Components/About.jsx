import React, { useEffect, useState } from "react";
import { Typography, Row, Col, Carousel, Layout } from "antd";
import {
  WifiOutlined,
  HomeOutlined,
  SecurityScanOutlined,
} from "@ant-design/icons";
import viewPoint from "../assets/viewPoint.jpg";
import arealView from "../assets/arealView.jpg";
import view1 from "../assets/view-1.jpg";
import view2 from "../assets/view-2.jpg";
import view3 from "../assets/view-3.jpg";
import view4 from "../assets/view-4.jpg";
import view5 from "../assets/view-5.jpg";
import view6 from "../assets/view-6.jpg";
import AppFooter from "./AppFooter";

const { Title, Paragraph } = Typography;

const carouselItems = [
  { text: "Sri Krishna Boys Hostel", image: view1 },
  { text: "Best Facilities and Services", image: view2 },
  { text: "Sri Krishna Boys Hostel", image: view3 },
  { text: "Sri Krishna Boys Hostel", image: view4 },
  { text: "Sri Krishna Boys Hostel", image: view5 },
  { text: "Affordable and Comfortable", image: view6 },
  { text: "Sri Krishna Boys Hostel", image: viewPoint },
  { text: "Best View Point", image: arealView },
];

const Typewriter = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentTextIndex = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.substring(0, currentTextIndex + 1));
      currentTextIndex++;
      if (currentTextIndex === text.length) {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayedText}</span>;
};
const { Footer } = Layout;

const About = () => {
  return (
    <div>
      <Carousel
        autoplay
        style={{ width: "100%", height: "50vh", overflow: "hidden" }}
      >
        {carouselItems.map((item, index) => (
          <div key={index}>
            <div
              style={{
                width: "100%",
                height: "50vh",
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#fff",
                textTransform: "uppercase",
                fontFamily: "Playfair, Montserrat, sans-serif",
                textShadow: "2px 2px 4px #000000",
                fontSize: "2.5rem",
                fontWeight: "900",
                lineHeight: "3rem",
              }}
            >
              <Typewriter text={item.text} />
            </div>
          </div>
        ))}
      </Carousel>
      <Row justify="center" style={{ marginTop: 20 }}>
        <Col xs={22} sm={20} md={16} lg={12} xl={10}>
          <Title level={2} style={{ textAlign: "center" }}>
            Welcome to Sri Krishna Boys PG Hostel
          </Title>
          <Paragraph style={{ textAlign: "center" }}>
            XYZ PG Hostel offers comfortable and affordable accommodation with
            all modern amenities. Located in the heart of the city, our PG is
            the perfect choice for students and professionals looking for a home
            away from home.
          </Paragraph>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: 40 }}>
        <Col xs={22} sm={20} md={16} lg={8} xl={8} style={{ textAlign: "center" }}>
          <WifiOutlined style={{ fontSize: "2rem" }} />
          <div style={{ fontSize: "1.2rem", fontWeight: "bold", marginTop: 10 }}>
            High-speed Internet
          </div>
          <Paragraph style={{ marginTop: 10 }}>
            Stay connected with our high-speed internet available throughout the
            hostel.
          </Paragraph>
        </Col>
        <Col xs={22} sm={20} md={16} lg={8} xl={8} style={{ textAlign: "center" }}>
          <HomeOutlined style={{ fontSize: "2rem" }} />
          <div style={{ fontSize: "1.2rem", fontWeight: "bold", marginTop: 10 }}>
            Spacious Rooms
          </div>
          <Paragraph style={{ marginTop: 10 }}>
            Enjoy spacious rooms with attached bathrooms for your comfort.
          </Paragraph>
        </Col>
        <Col xs={22} sm={20} md={16} lg={8} xl={8} style={{ textAlign: "center" }}>
          <SecurityScanOutlined style={{ fontSize: "2rem" }} />
          <div style={{ fontSize: "1.2rem", fontWeight: "bold", marginTop: 10 }}>
            24/7 Security
          </div>
          <Paragraph style={{ marginTop: 10 }}>
            Our hostel is equipped with 24/7 security and CCTV surveillance for
            your safety.
          </Paragraph>
        </Col>
      </Row>
      <Footer style={{ textAlign: "center", padding: "20px" }}>
        <AppFooter />
        PG Hostel Management System ©2024
      </Footer>
    </div>
  );
};

export default About;
