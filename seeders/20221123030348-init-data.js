'use strict';

const { sequelize, Service, Order } = require("../db/models");

const services = [
  {
    "id": 123,
    "name": "Inspection"
  },
  {
    "id": 789,
    "name": "Testing"
  },
  {
    "id": 456,
    "name": "Analysis"
  }
];

const orders = [
  {
    "id": "223",
    "datetime": "2022-11-01T11:11:11.111Z",
    "totalfee": 100,
    "services": [
        {
        "id": "123",
        }
    ]
  },
  {
    "id": "224",
    "datetime": "2022-11-01T11:11:11.111Z",
    "totalfee": 100,
    "services": [
        {
        "id": "789",
        }
    ]
  },
  {
    "id": "225",
    "datetime": "2022-11-01T11:11:11.111Z",
    "totalfee": 100,
    "services": [
        {
        "id": "456",
        }
    ]
  }
]
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    //console.log("Query interface", Object.keys(queryInterface.sequelize.dialect));
    //console.log("Sequelize", Object.keys(Sequelize.sqlite));
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await sequelize.sync();
    for(let serviceInfo of services) await Service.create(serviceInfo); 
    let order, orderServices = [];
    for(let orderInfo of orders) {
      order = await Order.create({
        id: orderInfo.id,
        datetime: orderInfo.datetime,
        totalfee: orderInfo.totalfee
      });
      orderServices = [];
      for(let serviceInfo of orderInfo.services) orderServices.push(await Service.findByPk(serviceInfo.id));
      await order.addServices(orderServices);
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await Order.destroy({
      truncate: true
    });
    await Service.destroy({
      truncate: true
    });
  }
};
