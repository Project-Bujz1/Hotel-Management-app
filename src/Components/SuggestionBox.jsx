import React, { useState, useEffect } from 'react';
import { Card, List, Typography, Tag, Space, Modal, Button } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const SuggestionBox = () => {
  const [suggestions, setSuggestions] = useState([
    {
      id: 1,
      title: 'Improve Wi-Fi Speed',
      content: 'The Wi-Fi in the common areas is quite slow. Can we upgrade it?',
      likes: 15,
      comments: 3,
      stars: 2,
    },
    {
      id: 2,
      title: 'Add More Vending Machines',
      content: 'It would be great to have vending machines on each floor.',
      likes: 8,
      comments: 1,
      stars: 1,
    },
    // Add more sample suggestions as needed
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  const showModal = (suggestion) => {
    setSelectedSuggestion(suggestion);
    setModalVisible(true);
  };

  const handleOk = () => {
    setModalVisible(false);
  };

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const [isFreeTrial, setIsFreeTrial] = useState(true);

  useEffect(() => {
    const trialStatus = localStorage.getItem('isFreeTrial') === 'false';
    setIsFreeTrial(trialStatus);
  }, []);

  if (!isFreeTrial) {
    return <div style={{ padding: '2rem', textAlign: 'center', marginTop : "75px" }}>You have no access. Please upgrade.</div>;
  }

  return (
    <Card
      title={<Title level={3}>Tenant Suggestions</Title>}
      extra={<Button type="primary">Add Response</Button>}
      style={{ width: '100%', maxWidth: 800, margin: 'auto',marginTop : "75px" }}
    >
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 5,
        }}
        dataSource={suggestions}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <IconText icon={StarOutlined} text={item.stars} key="list-vertical-star-o" />,
              <IconText icon={LikeOutlined} text={item.likes} key="list-vertical-like-o" />,
              <IconText icon={MessageOutlined} text={item.comments} key="list-vertical-message" />,
            ]}
            extra={
              <Tag color="blue" style={{ cursor: 'pointer' }} onClick={() => showModal(item)}>
                View Details
              </Tag>
            }
          >
            <List.Item.Meta
              title={<a onClick={() => showModal(item)}>{item.title}</a>}
              description={`Suggestion #${item.id}`}
            />
            {item.content.length > 100 ? `${item.content.slice(0, 100)}...` : item.content}
          </List.Item>
        )}
      />
      <Modal
        title={selectedSuggestion?.title}
        visible={modalVisible}
        onOk={handleOk}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setModalVisible(false)}>
            Close
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Mark as Resolved
          </Button>,
        ]}
      >
        <Paragraph>{selectedSuggestion?.content}</Paragraph>
        <Space>
          <Tag color="blue">{selectedSuggestion?.likes} Likes</Tag>
          <Tag color="green">{selectedSuggestion?.comments} Comments</Tag>
          <Tag color="gold">{selectedSuggestion?.stars} Stars</Tag>
        </Space>
      </Modal>
    </Card>
  );
};

export default SuggestionBox;