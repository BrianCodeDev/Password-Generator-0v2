import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PasswordGenerator from './components/PasswordGenerator';
import Register from './components/Register';
import Login from './components/Login';
import SlideOne from './components/SlideOne'; // Capitalized
import SlideTwo from './components/SlideTwo'; // Capitalized
import Welcome from './components/Welcome';
import Introduction from './components/Introduction';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
        const isTokenExpired = Date.now() >= decoded.exp * 1000;
        if (isTokenExpired) {
          localStorage.removeItem('token'); // Remove expired token
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error decoding token', error);
        localStorage.removeItem('token');
      }
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/intro" element={<Introduction />} />
        <Route path="/slideone" element={<SlideOne />} />
        <Route path="/slidetwo" element={<SlideTwo />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/password-generator" 
          element={isAuthenticated ? <PasswordGenerator /> : <Navigate to="/login" />} 
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
