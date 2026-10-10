const bcrypt = require('bcryptjs');
const { eq } = require('drizzle-orm');
const { db, schema } = require('../config/db');
const generateToken = require('../utils/generateToken');

const { users } = schema;

const userResponse = async (user) => ({
  _id: user.id, name: user.name, email: user.email, role: user.role, school: user.school,
  token: await generateToken(user.id)
});

// @desc    Register user
// @route   POST /api/auth/register
const register = async (req, res) => {
  try {
    const { name, password, role, school } = req.body;
    const email = (req.body.email || '').trim().toLowerCase();
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email and password' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }
    const [userExists] = await db.select({ id: users.id }).from(users).where(eq(users.email, email));
    if (userExists) return res.status(400).json({ message: 'User already exists with this email' });

    // Prevent self-registering as admin
    const safeRole = ['student', 'teacher'].includes(role) ? role : 'student';

    const [user] = await db.insert(users).values({
      name: name.trim(), email, password: await bcrypt.hash(password, 12), role: safeRole, school: school || ''
    }).returning();
    res.status(201).json(await userResponse(user));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
const login = async (req, res) => {
  try {
    const { password } = req.body;
    const email = (req.body.email || '').trim().toLowerCase();
    if (!email || !password) return res.status(400).json({ message: 'Please provide email and password' });

    const [user] = await db.select().from(users).where(eq(users.email, email));
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.json(await userResponse(user));
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
