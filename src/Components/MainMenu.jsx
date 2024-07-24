import React, { useEffect, useState } from "react";
import { Menu, Input, Progress, Tooltip } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-1.png";

const MainMenu = () => {
  const navigate = useNavigate();
  const [tenantCount, setTenantCount] = useState(0);

  useEffect(() => {
    const fetchTenantData = async () => {
      try {
        const response = await fetch("http://localhost:3030/rooms");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const rooms = await response.json();

        let count = 0;
        rooms.forEach((room) => {
          count += room.tenants.length;
        });

        setTenantCount(count);
      } catch (error) {
        console.error("Error fetching tenant data:", error);
      }
    };

    fetchTenantData();
  }, []);

  const totalCapacity = 10; // Full capacity of the hostel
  const progressPercentage = (tenantCount / totalCapacity) * 100;

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        height: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={logo}
          alt="Logo"
          style={{ height: "60px", marginRight: "20px" }}
        />
        <Menu
          mode="horizontal"
          defaultSelectedKeys={["home"]}
          style={{
            backgroundColor: "transparent",
            display: "flex",
            textTransform: "uppercase",
            fontFamily: "Playfair, Montserrat, sans-serif",
            fontWeight: "bold",
          }}
        >
          <Menu.Item
            key="home"
            style={{ fontSize: "14px", color: "black", padding: "0 10px" }}
            onClick={() => navigate("/home")}
          >
            Home
          </Menu.Item>
          <Menu.Item
            key="rooms"
            style={{ fontSize: "14px", color: "black", padding: "0 10px" }}
            onClick={() => navigate("/rooms")}
          >
            Rooms
          </Menu.Item>
          <Menu.Item
            key="tenants"
            style={{ fontSize: "14px", color: "black", padding: "0 10px" }}
            onClick={() => navigate("/tenants")}
          >
            Tenants
          </Menu.Item>
          <Menu.Item
            key="rentDue"
            style={{ fontSize: "14px", color: "black", padding: "0 10px" }}
            onClick={() => navigate("/rentDue")}
          >
            Rent Due
          </Menu.Item>
          <Menu.Item
            key="paymentHistory"
            style={{ fontSize: "14px", color: "black", padding: "0 10px" }}
            onClick={() => navigate("/paymentHistory")}
          >
            Payment History
          </Menu.Item>
          <Menu.Item
            key="complaints"
            style={{ fontSize: "14px", color: "black", padding: "0 10px" }}
            onClick={() => navigate("/complaints")}
          >
            Complaints
          </Menu.Item>
        </Menu>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Input
          size="small"
          prefix={<SearchOutlined />}
          placeholder="Search a Tenant"
          style={{
            width: "250px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            marginRight: "20px",
          }}
        />
        <Tooltip title={`Tenant Count: ${tenantCount} / ${totalCapacity}`}>
          <div style={{ width: "120px", marginRight: "20px" }}>
            <Progress percent={progressPercentage} size="small" />
          </div>
        </Tooltip>
        <Menu
          mode="horizontal"
          style={{
            backgroundColor: "transparent",
            display: "flex",
            alignItems: "center",
            borderBottom: "none",
          }}
        >
          <Menu.Item
            key="profile"
            style={{ fontSize: "14px", color: "black" }}
            icon={<UserOutlined />}
            onClick={() => navigate("/profile")}
          >
            Profile
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

export default MainMenu;
