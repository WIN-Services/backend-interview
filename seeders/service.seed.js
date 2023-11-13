
const mongoose = require("mongoose");
require("dotenv").config();
const Service = require("../src/models/service.model");

const services = [
        {
          name: "Inspection",
          fee: 350
        },
        {
          name: "Analysis",
          fee: 100
        },
        {
          name: "Testing",
          fee: 100
        },
      ];

mongoose.connect(process.env.MONGODB_URI);

const seedDB = async () => {
  await Service.deleteMany({});
  await Service.insertMany(services);
};

seedDB().then(() => {
  mongoose.connection.close();
  console.log("Services seeded successfully!!");
});
