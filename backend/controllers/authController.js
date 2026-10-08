const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Register user
// @route   POST /api/auth/register
const register = async (req, res) => {
  try {
    const { name, email, password, role, school } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email and password' });
    }
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists with this email' });

    // Prevent self-registering as admin
    const safeRole = role === 'admin' ? 'student' : (role || 'student');

    const user = await User.create({ name, email, password, role: safeRole, school: school || '' });
    res.status(201).json({
      _id: user._id, name: user.name, email: user.email, role: user.role, school: user.school,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Please provide email and password' });

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.json({
      _id: user._id, name: user.name, email: user.email, role: user.role, school: user.school,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
const getMe = async (req, res) => {
  res.json({ _id: req.user._id, name: req.user.name, email: req.user.email, role: req.user.role, school: req.user.school });
};

module.exports = { register, login, getMe };
