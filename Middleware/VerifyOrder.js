const Order = require('../models/Order')

validateOrderTiming = {
  validateTime: async (req, res, next) => {
    const newOrderDatetime = new Date(req.body.datetime);
    const orderId = req.params.orderId || ''; // For updates, check if within 3 hours of other orders
    try {
      const result = await Order.find({ _id: { $ne: orderId } }) // Exclude the current order if it's an update

      for (const order of result) {
        const existingOrderDatetime = new Date(order.datetime);
        const timeDifference = Math.abs(newOrderDatetime - existingOrderDatetime);
        const hoursDifference = timeDifference / 3600000; // Convert milliseconds to hours

        if (hoursDifference < 3) {
          return res.status(400).json({success: true, data:'Orders cannot be created or updated within 3 hours of a pre-existing order.' });
        }
      }
      next();

    } catch (error) {
      console.error(error);
      res.status(500).json({success: false, data:'An error occurred while checking order timing.' });
    }

  }
}

module.exports = validateOrderTiming;
