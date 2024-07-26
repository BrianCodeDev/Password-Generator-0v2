import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making API requests

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
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(true); // New state for authentication status
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false); // Set authentication status to false
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setUsername(response.data.username);

        const storedPasswords = JSON.parse(localStorage.getItem('passwordsList')) || [];
        setPasswordsList(storedPasswords);
      } catch (error) {
        console.error('Failed to fetch user data:');
        console.error('Error message:', error.message);
        console.error('Error code:', error.code);
        console.error('Error response:', error.response);
        console.error('Error request:', error.request);

        if (error.response && error.response.status === 401) {
          setError('Unauthorized access. Please log in again.');
          setIsAuthenticated(false); // Set authentication status to false
        } else {
          setError('Failed to fetch user data. Please try again.');
        }
      }
    };

    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem('passwordsList', JSON.stringify(passwordsList));
  }, [passwordsList]);

  const handleGeneratePassword = () => {
    const newPassword = generatePassword(12); // Generate a password of length 12
    setPassword(newPassword);
    setPasswordsList((prevList) => [newPassword, ...prevList]); // Add new password to the list
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setIsAuthenticated(false); // Set authentication status to false
  };

  if (!isAuthenticated) {
    return (
      <div>
        <h1>Session Expired</h1>
        <p>Your session has expired or you are not authorized. Please log in again.</p>
        <button onClick={() => navigate('/login')}>Go to Login Page</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Password Generator</h1>
      {error && <p className="error-message">{error}</p>} {/* Display error message */}
      <p>Welcome, {username}!</p> {/* Display the username */}
      <button onClick={handleGeneratePassword}>Generate Password</button>
      <button onClick={handleLogout}>Logout</button> {/* Add logout button */}
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
