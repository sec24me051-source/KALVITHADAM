const mongoose = require('mongoose');

let cachedPromise = null;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (cachedPromise) {
    return cachedPromise;
  }

  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error('MONGO_URI environment variable is not defined');
  }

  try {
    cachedPromise = mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    await cachedPromise;
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    return mongoose.connection;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    cachedPromise = null;
    throw error;
  }
};

module.exports = connectDB;
