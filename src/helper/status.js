
const successHandler = {
    orderCreated: "Order Added sucessfully!",
    serviceCreated: "service created sucessfully!",
    datafetched: "Data fetched sucessfully!"
}

const errorHandler = {
    errorOrderCreation: "Failed to add the Order!",
    errorserviceCreation: "Failed to create service!",
    errorfetchingService:"Error fetching service data!",
    missing: "Missing required parameters!"
};

module.exports = { successHandler, errorHandler };
