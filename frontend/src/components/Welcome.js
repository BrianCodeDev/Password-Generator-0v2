import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Import a CSS file for styling the loading animation
import logo from '../assets/images/dots.svg'; // Import the image
import truepass from '../assets/images/true-pass.svg'; // Import the image

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
     navigate('/intro');
     }, 8000); 

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="welcome-container">
        <img src={logo} alt="Logo" style={{ width: '100px', height: 'auto' }} />
        <img src={truepass} alt="truepass" style={{ width: '150px', height: 'auto' }} />

      <p>Loading...</p>
    </div>
  );
};

export default Welcome;
