const db = require("./models");
const Service = db.service_model;

// Data to be inserted
const servicesData = [
  { id: 123, name: "Inspection" },
  { id: 789, name: "Testing" },
  { id: 456, name: "Analysis" },
];

async function insertData() {
  try {
    for (const serviceData of servicesData) {
      const [service, created] = await Service.findOrCreate({
        where: { id: serviceData.id },
        defaults: serviceData,
      });

      if (created) {
        console.log("Service created:", service.toJSON());
      } else {
        console.log("Service already exists:", service.toJSON());
      }
    }
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    db.sequelize.close();
  }
}

insertData();