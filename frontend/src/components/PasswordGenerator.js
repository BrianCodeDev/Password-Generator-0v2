import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
    const storedPasswords = JSON.parse(localStorage.getItem('passwordsList')) || [];
    setPasswordsList(storedPasswords);
  }, []);

  useEffect(() => {
    localStorage.setItem('passwordsList', JSON.stringify(passwordsList));
  }, [passwordsList]);

  const handleGeneratePassword = () => {
    if (isAuthenticated) {
      const newPassword = generatePassword(12);
      setPassword(newPassword);
      setPasswordsList((prevList) => [newPassword, ...prevList]);
    }
  };

  return (
    <div>
      <h1>Password Generator</h1>
      {!isAuthenticated && (
        <div>
          <h2>Session Expired</h2>
          <p>Your session has expired or you are not authorized. Please log in again.</p>
        </div>
      )}
      <button onClick={handleGeneratePassword} disabled={!isAuthenticated}>
        Generate Password
      </button>
      {password && (
        <div>
          <h2>Generated Password:</h2>
          <p>{password}</p>
        </div>
      )}
      {passwordsList.length > 0 && (
        <div>
          <h2>Generated Passwords History:</h2>
          <ul>
            {passwordsList.map((pwd, index) => (
              <li key={index}>{pwd}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PasswordGenerator;
