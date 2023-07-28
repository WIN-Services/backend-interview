const Order = require("../models/order");

const checkOrderConflict = async (req, res, next) => {
  try {
    //! Get the datetime of the current order from the request body
    const { datetime } = req.body;

    //! Calculate the datetime range (3 hours before and 3 hours after) for the current order
    const startTime = new Date(datetime);
    console.log('start********',startTime)
    startTime.setHours(startTime.getHours() - 3);

    const endTime = new Date(datetime);
    endTime.setHours(endTime.getHours() + 3);

    //! Check if there is any existing order within the calculated datetime range
    const existingOrder = await Order.findOne({
      datetime: { $gte: startTime, $lte: endTime },
    });

    if (existingOrder) {
      //! If a conflict is found, return an error response
      return res.status(409).json({
        error:
          "Order creation/updating conflicts with an existing order within 3 hours.",
      });
    }

    //! If no conflict, proceed to the next middleware or route handler
    next();
  } catch (err) {
    //! Handle any errors that occur during the process
    console.error("Error checking order conflict:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = checkOrderConflict;
