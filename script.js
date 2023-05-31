const mongoose = require("mongoose");
const ServiceRecord = require("./models/ServiceRecord");
const Order = require("./models/Order");

// MongoDB Atlas connection URL
const MONGODB_URI =
  "mongodb+srv://sid:WykCNTa2sTpWEEpc@cluster0.25szcki.mongodb.net/?retryWrites=true&w=majority";

// Connect to MongoDB Atlas
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    // Run the script to populate service records and orders
    runScript();
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB Atlas:", error);
  });

// Sample data
const serviceRecordsData = [
  { name: "Inspection" },
  { name: "Testing" },
  { name: "Analysis" },
];

// Function to populate service records
const populateServiceRecords = async () => {
  try {
    await ServiceRecord.deleteMany(); // Clear existing service records
    const serviceRecords = await ServiceRecord.insertMany(serviceRecordsData);
    console.log("Service records populated successfully");
    return serviceRecords;
  } catch (error) {
    console.error("Failed to populate service records:", error);
  }
};

// Function to create orders
const createOrders = async (serviceRecords) => {
  try {
    await Order.deleteMany(); // Clear existing orders

    const ordersData = [
      {
        totalfee: 100,
        services: [serviceRecords[0]._id], // Use the _id of the first service record
      },
      {
        totalfee: 100,
        services: [serviceRecords[1]._id], // Use the _id of the second service record
      },
      {
        totalfee: 100,
        services: [serviceRecords[2]._id], // Use the _id of the third service record
      },
    ];

    await Order.insertMany(ordersData);
    console.log("Orders created successfully");
  } catch (error) {
    console.error("Failed to create orders:", error);
  }
};

// Run the script to populate service records and create orders
const runScript = async () => {
  try {
    const serviceRecords = await populateServiceRecords();
    await createOrders(serviceRecords);
    mongoose.connection.close();
    console.log("Script execution completed");
  } catch (error) {
    console.error("Failed to run script:", error);
  }
};

// Run the script to populate service records and create orders
runScript();
