import React, { useState, useEffect } from "react";
import { Menu, Input, Modal, Progress, Tooltip, Drawer, Button, Popover } from "antd";
import { SearchOutlined, UserOutlined, MenuOutlined, QuestionCircleOutlined, MailOutlined, SettingOutlined, LockOutlined, PoweroffOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo-transparent-png.png";
import './MainMenu.css'; // Import the CSS file

const MainMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [sideMenuVisible, setSideMenuVisible] = useState(false);
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
    "/displaySettings": "displaySettings",
    "/orgSettings": "orgSettings",
    "/changePassword": "changePassword",
    "/signout": "signOut",
  }[currentPath] || "home";

  useEffect(() => {
    const fetchProfileData = async () => {
      const response = await fetch('https://smart-hostel-management-json-server.onrender.com/profile');
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

  const handleSideMenuToggle = () => {
    setSideMenuVisible(!sideMenuVisible);
  };

  const menuItems = (
    <Menu mode="inline">
      {/* <Menu.Item key="home" onClick={() => navigate("/home")}>Home</Menu.Item> */}
      <Menu.Item key="rooms" onClick={() => navigate("/rooms")}>Rooms</Menu.Item>
      <Menu.Item key="tenants" onClick={() => navigate("/tenants")}>Tenants</Menu.Item>
      <Menu.Item key="reports" onClick={() => navigate("/reports")}>Analytics</Menu.Item>
      <Menu.Item key="rentDue" onClick={() => navigate("/rentDue")}>Rent Due</Menu.Item>
      <Menu.Item key="paymentHistory" onClick={() => navigate("/paymentHistory")}>Payment History</Menu.Item>
      <Menu.Item key="complaints" onClick={() => navigate("/complaints")}>Complaints</Menu.Item>
      <Menu.Item key="profile" onClick={() => navigate("/profile")}>Profile</Menu.Item>
    </Menu>
  );

  const sideMenuItems = (
    <Menu mode="inline">
      <Menu.Item key="displaySettings" onClick={() => navigate("/displaySettings")} icon={<SettingOutlined />}>Display Settings</Menu.Item>
      <Menu.Item key="orgSettings" onClick={() => navigate("/orgSettings")} icon={<SettingOutlined />}>Org Settings</Menu.Item>
      <Menu.Item key="changePassword" onClick={() => navigate("/changePassword")} icon={<LockOutlined />}>Change Password</Menu.Item>
      <Menu.Item key="signOut" onClick={() => navigate("/signout")} icon={<PoweroffOutlined />}>Sign Out</Menu.Item>
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

  if (currentPath === "/home") {
    return null; // Do not render the MainMenu component if on the home route
  }

  return (
    <div className="main-menu">
      <img
        src={logo}
        alt="Logo"
        className="logo"
        onClick={() => navigate("/home")}
      />
      <Button
        className="menu-button"
        icon={<MenuOutlined />}
        onClick={handleDrawerOpen}
      />
      <Drawer
        title="Menu"
        placement="left"
        closable
        onClose={handleDrawerClose}
        visible={drawerVisible}
        width={250}
      >
        {menuItems}
        <Tooltip title="Hostel capacity: 80%">
          <div style={{ marginTop: "16px" }}>
            <Progress percent={80} strokeColor="#1890ff" style={{ width: "100%" }} />
          </div>
        </Tooltip>
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search"
          size="small"
          style={{ width: "100%", marginTop: "16px", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
        />
        <Popover content={popoverContent} trigger="hover">
          <Button
            shape="circle"
            icon={<QuestionCircleOutlined />}
            style={{ border: "none", backgroundColor: "#f0f0f0", cursor: "pointer", marginTop: "16px" }}
          />
        </Popover>
      </Drawer>

      {/* Side Menu */}
      <Drawer
        title="Settings"
        placement="right"
        closable
        onClose={handleSideMenuToggle}
        visible={sideMenuVisible}
        width={250}
      >
        {sideMenuItems}
      </Drawer>

      <div className="desktop-menu">
        <Menu
          mode="horizontal"
          selectedKeys={[selectedKeys]}
          style={{
            backgroundColor: "transparent",
            display: "flex",
            alignItems: "center",
            fontFamily: "Playfair, Montserrat, sans-serif",
            borderBottom: "none",
            fontWeight: "bold",
            fontSize: "14px",
            margin: 0,
            padding: "0 10px",
            flex: 1,
          }}
        >
          {/* <Menu.Item key="home" style={getMenuItemStyle(selectedKeys, "home")} onClick={() => navigate("/home")}>Home</Menu.Item> */}
          <Menu.Item key="rooms" style={getMenuItemStyle(selectedKeys, "rooms")} onClick={() => navigate("/rooms")}>Rooms</Menu.Item>
          <Menu.Item key="tenants" style={getMenuItemStyle(selectedKeys, "tenants")} onClick={() => navigate("/tenants")}>Tenants</Menu.Item>
          <Menu.Item key="reports" style={getMenuItemStyle(selectedKeys, "reports")} onClick={() => navigate("/reports")}>Analytics</Menu.Item>
          <Menu.Item key="rentDue" style={getMenuItemStyle(selectedKeys, "rentDue")} onClick={() => navigate("/rentDue")}>Rent Due</Menu.Item>
          <Menu.Item key="paymentHistory" style={getMenuItemStyle(selectedKeys, "paymentHistory")} onClick={() => navigate("/paymentHistory")}>Payment History</Menu.Item>
          <Menu.Item key="complaints" style={getMenuItemStyle(selectedKeys, "complaints")} onClick={() => navigate("/complaints")}>Complaints</Menu.Item>
          <Menu.Item key="profile" style={getMenuItemStyle(selectedKeys, "profile")} icon={<UserOutlined />} onClick={() => navigate("/profile")}>Profile</Menu.Item>
          <Menu.Item
            key="settings"
            style={{ marginLeft: "auto" }}
            icon={<SettingOutlined />}
            onClick={handleSideMenuToggle}
          />
          <Tooltip title="Hostel capacity: 80%">
            <Menu.Item key="capacity" style={{ display: "flex", alignItems: "center", fontSize: "14px", color: "black", marginRight: "10px" }}>
              <Progress percent={80} strokeColor="#1890ff" style={{ width: "120px" }} />
            </Menu.Item>
          </Tooltip>
          <Menu.Item key="search" style={{ display: "flex", alignItems: "center", fontSize: "14px", color: "black", marginLeft: "10px" }}>
            <Input prefix={<SearchOutlined />} placeholder="Search" size="small" style={{ width: "150px", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }} />
          </Menu.Item>
          <Menu.Item key="help" icon={<QuestionCircleOutlined />} />
        </Menu>
      </div>
      <img
        src={orgLogo}
        alt="Logo"
        className="logo"
        onClick={handleLogoClick}
      />
      <Modal
        title="Organization Logo"
        visible={isModalVisible}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        footer={null}
      >
        <img src={orgLogo} alt="Organization Logo" style={{ width: "100%" }} />
      </Modal>
    </div>
  );
};

const getMenuItemStyle = (selectedKeys, key) => ({
  color: selectedKeys === key ? "#1890ff" : "black",
  fontWeight: selectedKeys === key ? "bold" : "normal",
  margin: "0 10px",
  padding: "0 5px",
  borderBottom: selectedKeys === key ? "2px solid #1890ff" : "none",
});

export default MainMenu;
