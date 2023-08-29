//App.jsx

import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

import Onboarding from "./Onboarding";

import Home from "./Home";
import Profile from "./Profile";
import About from "./About";
import Login from "./Login";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import Dashboard from "./Dashboard";
import Offset from "./Offset";
import Quests from "./Quests";
import CreateQuest from "./CreateQuest";
import PaymentSuccess from "./PaymentSuccess";
import Form from "./Form";
import OffsetSettings from "./OffsetSettings";

import SignUp from "./SignUp";
import ResetPassword from "./ResetPassword";

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
                  <div>Loading...</div>
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
            <Route path="/offset-settings" element={<OffsetSettings />} />
            <Route path="/quests" element={<Quests />} />
            <Route path="/create-quest" element={<CreateQuest />} />
            <Route path="/payment-successful" element={<PaymentSuccess />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/form" element={<Form />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
