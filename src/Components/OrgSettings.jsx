// src/Components/OrgSettings.js
import React, { useState } from 'react';
import { Card, Input, Button, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const OrgSettings = () => {
  const [orgName, setOrgName] = useState('My Organization');
  const [address, setAddress] = useState('123 Main St, City, Country');

  const handleSave = () => {
    // Implement save logic here (e.g., API call or context update)
    console.log('Settings saved:', { orgName, address });
  };

  return (
    <div style={{ padding: '20px', marginTop: "75px" }}>
      <Card>
        <Title level={4}>Organization Name</Title>
        <Input
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
          placeholder="Enter organization name"
          style={{ marginBottom: '20px' }}
        />
        <Title level={4}>Address</Title>
        <Input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter address"
          style={{ marginBottom: '20px' }}
        />
        <Button type="primary" onClick={handleSave}>Save Changes</Button>
      </Card>
    </div>
  );
};

export default OrgSettings;
