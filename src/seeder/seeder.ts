import mongoose from 'mongoose';
import dotenv from 'dotenv';

import Service from './../schemas/serviceSchema';
import Order from './../schemas/orderSchema';
import { orderData, serviceData } from './seederData';

dotenv.config();

// seed data after clearing all data
const seedData = async () => {
  try {
    // delete all data first
    await Order.deleteMany({});
    await Service.deleteMany({});

    // seeding service data
    const serviceRes = await Service.insertMany(serviceData);

    // seeding the order data based on the service data id
    // it is only done to maintain consistency with the given example data in the interview question
    const updatedOrderData = orderData.map((order, index) => {
      // assign the service id to the order since both array length is the same as 3
      order.services = [serviceRes[index]._id];
      return order;
    });

    // seeding order data
    await Order.insertMany(updatedOrderData);

    console.log('Service Data Imported');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// delete all data
const destroyData = async () => {
  try {
    await Order.deleteMany({});
    await Service.deleteMany({});

    console.log('Service Data Destroyed');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/win-backend-interview',
  {} as mongoose.ConnectOptions
);

if (process.argv[2] === '-d') {
  destroyData();
} else {
  seedData();
}
