const mongoose = require("mongoose");
require("dotenv").config();
const Service = require("../core/schemas/serviceSchema");

const seedService = [
  {
    service_id: "123",
    name: "Inspection",
  },
  {
    service_id: "789",
    name: "Testing",
  },
  {
    service_id: "456",
    name: "Analysis",
  },
];

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedDB = async () => {
  await Service.deleteMany({});
  await Service.insertMany(seedService);
};

seedDB().then(() => {
  mongoose.connection.close();
  console.log("Seed Successful!!!!");
});
