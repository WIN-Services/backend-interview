const Order = require('../models/order.model');
const Service = require('../models/service.model');

/*
* @desc - function to validate services coming in request
* @returns - boolean value
*/
validateServices = async (serviceIds) => {
    try {
        let query = { _id: { $in: serviceIds } };
        let services = await Service.find(query);
        if (services.length != serviceIds.length) {
            return false;
        }
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

/*
* @desc - function to get orders of past three hours for services
* @returns - order objects
*/
getExistingOrdersOfPastThreeHours = async (serviceIds) => {
    try {
        const threeHoursInMilliseconds = 3 * 60 * 60 * 1000;
        return await Order.find({
            $and: [
                {
                    createdAt: { $gt: new Date(Date.now() - threeHoursInMilliseconds) },
                },
                {
                    services: { $in: serviceIds },
                },
            ],
        });
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {validateServices, getExistingOrdersOfPastThreeHours};