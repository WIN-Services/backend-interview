require("dotenv").config();
const express = require("express");
const app = express();

//models
const ServiceModel = require('../models/service.model')

app.use(express.json());

const { successHandler, errorHandler } = require("../helper/status");
const serviceModel = require("../models/service.model");



exports.getAllService = async () => {
    const AllserviceData = await serviceModel.find({});
    if(!AllserviceData){
        return { status: 400, message: errorHandler.errorfetchingService };
    }
    return { status: 200, message: successHandler.datafetched , resp : AllserviceData  };
};

exports.addService = async (body) => {
    const { name } = body;

    if(!name ){
        return { status: 400, message: errorHandler.missing };
    }

    const serviceCreation = await ServiceModel.create({ name });

    if (serviceCreation) {
        return { status: 201, message: successHandler.serviceCreated };
    }
    else {
        return { status: 400, message: errorHandler.errorserviceCreation };
    }
};