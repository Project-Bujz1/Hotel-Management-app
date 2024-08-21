import { Button, Typography } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
const StyledButton = styled(Button)`
  background: linear-gradient(135deg, #4ca1af 0%, #c4e0e5 100%);
  border: none;
  height: 50px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 25px;
  padding: 0 30px;
  transition: all 0.3s ease;
  color: #fff;

  &:hover {
    opacity: 0.9;
    transform: scale(1.05);
  }
`;

const { Title, Paragraph, Text } = Typography;


const FeatureCard = ({ feature, onClick }) => {
    const [isFlipped, setIsFlipped] = useState(false);
  
    return (
      <div
        className="feature-card"
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
        onClick={onClick}
        style={{
          perspective: '1000px',
          width: '80%',
          height: '200px',
          cursor: 'pointer',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            transition: 'transform 0.6s',
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'linear-gradient(135deg, #4ca1af 0%, #c4e0e5 100%)',
              color: 'white',
              borderRadius: '15px',
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>{feature.icon}</div>
            <h3 style={{ margin: 0 }}>{feature.title}</h3>
          </div>
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'white',
              color: 'black',
              borderRadius: '15px',
              padding: '10px',
              textAlign: 'center',
            }}
          >
            <p>{feature.description}</p>
            <StyledButton type="primary">Learn More</StyledButton>
          </div>
        </div>
      </div>
    );
  };
  export default FeatureCard;