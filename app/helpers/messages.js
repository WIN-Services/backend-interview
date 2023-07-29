const successMessage = {
  SERVICE_UPDATED: 'Service updated successfully.',
  SERVICE_DELETED: 'Service deleted successfully.',
  ORDER_UPDATED: 'Order updated successfully.',
  ORDER_DELETED: 'Order deleted successfully.'
}

const errorMessage = {
  COMMON_ERROR: 'Something went wrong',
  NAME_REQUIRED: 'name is required',
  FEE_REQUIRED: 'totalFee is required',
  SERVICE_REQUIRED: 'serviceIds are required',
  SERVICE_NOT_FOUND: 'Service not found',
  ORDER_NOT_FOUND: 'Order not found',
  ORDER_CAN_NOT_UPDATE: 'Recently created order can not be updated. Try again later.'
}

module.exports = {
  successMessage,
  errorMessage
}
