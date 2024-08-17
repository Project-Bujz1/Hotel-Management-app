import React, { useState, useEffect } from 'react';
import { Card, List, Typography, Empty, Tooltip, Badge } from 'antd';
import { LikeOutlined, DislikeOutlined, StarOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const FeedbackCard = ({ feedback }) => {
  const [likes, setLikes] = useState(feedback.likes);
  const [dislikes, setDislikes] = useState(feedback.dislikes);

  return (
    <Badge.Ribbon text={feedback.category} color={getCategoryColor(feedback.category)}>
      <Card
        hoverable
        actions={[
          <Tooltip title="Like">
            <LikeOutlined key="like" onClick={() => setLikes(likes + 1)} />
          </Tooltip>,
          <Tooltip title="Dislike">
            <DislikeOutlined key="dislike" onClick={() => setDislikes(dislikes + 1)} />
          </Tooltip>,
          <Tooltip title="Important">
            <StarOutlined key="star" />
          </Tooltip>,
        ]}
      >
        <Paragraph>{feedback.content}</Paragraph>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
          <span>Likes: {likes}</span>
          <span>Dislikes: {dislikes}</span>
          <span>Date: {feedback.date}</span>
        </div>
      </Card>
    </Badge.Ribbon>
  );
};

const getCategoryColor = (category) => {
  switch (category.toLowerCase()) {
    case 'facilities':
      return 'blue';
    case 'food':
      return 'green';
    case 'cleanliness':
      return 'orange';
    case 'security':
      return 'red';
    default:
      return 'purple';
  }
};

const Feedback = ({ feedbackList }) => {
  const [isFreeTrial, setIsFreeTrial] = useState(true);

  useEffect(() => {
    const trialStatus = localStorage.getItem('isFreeTrial') === 'false';
    setIsFreeTrial(trialStatus);
  }, []);

  if (!isFreeTrial) {
    return <div style={{ padding: '2rem', textAlign: 'center', marginTop : "75px" }}>You have no access. Please upgrade.</div>;
  }

  return (
    <div style={{ padding: '2rem', marginTop : "75px" }}>
      <Title level={2}>Tenant Feedback</Title>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 3,
          xxl: 4,
        }}
        dataSource={feedbackList}
        renderItem={(item) => (
          <List.Item>
            <FeedbackCard feedback={item} />
          </List.Item>
        )}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="No feedback yet"
            />
          ),
        }}
      />
    </div>
  );
};

export default Feedback;

