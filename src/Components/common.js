import { Button, Card } from "antd";
import styled, { keyframes } from "styled-components";

export const StyledCard = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 30px;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const IconBox = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 80px;
height: 80px;
border-radius: 20px;
background: linear-gradient(135deg, #4ca1af 0%, #c4e0e5 100%);
margin: 0 auto 20px;
font-size: 40px;
color: #fff;
`;

export const DeviceSwitch = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

export const StepNumber = styled.div`
position: absolute;
top: -4px;
left: -4px;
width: 40px;
height: 40px;
background: #4ca1af;
color: white;
border-radius: 50%;
display: flex;
justify-content: center;
align-items: center;
font-weight: bold;
font-size: 20px;
`;

export const float = keyframes`
0% { transform: translateY(0px); }
50% { transform: translateY(-20px); }
100% { transform: translateY(0px); }
`;

export const IconWrapper = styled.div`
font-size: 48px;
margin-bottom: 20px;
color: #4ca1af;
animation: ${float} 3s ease-in-out infinite;
`;

export const StepCard = styled(Card)`
border-radius: 15px;
box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
margin-bottom: 20px;
transition: all 0.3s ease;
background: rgba(255, 255, 255, 0.9);

&:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}
`;

export const DeviceButton = styled.button`
  background: ${props => props.active ? 'linear-gradient(135deg, #4ca1af 0%, #c4e0e5 100%)' : 'transparent'};
  color: ${props => props.active ? 'white' : 'linear-gradient(135deg, #4ca1af 0%, #c4e0e5 100%)'};
  border: 2px solid #4ca1af;
  padding: 10px 20px;
  margin: 0 10px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #4ca1af;
    color: white;
  }
`;

export const PolicyCard = styled.div`
background-color: rgba(255, 255, 255, 0.9);
border-radius: 20px;
padding: 40px;
box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
transition: all 0.3s ease;

&:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
}
`;

export const GlassCard = styled.div`
  background: rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

export const StyledSection = styled.section`
  background-color: #f0f2f5;
  padding: 80px 20px;
`;

export const StyledButton = styled(Button)`
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