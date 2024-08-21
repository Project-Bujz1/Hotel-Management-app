import { BarChartOutlined, ClockCircleOutlined, RocketOutlined, TeamOutlined } from "@ant-design/icons";
import { Card, Col, Row, Switch, Typography } from "antd";
import React ,{useState} from "react";
const { Title, Paragraph, Text } = Typography;

const BenefitsSection = () => {
    const [showAfter, setShowAfter] = useState(false);
  
    const benefits = [
      {
        title: "Time Management",
        before: "Hours spent on manual record-keeping",
        after: "Automated systems save 70% of admin time",
        icon: <ClockCircleOutlined />,
      },
      {
        title: "Efficiency",
        before: "Slow, error-prone processes",
        after: "Streamlined operations with 99% accuracy",
        icon: <RocketOutlined />,
      },
      {
        title: "Tenant Satisfaction",
        before: "Limited communication channels",
        after: "24/7 digital support and feedback system",
        icon: <TeamOutlined />,
      },
      {
        title: "Insights",
        before: "Guesswork in decision-making",
        after: "Data-driven insights for smarter choices",
        icon: <BarChartOutlined />,
      },
    ];
  
    return (
      <div style={{ padding: '50px 0', background: '#f0f2f5' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>
          Transform Your Hostel Experience
        </Title>
        <Row justify="center" style={{ marginBottom: '20px' }}>
          <Switch
            checkedChildren="After"
            unCheckedChildren="Before"
            onChange={setShowAfter}
          />
        </Row>
        <Row gutter={[16, 16]} justify="center">
          {benefits.map((benefit, index) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <Card
                hoverable
                style={{
                  height: '100%',
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #4ca1af 0%, #c4e0e5 100%)',
                  border: 'none',
                  borderRadius : "10px",
                  color: '#fff'
              }}                cover={
                  <div style={{ fontSize: '48px', padding: '24px', color: showAfter ? 'white' : 'black' }}>
                    {benefit.icon}
                  </div>
                }
              >
                <Card.Meta
                  title={benefit.title}
                  description={
                    <Typography.Text strong>
                      {showAfter ? benefit.after : benefit.before}
                      </Typography.Text>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  };

  export default BenefitsSection;