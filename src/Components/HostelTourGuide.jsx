import React from 'react';
import { Layout, Typography, Card, Row, Col, Carousel, List, Timeline, Image } from 'antd';
import { ClockCircleOutlined, WifiOutlined, SecurityScanOutlined, CoffeeOutlined, SmileOutlined, FrownOutlined } from '@ant-design/icons';
import view1 from '../assets/tech-4.jpg';
import view2 from '../assets/collect-slider-2.png';
import view3 from '../assets/view-slider-1.png';
import view4 from '../assets/tech-4.jpg';
import view5 from '../assets/tech-5.png';
import view6 from '../assets/tech-6.png';
import view7 from '../assets/tech-9.webp';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const HostelTourGuide = () => {
  const facilities = [
    { icon: <WifiOutlined />, name: 'Free Wi-Fi' },
    { icon: <SecurityScanOutlined />, name: '24/7 Security' },
    { icon: <CoffeeOutlined />, name: 'Common Kitchen' },
    // Add more facilities as needed
  ];

  const rules = [
    { icon: <SmileOutlined />, text: 'Visitors allowed from 9 AM to 9 PM', image: 'visitor_allowed.jpg' },
    { icon: <FrownOutlined />, text: 'No overnight guests', image: 'no_overnight.jpg' },
    { icon: <FrownOutlined />, text: 'No smoking inside the building', image: 'no_smoking.jpg' },
    { icon: <FrownOutlined />, text: 'No opposite gender in rooms', image: 'no_opposite_gender.jpg' },
    // Add more rules as needed
  ];

  const schedule = [
    { time: '7:00 AM', event: 'Breakfast Starts' },
    { time: '9:00 AM', event: 'Cleaning Service' },
    { time: '7:00 PM', event: 'Dinner Starts' },
    { time: '10:00 PM', event: 'Quiet Hours Begin' },
    // Add more schedule items as needed
  ];

  return (
    <Layout>
      <Content style={{ padding: '50px' , marginTop : "55px"}}>
        <Title level={1}>Welcome to Our Hostel!</Title>
        <Paragraph>Get to know your new home and its features.</Paragraph>

        <Carousel autoplay>
          <div>
            <Image src={view1} alt="Hostel Exterior" />
          </div>
          <div>
            <Image src={view2} alt="Common Area" />
          </div>
          <div>
            <Image src={view3} alt="Dorm Room" />
          </div>
        </Carousel>

        <Title level={2} style={{ marginTop: '40px' }}>Our Facilities</Title>
        <Row gutter={[16, 16]}>
          {facilities.map((facility, index) => (
            <Col span={6} key={index}>
              <Card hoverable>
                {facility.icon}
                <Title level={4}>{facility.name}</Title>
              </Card>
            </Col>
          ))}
        </Row>

        <Title level={2} style={{ marginTop: '40px' }}>Hostel Rules</Title>
        <List
          grid={{ gutter: 16, column: 2 }}
          dataSource={rules}
          renderItem={item => (
            <List.Item>
              <Card
                hoverable
                cover={<Image src={item.image} alt={item.text} />}
              >
                <Card.Meta
                  avatar={item.icon}
                  title={item.text}
                />
              </Card>
            </List.Item>
          )}
        />

        <Title level={2} style={{ marginTop: '40px' }}>Daily Schedule</Title>
        <Timeline mode="left">
          {schedule.map((item, index) => (
            <Timeline.Item key={index} label={item.time}>
              <Card hoverable>
                <Card.Meta
                  avatar={<ClockCircleOutlined />}
                  title={item.event}
                />
              </Card>
            </Timeline.Item>
          ))}
        </Timeline>
      </Content>
    </Layout>
  );
};

export default HostelTourGuide;