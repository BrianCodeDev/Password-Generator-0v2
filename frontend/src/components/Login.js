import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import login from '../assets/images/login.svg'; // Import the image
import logo from '../assets/images/dots.svg'; // Import the image

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/user/login', {
        username: formData.username,
        password: formData.password
      });

      // Assuming the backend sends a JWT token and username on successful login
      const { token, username } = response.data; 

      console.log('Login successful:', response.data);

      // Store the token and username in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);

      // Redirect to PasswordGenerator page
      navigate('/password-generator');
    } catch (error) {
      console.error('Login failed', error);
      // Optionally show an error message to the user
    }
  };

  return (
    <div class={"login-form"}>
      <div>
      <img src={logo} className="logo-register" alt="Logo" style={{ width: '40px', height: 'auto' }} />

      </div>
        <div>
          
        <img src={login} className="logo-register" alt="Logo" style={{ width: '180px', height: 'auto' }} />
        </div>
    <div>
    </div>
    <p>Let’s get you setup with a new account!</p>
    <form onSubmit={handleSubmit} class="form-content">
    <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
        required
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      
      
      <button type="submit">Login</button>
      <p>Already have an account?</p>
      <a href="/login">login</a>
    </form>
    </div>
  );
}

export default Login;
