import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Layout } from "antd";
import "./App.css";
import About from "./Components/About";
import RoomList from "./Components/RoomList";
import AddEditRoom from "./Components/AddEditRoom";
import TenantsList from "./Components/TenantsList";
import AddEditTenant from "./Components/AddEditTenant";
import RentDueList from "./Components/RentDueList";
import PaymentHistory from "./Components/PaymentHistory";
import ComplaintsList from "./Components/ComplaintsList";
import AddComplaint from "./Components/AddComplaint";
import Profile from "./Components/Profile";
import DisplaySettings from "./Components/DisplaySettings";
import OrgSettings from "./Components/OrgSettings";
import MainMenu from "./Components/MainMenu";
import ReportsAndAnalytics from "./Components/ReportsAndAnalytics";

const { Header, Content } = Layout;

const App = () => {
  return (
    <Router>
      <Layout className="layout">
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
        <Content>
          <div className="site-layout-content">
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<About />} />
              <Route path="/rooms" element={<RoomList />} />
              <Route path="/addRoom" element={<AddEditRoom />} />
              <Route path="/tenants" element={<TenantsList />} />
              <Route path="/addTenant" element={<AddEditTenant />} />
              <Route path="/rentDue" element={<RentDueList />} />
              <Route path="/paymentHistory" element={<PaymentHistory />} />
              <Route path="/complaints" element={<ComplaintsList />} />
              <Route path="/addComplaint" element={<AddComplaint />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/displaySettings" element={<DisplaySettings />} />
              <Route path="/orgSettings" element={<OrgSettings />} /> 
              <Route path="/reports" element={<ReportsAndAnalytics />} /> 

            </Routes>
          </div>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
