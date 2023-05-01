import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Home from '../../pages/Home/Home';
import Profile from '../../pages/Profile/Profile';
import About from '../../pages/About/About';
import Login from '../../pages/Login/Login';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Dashboard from '../../pages/Dashboard/Dashboard';
import Offset from '../../pages/Offset/Offset';
import Quests from '../../pages/Quests/Quests';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route index element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/offset" element={<Offset />} />
            <Route path="/quests" element={<Quests />} /> {/* Add the Quests route */}
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
