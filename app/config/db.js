const mongoose = require('mongoose');
const { createDefaultServiceRecords } = require('../services/serviceRecord');

/**
 * Connects to the MongoDB database and performs some operations.
 *
 * @return {Promise<void>} This function does not return anything.
 */
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    createDefaultServiceRecords();

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

module.exports = {
  connectDb,
};
