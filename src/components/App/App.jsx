import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Home from '../../pages/Home/Home';
import Profile from '../../pages/Profile/Profile';
import About from '../../pages/About/About';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

function NotFound() {
  return (
    <div>
      <h1>404 Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  );
}

export default App;
