// frontend/src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import register from '../assets/images/register.svg'; // Import the image
import logo from '../assets/images/dots.svg'; // Import the image
function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/user', {
        username: formData.username,
        password: formData.password,
      });
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <div class={"register-form"}>
        <div>
        <img src={logo} className="logo-register" alt="Logo" style={{ width: '40px', height: 'auto' }} />
        </div>
    <div>
    <img src={register} className="register" alt="register" style={{ width: '180px', height: 'auto' }} />
    </div>
    <p>Let’s get you setup with a new account!</p>
    <form onSubmit={handleSubmit} class="form-content">
        <div>
            <label>USERNAME</label> <br />
        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />

        </div>
        <div>
        <label>PASSWORD</label>
        <br />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />

        </div>
        <div>
            
        <label>CONFIRM PASSWORD</label>
        <br />
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required />

        </div>
      <button type="submit" class={"register-page"}>Register</button>
      <p>Already have an account?</p>
      <a href="/login">login</a>
    </form>
    </div>
  );
}

export default Register;
