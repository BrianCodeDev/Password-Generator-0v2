// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const auth = require('./middleware/auth');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Password Schema
const passwordSchema = new mongoose.Schema({
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Password = mongoose.model('Password', passwordSchema);

// Authentication Routes
app.use('/api/user', authRoutes);

// Generate Password Route
app.post('/api/generate-password', auth, async (req, res) => {
  const { length } = req.body;

  // Validate password length
  if (!length || length <= 0) {
    return res.status(400).json({ message: 'Invalid password length' });
  }

  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?";
  let password = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    password += charset.charAt(Math.floor(Math.random() * n));
  }

  try {
    const newPassword = new Password({ password });
    await newPassword.save();
    res.json({ password });
  } catch (error) {
    console.error('Failed to generate password:', error);
    res.status(500).json({ message: 'Server error while generating password' });
  }
});

// Fetch All Passwords Route
app.get('/api/passwords', auth, async (req, res) => {
  try {
    const passwords = await Password.find().sort({ createdAt: -1 });
    res.json(passwords);
  } catch (error) {
    console.error('Failed to fetch passwords:', error);
    res.status(500).json({ message: 'Server error while fetching passwords' });
  }
});

// User Profile Route (protected)
app.get('/api/user/profile', auth, async (req, res) => {
  try {
    // Assuming the user data is attached to req.user by the auth middleware
    const user = req.user;
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ username: user.username }); // Adjust based on your user schema
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    res.status(500).json({ message: 'Server error while fetching user profile' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
