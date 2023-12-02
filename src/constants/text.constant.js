const http_codes = {
    badRequest: 400,
    internalError: 500,
    created: 201,
    notFound: 404,
    ok: 200,
    notImplemented: 501,
    forbidden: 403,
    unAuthorized: 401,
    Conflict: 409
}
const schemas = {
    services: "services",
    orders: "orders"
}
const messages = {
    serviceNameIsRequired: "service name is required",
    orderIdRequired: "orderId is required",
    inValidBody: "invalid body",
    badRequest: "bad request",
    success: "success",
    serviceCreatedSuccessfully: "service created successfully",
    orderCreatedSuccessfully: "order created successfully",
    serviceUpdatedSuccessfully: "service updated successfully",
    orderUpdatedSuccessfully: "order updated successfully",
    orderDeletedSuccessfully: "order deleted successfully",
    serviceNotFound: "service not found",
    serviceIsAlreadyPresent: "service with this name is already available",
    internalServerError: "Internal server error",
    ordersNotFound: "orders not foundF",
    canNotCreateOrder: "order can not create or updated within 3 hrs of a pre-existing order"
}

module.exports = {
    schemas,
    messages,
    http_codes
}