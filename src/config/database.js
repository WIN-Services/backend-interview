const mongoose = require('mongoose');
const dataBaseName = 'order-management';
const connectDatabase = async () => {
  try {
    const connectionOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    };

    await mongoose.connect(`mongodb://localhost:27017/${dataBaseName}`, connectionOptions);
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1); // Exit the application if the database connection fails
  }
};

module.exports = connectDatabase;
