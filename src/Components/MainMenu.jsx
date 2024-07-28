import React from "react";
import { Menu, Input } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-1.png";

const MainMenu = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0)",
        height: "80px",
        display: "flex",
        alignItems: "center",
        overflowX: "hidden",
      }}
    >
      <img src={logo} alt="Logo" style={{ height: "60px", margin: "10px" }} />
      <Menu
        mode="horizontal"
        defaultSelectedKeys={["home"]}
        style={{
          backgroundColor: "transparent",
          flex: 1,
          display: "flex",
          textTransform: "uppercase",
          fontFamily: "Playfair, Montserrat, sans-serif",
          textShadow: "2px 2px 4px white",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "none",
          fontWeight: "bold",
        }}
      >
        <Menu.Item
          key="home"
          style={{
            fontSize: "18px",
            color: "black",
            textShadow: "1px 1px 2px white",
          }}
          onClick={() => navigate("/home")}
        >
          Home
        </Menu.Item>
        <Menu.Item
          key="rooms"
          style={{
            fontSize: "18px",
            color: "black",
            textShadow: "1px 1px 2px white",
          }}
          onClick={() => navigate("/rooms")}
        >
          Rooms
        </Menu.Item>
        <Menu.Item
          key="tenants"
          style={{
            fontSize: "18px",
            color: "black",
            textShadow: "1px 1px 2px white",
          }}
          onClick={() => navigate("/tenants")}
        >
          Tenants
        </Menu.Item>
        <Menu.Item
          key="rentDue"
          style={{
            fontSize: "18px",
            color: "black",
            textShadow: "1px 1px 2px white",
          }}
          onClick={() => navigate("/rentDue")}
        >
          Rent Due
        </Menu.Item>
        <Menu.Item
          key="paymentHistory"
          style={{
            fontSize: "18px",
            color: "black",
            textShadow: "1px 1px 2px white",
          }}
          onClick={() => navigate("/paymentHistory")}
        >
          Payment History
        </Menu.Item>
        <Menu.Item
          key="complaints"
          style={{
            fontSize: "18px",
            color: "black",
            textShadow: "1px 1px 2px white",
          }}
          onClick={() => navigate("/complaints")}
        >
          Complaints
        </Menu.Item>
        <Menu.Item
          key="search"
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "18px",
            color: "black",
            flex: 2,
            marginLeft: "10px",
          }}
        >
          <Input
            prefix={<SearchOutlined style={{ width: "100%" }} />}
            placeholder="Search"
            style={{
              width: "100%",
              borderRadius: "5px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
        </Menu.Item>
        <Menu.Item
          key="profile"
          style={{
            fontSize: "18px",
            color: "black",
            textShadow: "1px 1px 2px white",
          }}
          icon={<UserOutlined />}
          onClick={() => navigate("/profile")}
        >
          Profile
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default MainMenu;
