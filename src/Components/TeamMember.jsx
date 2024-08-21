import { GithubOutlined, LinkedinOutlined, TwitterOutlined } from "@ant-design/icons";
import { Avatar, Card, Tooltip, Typography } from "antd";
import React from "react";
const { Title, Paragraph, Text } = Typography;
const TeamMember = ({ name, role, avatar, github, linkedin, twitter }) => (
    <Card hoverable style={{ textAlign: 'center' }}>
      <Avatar size={120} src={avatar} />
      <Title level={4} style={{ marginTop: '20px', marginBottom: '5px' }}>{name}</Title>
      <Text type="secondary">{role}</Text>
      <div style={{ marginTop: '20px' }}>
        {github && (
          <Tooltip title="GitHub">
            <a href={github} target="_blank" rel="noopener noreferrer">
              <GithubOutlined style={{ fontSize: '24px', margin: '0 10px' }} />
            </a>
          </Tooltip>
        )}
        {linkedin && (
          <Tooltip title="LinkedIn">
            <a href={linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedinOutlined style={{ fontSize: '24px', margin: '0 10px' }} />
            </a>
          </Tooltip>
        )}
        {twitter && (
          <Tooltip title="Twitter">
            <a href={twitter} target="_blank" rel="noopener noreferrer">
              <TwitterOutlined style={{ fontSize: '24px', margin: '0 10px' }} />
            </a>
          </Tooltip>
        )}
      </div>
    </Card>
  );

  export default TeamMember;