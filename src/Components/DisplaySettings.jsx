// src/Components/DisplaySettings.js
import React, { useState } from 'react';
import { Card, Radio, Slider, Typography, Divider, Switch } from 'antd';

const { Title, Paragraph } = Typography;

const DisplaySettings = () => {
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState(14);
  const [isCompact, setIsCompact] = useState(false);

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
    // Implement theme change logic here (e.g., updating context or state)
  };

  const handleFontSizeChange = (value) => {
    setFontSize(value);
    // Implement font size change logic here (e.g., updating context or state)
  };

  const handleLayoutChange = (checked) => {
    setIsCompact(checked);
    // Implement layout change logic here (e.g., updating context or state)
  };

  return (
    <div style={{ padding: '20px', marginTop: '75px' }}>
      <Card>
        <Title level={4}>Theme</Title>
        <Radio.Group value={theme} onChange={handleThemeChange}>
          <Radio.Button value="light">Light</Radio.Button>
          <Radio.Button value="dark">Dark</Radio.Button>
        </Radio.Group>
        <Divider />
        <Title level={4}>Font Size</Title>
        <Paragraph>Adjust the font size for better readability.</Paragraph>
        <Slider
          min={10}
          max={24}
          value={fontSize}
          onChange={handleFontSizeChange}
          tooltipVisible
        />
        <div style={{ marginTop: '10px', fontSize: `${fontSize}px` }}>
          <p>Sample text with current font size.</p>
        </div>
        <Divider />
        <Title level={4}>Layout</Title>
        <Paragraph>Choose between compact and spacious layout.</Paragraph>
        <Switch
          checked={isCompact}
          onChange={handleLayoutChange}
          checkedChildren="Compact"
          unCheckedChildren="Spacious"
        />
      </Card>
    </div>
  );
};

export default DisplaySettings;
