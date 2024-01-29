// Import the Service model
const Service = require('../models/serviceModel');

// Data to insert into the services table
const serviceRecords = [
  { id: 123, name: 'Inspection' },
  { id: 789, name: 'Testing' },
  { id: 456, name: 'Analysis' }
];

// Function to seed data into the services table
async function seedServices() {
  try {
    // Insert data into the services table
    await Service.bulkCreate(serviceRecords);
    console.log('Service records inserted successfully');
  } catch (error) {
    console.error('Error inserting service records:', error);
  }
}

// Call the function to seed data into the services table
seedServices();
