import React, { useState } from 'react';
import { Card, List, Typography, Tag, Space, Modal, Button, Input, Form } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const TenantSuggestionBox = () => {
  const [suggestions, setSuggestions] = useState([
    {
      id: 1,
      title: 'Extend Gym Hours',
      content: 'The gym closes too early. It would be great if it could stay open until midnight.',
      likes: 12,
      comments: 4,
      stars: 3,
    },
    {
      id: 2,
      title: 'Add More Parking Spaces',
      content: 'Parking spaces are limited and often full. Adding more would be helpful.',
      likes: 9,
      comments: 2,
      stars: 2,
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [isModalForAdd, setIsModalForAdd] = useState(false);

  const showModal = (suggestion = null) => {
    setSelectedSuggestion(suggestion);
    setModalVisible(true);
  };

  const handleOk = () => {
    setModalVisible(false);
    setSelectedSuggestion(null);
  };

  const handleAddSuggestion = (values) => {
    const newSuggestion = {
      id: suggestions.length + 1,
      title: values.title,
      content: values.content,
      likes: 0,
      comments: 0,
      stars: 0,
    };
    setSuggestions([...suggestions, newSuggestion]);
    setModalVisible(false);
  };

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  return (
    <Card
      title={<Title level={3}>Your Suggestions</Title>}
      extra={<Button type="primary" onClick={() => { setIsModalForAdd(true); showModal(); }}>Add Suggestion</Button>}
      style={{ width: '100%', maxWidth: 800, margin: 'auto', marginTop: '75px' }}
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
        title={isModalForAdd ? "Add New Suggestion" : selectedSuggestion?.title}
        visible={modalVisible}
        onOk={handleOk}
        onCancel={() => setModalVisible(false)}
        footer={isModalForAdd ? null : [
          <Button key="back" onClick={() => setModalVisible(false)}>
            Close
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Resolve
          </Button>,
        ]}
      >
        {isModalForAdd ? (
          <Form layout="vertical" onFinish={handleAddSuggestion}>
            <Form.Item
              name="title"
              label="Suggestion Title"
              rules={[{ required: true, message: 'Please input the title of your suggestion!' }]}
            >
              <Input placeholder="Enter title here" />
            </Form.Item>
            <Form.Item
              name="content"
              label="Suggestion Content"
              rules={[{ required: true, message: 'Please input the content of your suggestion!' }]}
            >
              <TextArea rows={4} placeholder="Enter your suggestion details here" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <>
            <Paragraph>{selectedSuggestion?.content}</Paragraph>
            <Space>
              <Tag color="blue">{selectedSuggestion?.likes} Likes</Tag>
              <Tag color="green">{selectedSuggestion?.comments} Comments</Tag>
              <Tag color="gold">{selectedSuggestion?.stars} Stars</Tag>
            </Space>
          </>
        )}
      </Modal>
    </Card>
  );
};

export default TenantSuggestionBox;
