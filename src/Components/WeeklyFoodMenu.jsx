import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Typography, Row, Col, message, Popover, Tag, Spin, Drawer } from 'antd';
import { 
  SaveOutlined, 
  CoffeeOutlined, 
  RestOutlined, 
 ScheduleOutlined,
  DeleteOutlined,
  EyeOutlined,
  ReloadOutlined,
  MenuOutlined
} from '@ant-design/icons';
import axios from 'axios';

const { Title, Text } = Typography;

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const mealTypes = ['Breakfast', 'Lunch', 'Snacks/Milk', 'Dinner'];

const mealColors = {
  Breakfast: '#91d5ff',
  Lunch: '#b7eb8f',
  'Snacks/Milk': '#ffd591',
  Dinner: '#adc6ff'
};

const WeeklyFoodMenu = () => {
  const [form] = Form.useForm();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://smart-hostel-management-json-server.onrender.com/foodMenu');
      if (response.data && response.data.length > 0) {
        form.setFieldsValue(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching menu:', error);
      message.error('Failed to fetch the menu. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.get('https://smart-hostel-management-json-server.onrender.com/foodMenu');
      if (response.data && response.data.length > 0) {
        await axios.put(`https://smart-hostel-management-json-server.onrender.com/foodMenu/${response.data[0].id}`, values);
      } else {
        await axios.post('https://smart-hostel-management-json-server.onrender.com/foodMenu', values);
      }
      message.success('Food menu saved successfully!');
    } catch (error) {
      console.error('Error saving menu:', error);
      message.error('Failed to save the menu. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getMealIcon = (meal) => {
    switch (meal) {
      case 'Breakfast':
        return <CoffeeOutlined />;
      case 'Lunch':
        return <RestOutlined />;
      case 'Snacks/Milk':
        return <RestOutlined />;
      case 'Dinner':
        return <RestOutlined />;
      default:
        return <ScheduleOutlined />;
    }
  };

  const renderPreview = () => {
    const values = form.getFieldsValue();
    return (
      <Card title="Weekly Menu Preview" style={{ width: '100%' }}>
        {days.map((day) => (
          <Card key={day} size="small" title={day} style={{ marginBottom: 10 }}>
            {mealTypes.map((meal) => (
              <Tag color={mealColors[meal]} key={meal} style={{ marginBottom: 5, width: '100%', textAlign: 'left' }}>
                {getMealIcon(meal)} {meal}: {values[day]?.[meal] || 'Not set'}
              </Tag>
            ))}
          </Card>
        ))}
      </Card>
    );
  };

  const renderDayMenu = (day) => (
    <Card 
      title={<Title level={4}>{day}</Title>}
      style={{ marginBottom: 20, background: '#f0f2f5' }}
      extra={
        <Button 
          icon={<DeleteOutlined />} 
          danger
          onClick={() => {
            form.setFieldsValue({ [day]: {} });
            setDrawerVisible(false);
          }}
        >
          Clear Day
        </Button>
      }
    >
      {mealTypes.map((meal) => (
        <Form.Item
          key={`${day}-${meal}`}
          name={[day, meal]}
          label={
            <Text strong>
              {getMealIcon(meal)} {meal}
            </Text>
          }
        >
          <Input.TextArea 
            rows={4} 
            placeholder={`Enter ${meal.toLowerCase()} menu`}
            style={{ backgroundColor: mealColors[meal] }}
          />
        </Form.Item>
      ))}
    </Card>
  );

  if (loading) {
    return (
      <Card style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
        <p>Loading menu...</p>
      </Card>
    );
  }

  return (
    <Card 
      title={<Title level={2}><ScheduleOutlined /> Weekly Food Menu</Title>}
      style={{ maxWidth: 1200, margin: '20px auto', marginTop : "75px" }}
      extra={
        <Row gutter={[16, 16]}>
          <Col>
            <Popover 
              content={renderPreview()} 
              title="Menu Preview" 
              trigger="click"
              visible={previewVisible}
              onVisibleChange={setPreviewVisible}
            >
              <Button icon={<EyeOutlined />} onClick={() => setPreviewVisible(true)}>
                Preview
              </Button>
            </Popover>
          </Col>
          <Col>
            <Button icon={<ReloadOutlined />} onClick={fetchMenu}>
              Refresh
            </Button>
          </Col>
        </Row>
      }
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row gutter={[16, 16]}>
          {days.map((day) => (
            <Col xs={24} sm={12} md={8} lg={6} xl={4} key={day}>
              <Card 
                hoverable
                onClick={() => {
                  setSelectedDay(day);
                  setDrawerVisible(true);
                }}
                cover={<div style={{ padding: '20px', textAlign: 'center', background: mealColors.Breakfast }}>{getMealIcon('Breakfast')}</div>}
              >
                <Card.Meta title={day} description="Click to edit meals" />
              </Card>
            </Col>
          ))}
        </Row>
        <Form.Item style={{ marginTop: 20 }}>
          <Button type="primary" htmlType="submit" icon={<SaveOutlined />} size="large" loading={loading}>
            Save Weekly Menu
          </Button>
        </Form.Item>
      </Form>
      <Drawer
        title={`Edit Menu for ${selectedDay}`}
        placement="right"
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        width={320}
      >
        {selectedDay && renderDayMenu(selectedDay)}
      </Drawer>
    </Card>
  );
};

export default WeeklyFoodMenu;