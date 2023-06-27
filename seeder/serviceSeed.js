import ServiceModel from "../models/ServiceModel.js";
import mongoose from 'mongoose';
import 'dotenv/config';

const services = [
    new ServiceModel({
        "name": "Inspection"
    }),
    new ServiceModel({
        "name": "Analysis"
    }),
    new ServiceModel({
        "name": "Testing"
    })
]
//connect mongoose
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, dbName: process.env.DB_NAME })
    .catch(err => {
        console.log(err.stack);
        process.exit(1);
    })
    .then(() => {
        console.log("connected to DB");
    });

//after seeding,disconnect automatically
services.map(async (p, index) => {
    p.save((err, result) => {
        if (index === services.length - 1) {
            console.log("seeding DONE!");
            mongoose.disconnect();
            process.exit(1);
        }
    });
});
