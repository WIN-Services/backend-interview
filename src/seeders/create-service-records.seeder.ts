import { QueryInterface } from "sequelize";
import { dbService } from "../services/db.service";
import { ServiceRecord } from "../models/service-record.model";

dbService; // Initialising Sequelize...


const services: any[] = [
  {
    id: 1,
    name: "Inspection"
  },
  {
    id: 2,
    name: "Testing"
  },
  {
    id: 3,
    name: "Analysis"
  }
];

export = {
  /* Write code here to seed data.*/
  up: async (queryInterface: QueryInterface) => {
    return ServiceRecord.bulkCreate(services);
  },

  /* Write code here for drop seed data.*/
  down: async (queryInterface: QueryInterface) => {
    return ServiceRecord.truncate();
  }
};
