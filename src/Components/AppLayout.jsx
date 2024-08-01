// AppLayout.js
import React from "react";
import { useLocation } from "react-router-dom";
import { Layout } from "antd";
import MainMenu from "./MainMenu"

const { Header, Content } = Layout;

const AppLayout = ({ children }) => {
  const location = useLocation();
  const shouldShowHeader = !['/login', '/signup', '/forgot-password'].includes(location.pathname);

  return (
    <Layout className="layout">
      {shouldShowHeader && (
        <Header
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            backgroundColor: "transparent",
            padding: 0,
          }}
        >
          <MainMenu />
        </Header>
      )}
      <Content>
        <div className="site-layout-content">
          {children}
        </div>
      </Content>
    </Layout>
  );
};

export default AppLayout;
