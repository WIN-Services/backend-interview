import ServiceModel from "../../models/ServiceModel.js";
import lodash from "lodash";
const { isArray } = lodash;
import mongoose from "mongoose";

export async function getServices(serviceIds) {

    let serviceObjectIds = getObjectIdFromString(serviceIds);

    if (!isArray(serviceObjectIds)) {
        serviceObjectIds = [serviceObjectIds];
    }

    return ServiceModel.find({ _id: { $in: serviceObjectIds } });
}

function getObjectIdFromString(serviceId) {
    const serviceIds = [];

    if (isArray(serviceId)) {
        serviceId.forEach(e => {
            serviceIds.push(mongoose.Types.ObjectId(e.id));
        });
    } else {
        serviceId = mongoose.Types.ObjectId(serviceId);
    }

    return serviceIds.length ? serviceIds : serviceId
}
