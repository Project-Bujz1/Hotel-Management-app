import React, { useState } from "react";
import { Menu, Input, Modal, Progress, Tooltip } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import orgLogo from "../assets/logo-1.png";
import logo from "../assets/logo-transparent-png.png";

const MainMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const currentPath = location.pathname;
  const selectedKeys = {
    "/home": "home",
    "/rooms": "rooms",
    "/tenants": "tenants",
    "/rentDue": "rentDue",
    "/paymentHistory": "paymentHistory",
    "/complaints": "complaints",
    "/profile": "profile",
  }[currentPath] || "home";

  const handleLogoClick = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        height: "60px", // Reduced height
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Optional shadow
      }}
    >
      <img
        src={logo}
        alt="Logo"
        style={{ height: "50px", width: "200px", cursor: "pointer" }}
        onClick={() => navigate("/home")}
      />
      <Menu
        mode="horizontal"
        selectedKeys={[selectedKeys]}
        style={{
          backgroundColor: "transparent",
          flex: 1,
          display: "flex",
          fontFamily: "Playfair, Montserrat, sans-serif",
          borderBottom: "none",
          fontWeight: "bold",
          fontSize: "14px", // Reduced font size
          margin: 0,
        }}
      >
        <Menu.Item
          key="home"
          style={{
            fontSize: "14px",
            color: selectedKeys === "home" ? "blue" : "black", // Active status
            fontWeight: selectedKeys === "home" ? "bold" : "normal",
            borderBottom: selectedKeys === "home" ? "2px solid blue" : "none", // Active status bar
            marginRight: "10px",
          }}
          onClick={() => navigate("/home")}
        >
          Home
        </Menu.Item>
        <Menu.Item
          key="rooms"
          style={{
            fontSize: "14px",
            color: selectedKeys === "rooms" ? "blue" : "black", // Active status
            fontWeight: selectedKeys === "rooms" ? "bold" : "normal",
            borderBottom: selectedKeys === "rooms" ? "2px solid blue" : "none", // Active status bar
            marginRight: "10px",
          }}
          onClick={() => navigate("/rooms")}
        >
          Rooms
        </Menu.Item>
        <Menu.Item
          key="tenants"
          style={{
            fontSize: "14px",
            color: selectedKeys === "tenants" ? "blue" : "black", // Active status
            fontWeight: selectedKeys === "tenants" ? "bold" : "normal",
            borderBottom: selectedKeys === "tenants" ? "2px solid blue" : "none", // Active status bar
            marginRight: "10px",
          }}
          onClick={() => navigate("/tenants")}
        >
          Tenants
        </Menu.Item>
        <Menu.Item
          key="rentDue"
          style={{
            fontSize: "14px",
            color: selectedKeys === "rentDue" ? "blue" : "black", // Active status
            fontWeight: selectedKeys === "rentDue" ? "bold" : "normal",
            borderBottom: selectedKeys === "rentDue" ? "2px solid blue" : "none", // Active status bar
            marginRight: "10px",
          }}
          onClick={() => navigate("/rentDue")}
        >
          Rent Due
        </Menu.Item>
        <Menu.Item
          key="paymentHistory"
          style={{
            fontSize: "14px",
            color: selectedKeys === "paymentHistory" ? "blue" : "black", // Active status
            fontWeight: selectedKeys === "paymentHistory" ? "bold" : "normal",
            borderBottom: selectedKeys === "paymentHistory" ? "2px solid blue" : "none", // Active status bar
            marginRight: "10px",
          }}
          onClick={() => navigate("/paymentHistory")}
        >
          Payment History
        </Menu.Item>
        <Menu.Item
          key="complaints"
          style={{
            fontSize: "14px",
            color: selectedKeys === "complaints" ? "blue" : "black", // Active status
            fontWeight: selectedKeys === "complaints" ? "bold" : "normal",
            borderBottom: selectedKeys === "complaints" ? "2px solid blue" : "none", // Active status bar
            marginRight: "10px",
          }}
          onClick={() => navigate("/complaints")}
        >
          Complaints
        </Menu.Item>
        <Tooltip title="Hostel capacity: 80%">
          <Menu.Item
            key="capacity"
            style={{ display: "flex", alignItems: "center", fontSize: "14px", color: "black", marginRight: "10px" }} // Adjusted styles
          >
            <Progress
              percent={80}
              strokeColor="#1890ff"
              style={{ width: "120px" }} // Adjust width as needed
            />
          </Menu.Item>
        </Tooltip>
        <Menu.Item
          key="search"
          style={{ display: "flex", alignItems: "center", fontSize: "14px", color: "black", marginLeft: "auto", marginRight: "10px" }} // Adjusted styles
        >
          <Input
            prefix={<SearchOutlined style={{ width: "100%" }} />}
            placeholder="Search"
            size="small"
            style={{
              width: "100%",
              borderRadius: "5px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          />
        </Menu.Item>
        <Menu.Item
          key="profile"
          style={{
            fontSize: "14px",
            color: selectedKeys === "profile" ? "blue" : "black", // Active status
            fontWeight: selectedKeys === "profile" ? "bold" : "normal",
            borderBottom: selectedKeys === "profile" ? "2px solid blue" : "none", // Active status bar
            marginRight: "10px",
          }}
          icon={<UserOutlined />}
          onClick={() => navigate("/profile")}
        >
          Profile
        </Menu.Item>
      </Menu>
      <img
        src={orgLogo}
        alt="Organization Logo"
        style={{ height: "60px", margin: "10px", cursor: "pointer" }}
        onClick={handleLogoClick}
      />

      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={handleModalClose}
        centered
        bodyStyle={{ textAlign: "center" }}
      >
        <img
          src={orgLogo}
          alt="Organization Logo"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Modal>
    </div>
  );
};

export default MainMenu;
