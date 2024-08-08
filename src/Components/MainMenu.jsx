import React, { useState, useEffect } from "react";
import { Menu, Input, Modal, Progress, Tooltip, Drawer, Avatar, Popover, Button } from "antd";
import { SearchOutlined, UserOutlined, MenuOutlined, LockOutlined, LogoutOutlined, QuestionCircleOutlined, SettingOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo-transparent-png.png";

const MainMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [orgLogo, setOrgLogo] = useState(''); // State to hold the organization logo URL

  const currentPath = location.pathname;
  const selectedKeys = {
    "/home": "home",
    "/rooms": "rooms",
    "/tenants": "tenants",
    "/reports": "reports",
    "/rentDue": "rentDue",
    "/paymentHistory": "paymentHistory",
    "/complaints": "complaints",
    "/profile": "profile",
  }[currentPath] || "home";

  useEffect(() => {
    // Fetch the profile data including the image URL
    const fetchProfileData = async () => {
      const response = await fetch('http://localhost:5000/profile');
      const data = await response.json();
      setOrgLogo(data.imageUrl || ''); // Set the image URL from profile data
    };

    fetchProfileData();
  }, []);

  const handleLogoClick = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleDrawerOpen = () => {
    setDrawerVisible(true);
  };

  const handleDrawerClose = () => {
    setDrawerVisible(false);
  };

  const menuItems = (
    <Menu>
      <Menu.Item key="displaySettings" icon={<SettingOutlined />} onClick={() => navigate("/displaySettings")}>
        Display Settings
      </Menu.Item>
      <Menu.Item key="orgSettings" icon={<SettingOutlined />} onClick={() => navigate("/orgSettings")}>
        Org Settings
      </Menu.Item>
      <Menu.Item key="changePassword" icon={<LockOutlined />} onClick={() => navigate("/changePassword")}>
        Change Password
      </Menu.Item>
      <Menu.Item key="signOut" icon={<LogoutOutlined />} onClick={() => navigate("/signout")}>
        Sign Out
      </Menu.Item>
    </Menu>
  );

  const popoverContent = (
    <div>
      For Any Queries? Contact Us <br />
      <a href="mailto:smartannoyers@gmail.com">
        <MailOutlined style={{ marginRight: "5px" }} />
        smartannoyers@gmail.com
      </a>
    </div>
  );

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        height: "60px",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        padding: "0 10px",
      }}
    >
      <img
        src={logo}
        alt="Logo"
        style={{ height: "50px", width: "auto", cursor: "pointer", flexShrink: 0 }}
        onClick={() => navigate("/home")}
      />
      <Menu
        mode="horizontal"
        selectedKeys={[selectedKeys]}
        style={{
          backgroundColor: "transparent",
          flex: 1,
          display: "flex",
          alignItems: "center",
          fontFamily: "Playfair, Montserrat, sans-serif",
          borderBottom: "none",
          fontWeight: "bold",
          fontSize: "14px",
          margin: 0,
          padding: "0 10px",
        }}
      >
        <Menu.Item key="home" style={getMenuItemStyle(selectedKeys, "home")} onClick={() => navigate("/home")}>Home</Menu.Item>
        <Menu.Item key="rooms" style={getMenuItemStyle(selectedKeys, "rooms")} onClick={() => navigate("/rooms")}>Rooms</Menu.Item>
        <Menu.Item key="tenants" style={getMenuItemStyle(selectedKeys, "tenants")} onClick={() => navigate("/tenants")}>Tenants</Menu.Item>
        <Menu.Item key="reports" style={getMenuItemStyle(selectedKeys, "reports")} onClick={() => navigate("/reports")}>Analytics</Menu.Item>
        <Menu.Item key="rentDue" style={getMenuItemStyle(selectedKeys, "rentDue")} onClick={() => navigate("/rentDue")}>Rent Due</Menu.Item>
        <Menu.Item key="paymentHistory" style={getMenuItemStyle(selectedKeys, "paymentHistory")} onClick={() => navigate("/paymentHistory")}>Payment History</Menu.Item>
        <Menu.Item key="complaints" style={getMenuItemStyle(selectedKeys, "complaints")} onClick={() => navigate("/complaints")}>Complaints</Menu.Item>
        <Tooltip title="Hostel capacity: 80%">
          <Menu.Item key="capacity" style={{ display: "flex", alignItems: "center", fontSize: "14px", color: "black", marginRight: "10px" }}>
            <Progress percent={80} strokeColor="#1890ff" style={{ width: "120px" }} />
          </Menu.Item>
        </Tooltip>
        <Menu.Item key="search" style={{ display: "flex", alignItems: "center", fontSize: "14px", color: "black", marginLeft: "auto", marginRight: "10px" }}>
          <Input prefix={<SearchOutlined />} placeholder="Search" size="small" style={{ width: "150px", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }} />
        </Menu.Item>
        <Menu.Item key="profile" style={getMenuItemStyle(selectedKeys, "profile")} icon={<UserOutlined />} onClick={() => navigate("/profile")}>Profile</Menu.Item>
        <Menu.Item key="options" style={{ fontSize: "14px", color: "black", marginLeft: "0px", marginRight: "0px"}} onClick={handleDrawerOpen}>
          <MenuOutlined />
        </Menu.Item>
      </Menu>
      <Popover content={popoverContent} trigger="hover">
        <Button
          shape="circle"
          icon={<QuestionCircleOutlined />}
          style={{ border: "none", backgroundColor: "#f0f0f0", cursor: "pointer", marginLeft: "0px" }}
        />
      </Popover>
      <img
        src={orgLogo}
        alt="Organization Logo"
        style={{ height: "60px", cursor: "pointer", flexShrink: 0 }}
        onClick={handleLogoClick}
      />

      <Modal visible={isModalVisible} footer={null} onCancel={handleModalClose} centered bodyStyle={{ textAlign: "center" }}>
        <img src={orgLogo} alt="Organization Logo" style={{ maxWidth: "100%", height: "auto" }} />
      </Modal>

      <Drawer
        title="Additional Settings"
        placement="right"
        closable
        onClose={handleDrawerClose}
        visible={drawerVisible}
        width={300}
      >
        <Menu>
          <Menu.Item key="displaySettings" icon={<SettingOutlined />} onClick={() => navigate("/displaySettings")}>Display Settings</Menu.Item>
          <Menu.Item key="orgSettings" icon={<SettingOutlined />} onClick={() => navigate("/orgSettings")}>Org Settings</Menu.Item>
          <Menu.Item key="changePassword" icon={<LockOutlined />} onClick={() => navigate("/changePassword")}>Change Password</Menu.Item>
          <Menu.Item key="signOut" icon={<LogoutOutlined />} onClick={() => navigate("/signout")}>Sign Out</Menu.Item>
        </Menu>
      </Drawer>
    </div>
  );
};

const getMenuItemStyle = (selectedKeys, key) => ({
  fontSize: "14px",
  color: selectedKeys === key ? "blue" : "black",
  fontWeight: selectedKeys === key ? "bold" : "normal",
  borderBottom: selectedKeys === key ? "2px solid blue" : "none",
  marginRight: "6px",
});

export default MainMenu;
