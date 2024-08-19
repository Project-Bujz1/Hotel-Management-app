import React, { useState, useEffect } from "react";
import { Menu, Input, Modal, Progress, Tooltip, Drawer, Button, Popover } from "antd";
import { SearchOutlined, UserOutlined, MenuOutlined, QuestionCircleOutlined, MailOutlined, SettingOutlined, LockOutlined, PoweroffOutlined, NotificationOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo-transparent-png.png";
import './MainMenu.css'; // Import the CSS file
import { MdMeetingRoom } from "react-icons/md";
import { FaPersonShelter } from "react-icons/fa6";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { TbCalendarDue } from "react-icons/tb";
import { GiPayMoney } from "react-icons/gi";
import { GiAutoRepair } from "react-icons/gi";
import { ImProfile } from "react-icons/im";
import { TbPackages } from "react-icons/tb";
import { VscFeedback } from "react-icons/vsc";
import { FaBowlFood } from "react-icons/fa6";
import { MdViewCompact } from "react-icons/md";
import { MdOutlineTour } from "react-icons/md";
import MenuItem from "antd/es/menu/MenuItem";
import { IoHomeOutline } from "react-icons/io5";

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
      <Menu.Item key="profile" onClick={() => navigate("/profile")}>Profile</Menu.Item>
    </Menu>
  );
  const userRole = localStorage.getItem('role'); 

  const sideMenuItems = (
    <Menu mode="inline">
      <Menu.Item key="settings" onClick={() => {navigate("/settings"); handleSideMenuToggle() }} icon={<SettingOutlined />}>Settings</Menu.Item>      
      <Menu.Divider />
      <Menu.Item key="home" onClick={() => {navigate("/home");handleSideMenuToggle() }} icon={<IoHomeOutline />}>Home</Menu.Item>
      <Menu.Item key="rooms" onClick={() => {navigate("/rooms");handleSideMenuToggle() }} icon={<MdMeetingRoom />}>Rooms</Menu.Item>
      <Menu.Item key="tenants" onClick={() => {navigate("/tenants"); handleSideMenuToggle()}} icon={<FaPersonShelter />}>Tenants</Menu.Item>
      <Menu.Item key="reports" onClick={() => {navigate("/reports"); handleSideMenuToggle()}} icon={<TbDeviceDesktopAnalytics />}>Analytics</Menu.Item>
      <Menu.Item key="rentDue" onClick={() => {navigate("/rentDue"); handleSideMenuToggle()}} icon={<TbCalendarDue />}>Rent Due</Menu.Item>
      <Menu.Item key="paymentHistory" onClick={() => {navigate("/paymentHistory"); handleSideMenuToggle()}} icon={<GiPayMoney />}>Payment History</Menu.Item>
      <Menu.Item key="foodMenu" onClick={() => {navigate("/foodMenu"); handleSideMenuToggle()}} icon={<FaBowlFood />}>Food Menu</Menu.Item>
      <Menu.Item key="hostelTour" onClick={() => {navigate("/hostelTour"); handleSideMenuToggle()}} icon={<MdOutlineTour />}>Hostel Tour/Guide</Menu.Item>
      <Menu.Item key="complaints" onClick={() => {navigate("/complaints"); handleSideMenuToggle()}} icon={<GiAutoRepair />}>Complaints</Menu.Item>
      {userRole !== "Tenant" ? (
        <Menu.Item key="parcelManagement" onClick={() => {navigate("/parcelManagement"); handleSideMenuToggle()}} icon={<TbPackages />}>Parcel Management</Menu.Item>   ) : (<Menu.Item key="tenantParcelManagement" onClick={() => {navigate("/tenantParcelManagement"); handleSideMenuToggle()}} icon={<TbPackages />}>Parcel Management</Menu.Item>  
      )}      
      
      {userRole !== "Tenant" ? (
        <Menu.Item key="suggestionsBox" onClick={() => {navigate("/suggestionsBox"); handleSideMenuToggle()}} icon={<QuestionCircleOutlined />}>Suggestions Box</Menu.Item>  ) : (<Menu.Item key="tenantSuggestionBox" onClick={() => {navigate("/tenantSuggestionBox"); handleSideMenuToggle()}} icon={<QuestionCircleOutlined />}>Suggestions Box</Menu.Item>  
      )}      
      
      {userRole !== "Tenant" ? (
 <Menu.Item key="feedback" onClick={() => {navigate("/feedback"); handleSideMenuToggle()}} icon={<VscFeedback />}>Feedback</Menu.Item>      ) : (<Menu.Item key="tenantFeedback" onClick={() => {navigate("/tenantFeedback"); handleSideMenuToggle()}} icon={<VscFeedback />}>Feedback</Menu.Item>  
)}      

      {userRole !== "Tenant" ? (
        <Menu.Item
          key="notice"
          onClick={() => {
            navigate("/notice");
            handleSideMenuToggle();
          }}
          icon={<NotificationOutlined />}
        >
          Notice
        </Menu.Item>
      ) : (
        <Menu.Item
          key="tenantNotice"
          onClick={() => {
            navigate("/tenantNotice");
            handleSideMenuToggle();
          }}
          icon={<NotificationOutlined />}
        >
          Notice
        </Menu.Item>
      )}      
      <Menu.Item key="profile" onClick={() => {navigate("/profile"); handleSideMenuToggle()}} icon={<ImProfile />}>Profile</Menu.Item>
      <Menu.Item key="changePassword" onClick={() => {navigate("/changePassword"); handleSideMenuToggle()}} icon={<LockOutlined />}>Change Password</Menu.Item>
      <Menu.Item key="signOut" onClick={() => {navigate("/signout"); handleSideMenuToggle()}} icon={<PoweroffOutlined />}>Sign Out</Menu.Item>
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
      <Drawer
        title="Manage"
        placement="right"
        closable
        onClose={handleSideMenuToggle}
        visible={sideMenuVisible}
        width={300}
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
          <Menu.Item key="rooms" style={getMenuItemStyle(selectedKeys, "rooms")} onClick={() => navigate("/rooms")}>Rooms</Menu.Item>
          <Menu.Item key="tenants" style={getMenuItemStyle(selectedKeys, "tenants")} onClick={() => navigate("/tenants")}>Tenants</Menu.Item>
          <Menu.Item key="reports" style={getMenuItemStyle(selectedKeys, "reports")} onClick={() => navigate("/reports")}>Analytics</Menu.Item>
          <Menu.Item key="rentDue" style={getMenuItemStyle(selectedKeys, "rentDue")} onClick={() => navigate("/rentDue")}>Rent Due</Menu.Item>
          <Menu.Item key="paymentHistory" style={getMenuItemStyle(selectedKeys, "paymentHistory")} onClick={() => navigate("/paymentHistory")}>Payment History</Menu.Item>
          <Menu.Item key="profile" style={getMenuItemStyle(selectedKeys, "profile")} icon={<UserOutlined />} onClick={() => navigate("/profile")}>Profile</Menu.Item>
          <Tooltip title="Hostel capacity: 80%">
            <Menu.Item key="capacity" style={{ display: "flex", alignItems: "center", fontSize: "14px", color: "black", marginRight: "10px" }}>
              <Progress percent={80} strokeColor="#1890ff" style={{ width: "120px" }} />
            </Menu.Item>
          </Tooltip>
          <Menu.Item key="help">
        <Popover content={popoverContent} trigger="hover">
          <Button
            shape="circle"
            icon={<QuestionCircleOutlined />}
            style={{ border: 'none', backgroundColor: '#f0f0f0', cursor: 'pointer' }}
          />
        </Popover>
      </Menu.Item>
        </Menu>
      </div>
      <Button
      style={{marginRight : "20px"}}
        className="settings-button"
        icon={<MdViewCompact />        }
        onClick={handleSideMenuToggle}
      />
      <img
        src={orgLogo}
        alt="Organization Logo"
        className="org-logo"
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
