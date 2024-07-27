import React, { useState, useEffect } from 'react';
import '../App.css'; // Import the CSS file
import plusbutton from '../assets/images/plusbutton.svg'; // Import the image
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faHouse, faUser } from '@fortawesome/free-solid-svg-icons';

const generatePassword = (length) => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [passwordsList, setPasswordsList] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    // Check authentication status
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }

    // Retrieve stored passwords list from localStorage
    const storedPasswords = JSON.parse(localStorage.getItem('passwordsList')) || [];
    setPasswordsList(storedPasswords);
  }, []);

  useEffect(() => {
    // Store passwords list in localStorage whenever it changes
    localStorage.setItem('passwordsList', JSON.stringify(passwordsList));
  }, [passwordsList]);

  const handleGeneratePassword = () => {
    if (isAuthenticated) {
      const newPassword = generatePassword(12);
      setPassword(newPassword);
      setPasswordsList((prevList) => [newPassword, ...prevList]); // Update passwords list
    }
  };

  return (
    <div className="password-gen">
      <div className="box-container">
        <div className="box">
          <div><h1>5</h1></div>
          <div><h2>Passwords
          Stored</h2></div>
        </div>
        <div className="box"></div>
      </div>
      <div className={'input-center'}>
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <input className={'search-box'} placeholder={'Search Websites...'}/>
      </div>

      <div className={'footer-bottom'}>
      <footer>
        <div className='content-footer'>
        <div>
        <FontAwesomeIcon icon={faHouse} className='fahouse'/>
        </div>
        <div className={'plusbutton-footer'}>
          <a href="#">
        <img src={plusbutton} className="plusbutton" alt="plusbutton" style={{ width: '60px', height: 'auto' }} />
        </a>
        </div>
        <div>
        <FontAwesomeIcon icon={faUser} className='fauser'/>
        </div>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default PasswordGenerator;
