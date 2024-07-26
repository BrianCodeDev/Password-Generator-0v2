// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Registration Route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  console.log('Received registration request:', req.body); // Log request body

  if (!username || !password) {
    console.error('Missing username or password'); // Log error
    return res.status(400).json({ message: 'Please fill all the fields' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.error('Username already taken'); // Log error
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Create a new user
    const newUser = new User({ username, password });
    await newUser.save();
    console.log('User registered successfully:', newUser); // Log success
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during user registration:', error); // Log error
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  console.log('Received login request:', req.body); // Log request body

  if (!username || !password) {
    console.error('Missing username or password'); // Log error
    return res.status(400).json({ message: 'Please fill all the fields' });
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      console.error('User not found'); // Log error
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Check if the password is correct
    if (user.password !== password) {
      console.error('Invalid password'); // Log error
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    console.log('Login successful:', user); // Log success
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error); // Log error
    res.status(500).json({ message: 'Server error' });
  }
});

// User Profile Route
router.get('/profile', async (req, res) => {
  const { username } = req.body;

  console.log('Received profile request:', req.body); // Log request body

  if (!username) {
    console.error('Missing username'); // Log error
    return res.status(400).json({ message: 'Username is required' });
  }

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      console.error('User not found'); // Log error
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Profile retrieved successfully:', user); // Log success
    res.status(200).json({ 
      username: user.username,
      // Add other fields you want to return here
    });
  } catch (error) {
    console.error('Error retrieving profile:', error); // Log error
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
