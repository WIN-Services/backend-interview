const requestBodyValidator = {
    type: "object",
    required: [
        "totalfee",
        "services"
    ],
    properties: {
        totalfee: {
            type: "number"
        },
        services: {
            type: "string",
            minLength: 1,
        }
    },
};



module.exports = {
    requestBodyValidator
}