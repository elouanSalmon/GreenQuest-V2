import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Home from "../../pages/Home/Home";
import Profile from "../../pages/Profile/Profile";
import About from "../../pages/About/About";
import Login from "../../pages/Login/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Dashboard from "../../pages/Dashboard/Dashboard";
import Offset from "../../pages/Offset/Offset";
import Quests from "../../pages/Quests/Quests";
import CreateQuest from "../../pages/CreateQuest/CreateQuest";
import PaymentSuccess from "../../pages/PaymentSuccess/PaymentSuccess";
import "./App.css";
import SignUp from "../../pages/SignUp/SignUp";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import Onboarding from "../../pages/Onboarding/Onboarding";
import { useAuth } from "../../contexts/AuthContext";
import Form from "../../pages/Form/Form";

function App() {
  const { hasCompletedOnboarding, hasFetchedOnboardingStatus, loading } =
    useAuth();

  const location = useLocation();

  // Check if the current route is onboarding
  const isOnboarding = location.pathname === "/onboarding";

  return (
    <div className="App">
      {!isOnboarding && <Navbar />}
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route
              index
              element={
                loading ? (
                  <div>Loading...</div> // Show a loading message or spinner
                ) : hasFetchedOnboardingStatus ? (
                  hasCompletedOnboarding ? (
                    <Home />
                  ) : (
                    <Navigate to="/onboarding" replace />
                  )
                ) : null
              }
            />

            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/offset" element={<Offset />} />
            <Route path="/quests" element={<Quests />} />
            <Route path="/create-quest" element={<CreateQuest />} />
            <Route path="/payment-successful" element={<PaymentSuccess />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/form" element={<Form />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
