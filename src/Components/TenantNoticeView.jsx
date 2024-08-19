import React, { useState, useEffect } from 'react';
import { Card, Space, Typography, Spin, List, Button, Modal } from 'antd';
import { BellOutlined, EyeOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';

const { Title } = Typography;

const TenantNoticeView = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);

  useEffect(() => {
    // Fetch notices data
    const fetchNotices = async () => {
      try {
        const response = await axios.get('https://smart-hostel-management-json-server.onrender.com/notices');
        setNotices(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch notices. Please try again later.');
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const showNoticeDetails = (notice) => {
    setSelectedNotice(notice);
    setVisible(true);
  };

  if (loading) {
    return (
      <Card style={{ maxWidth: 600, margin: 'auto', marginTop: 20, textAlign: 'center' }}>
        <Spin size="large" />
        <p>Loading notices...</p>
      </Card>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: 'auto', marginTop: 75 }}>
      <Card title={<Title level={3}><BellOutlined /> Notices</Title>}>
        <List
          itemLayout="horizontal"
          dataSource={notices}
          renderItem={(notice) => (
            <List.Item
              actions={[
                <Button icon={<EyeOutlined />} onClick={() => showNoticeDetails(notice)}>
                  View
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={notice.title}
                description={`Sent At: ${moment(notice.createdAt).format('YYYY-MM-DD HH:mm:ss')}`}
              />
            </List.Item>
          )}
        />
      </Card>
      <Modal
        title="Notice Details"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        {selectedNotice && (
          <div>
            <p><strong>Title:</strong> {selectedNotice.title}</p>
            <p><strong>Type:</strong> {selectedNotice.noticeType}</p>
            <p><strong>Content:</strong> {selectedNotice.content}</p>
            <p><strong>Sent At:</strong> {moment(selectedNotice.createdAt).format('YYYY-MM-DD HH:mm:ss')}</p>
            {selectedNotice.dueDate && <p><strong>Due Date:</strong> {moment(selectedNotice.dueDate).format('YYYY-MM-DD')}</p>}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TenantNoticeView;
