import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import ReportsAndAnalytics from "./Components/ReportsAndAnalytics";
import SignOut from "./Components/SignOut";
import ChangePassword from "./Components/ChangePassword";
import Login from "./Components/Login";
import Signup from "./Components/SignUp";
import { AuthProvider } from "./Components/AuthContext"; 
import PrivateRoute from "./Components/PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import AppLayout from "./Components/AppLayout";
import Subscribe from "./Components/Subscribe";
import Settings from "./Components/Settings";
import Notice from "./Components/Notice";
import WeeklyFoodMenu from "./Components/WeeklyFoodMenu";
import ParcelManagement from "./Components/ParcelManagement";
import SuggestionBox from "./Components/SuggestionBox";
import Feedback from "./Components/FeedbackCard";
import HostelTourGuide from "./Components/HostelTourGuide";
import TenantNoticeView from "./Components/TenantNoticeView";
import TenantFeedbackPage from "./TenantFeedbackPage";
import TenantSuggestionBox from "./Components/TenantSuggestionBox.jsx";
import TenantParcelManagement from "./Components/TenantParcelManagement .jsx";

localStorage.setItem('isFreeTrial', 'false');

const feedbackList = [
  {
    id: 1,
    content: "The common room needs more comfortable seating.",
    category: "Facilities",
    likes: 5,
    dislikes: 1,
    date: "2024-08-17",
  },
  {
    id: 2,
    content: "Please add more vegetarian options to the menu.",
    category: "Food",
    likes: 8,
    dislikes: 2,
    date: "2024-08-16",
  },
  // Add more feedback items as needed
];
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />  
            <Route path="/home" element={<PrivateRoute element={About} />} />
            <Route path="/rooms" element={<PrivateRoute element={RoomList} />} />
            <Route path="/addRoom" element={<PrivateRoute element={AddEditRoom} />} />
            <Route path="/tenants" element={<PrivateRoute element={TenantsList} />} />
            <Route path="/addTenant" element={<PrivateRoute element={AddEditTenant} />} />
            <Route path="/rentDue" element={<PrivateRoute element={RentDueList} />} />
            <Route path="/paymentHistory" element={<PrivateRoute element={PaymentHistory} />} />
            <Route path="/complaints" element={<PrivateRoute element={ComplaintsList} />} />
            <Route path="/addComplaint" element={<PrivateRoute element={AddComplaint} />} />
            <Route path="/profile" element={<PrivateRoute element={Profile} />} />
            <Route path="/settings" element={<PrivateRoute element={Settings} />} />
            <Route path="/reports" element={<PrivateRoute element={ReportsAndAnalytics} />} /> 
            <Route path="/signout" element={<PrivateRoute element={SignOut} />} /> 
            <Route path="/changepassword" element={<PrivateRoute element={ChangePassword} />} /> 
            <Route path="/subscribe" element={<Subscribe/>} /> 
            <Route path="/notice" element={<PrivateRoute element={Notice} />} /> 
            <Route path="/foodMenu" element={<PrivateRoute element={WeeklyFoodMenu} />} /> 
            <Route path="/parcelManagement" element={<PrivateRoute element={ParcelManagement} />} />
            <Route path="/suggestionsBox" element={<PrivateRoute element={SuggestionBox} />} />  
            <Route path="/feedback" element={<PrivateRoute element={Feedback} feedbackList={feedbackList} />} />  
            <Route path="/hostelTour" element={<PrivateRoute element={HostelTourGuide} />} />  
            <Route path="/tenantNotice" element={<PrivateRoute element={TenantNoticeView} />} /> 
            <Route path="/tenantFeedback" element={<PrivateRoute element={TenantFeedbackPage} />} /> 
            <Route path="/tenantSuggestionBox" element={<PrivateRoute element={TenantSuggestionBox} />} />
            <Route path="/tenantParcelManagement" element={<PrivateRoute element={TenantParcelManagement} />} />  
          </Routes>
        </AppLayout>
      </Router>
    </AuthProvider>
  );
};

export default App;
