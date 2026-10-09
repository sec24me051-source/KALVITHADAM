require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// CORS configuration supporting local dev and production Netlify domains
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or same-origin serverless calls)
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.length === 0 ||
        allowedOrigins.includes(origin) ||
        origin.endsWith('.netlify.app')
      ) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// Normalize body in case serverless-http attaches it as Buffer or raw string
app.use((req, res, next) => {
  if (Buffer.isBuffer(req.body)) {
    try {
      req.body = JSON.parse(req.body.toString('utf8'));
    } catch (e) {
      // Not JSON or empty body
    }
  } else if (typeof req.body === 'string' && req.body.trim().startsWith('{')) {
    try {
      req.body = JSON.parse(req.body);
    } catch (e) {
      // Not JSON
    }
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serverless DB connection middleware
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Database connection error in request handler:', error.message);
    res.status(500).json({
      message: 'Database connection failed',
      error: error.message,
    });
  }
});

// Common API Router
const apiRouter = express.Router();
apiRouter.get('/', (req, res) =>
  res.json({ message: 'Digital Education Platform API is running' })
);
apiRouter.use('/auth', require('./routes/auth'));
apiRouter.use('/students', require('./routes/students'));
apiRouter.use('/dropout-cases', require('./routes/dropout'));
apiRouter.use('/opportunities', require('./routes/opportunities'));
apiRouter.use('/courses', require('./routes/courses'));
apiRouter.use('/admin', require('./routes/admin'));

// Mount routes across supported path prefixes
app.use('/api', apiRouter);
app.use('/.netlify/functions/api', apiRouter);
app.use('/', apiRouter);

// 404 Handler
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Server Error' });
});

module.exports = app;
