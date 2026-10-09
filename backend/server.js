require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// Connect to MongoDB upfront when running standalone server
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to start server due to DB connection error:', err.message);
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT} (warning: DB disconnected)`)
    );
  });
