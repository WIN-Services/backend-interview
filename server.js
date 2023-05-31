const express = require("express");
const mongoose = require("mongoose");

const ServiceRecord = require("./models/ServiceRecord");
const Order = require("./models/Order");

const app = express();
app.use(express.json());

// MongoDB Atlas connection URL
// this url will expire in 48 hours
const MONGODB_URI =
  "mongodb+srv://sid:WykCNTa2sTpWEEpc@cluster0.25szcki.mongodb.net/?retryWrites=true&w=majority";

// Connect to MongoDB Atlas
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB Atlas:", error);
  });

// GET all service records
app.get("/services", async (req, res) => {
  try {
    const serviceRecords = await ServiceRecord.find();
    res.json(serviceRecords);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve service records." });
  }
});

// GET all orders
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().populate("services");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve orders." });
  }
});

// POST create a new order
app.post("/orders", async (req, res) => {
  const { totalfee, services } = req.body;

  // Validate datetime and check for existing orders within 3 hours
  const now = new Date();
  const threeHoursAgo = new Date(now.getTime() - 3 * 60 * 60 * 1000);

  try {
    const existingOrder = await Order.findOne({
      createdAt: { $gte: threeHoursAgo },
    });

    if (existingOrder) {
      return res.status(400).json({
        error: "Cannot create order within 3 hours of a pre-existing order.",
      });
    }

    const newOrder = new Order({
      totalfee,
      services,
    });

    const order = await newOrder.save();
    res.status(201).json(order);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "Failed to create an order" });
  }
});

// GET retrieve a specific order
app.get("/orders/:orderId", async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve order." });
  }
});

// PATCH update an existing order
app.patch("/orders/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  const updatedOrder = req.body;

  // Check if the order is within the allowed update window
  const now = new Date();
  const threeHoursAgo = new Date(now.getTime() - 3 * 60 * 60 * 1000);

  try {
    const existingOrder = await Order.findById(orderId);
    if (!existingOrder) {
      return res.status(404).json({ error: "Order not found." });
    }

    // Check if the existing order is within the update window
    if (existingOrder.createdAt >= threeHoursAgo) {
      return res.status(400).json({
        error: "Cannot update order within 3 hours of its creation.",
      });
    }

    const updatedFields = {
      ...existingOrder.toObject(),
      ...updatedOrder,
    };

    const order = await Order.findByIdAndUpdate(orderId, updatedFields, {
      new: true,
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to update order." });
  }
});

// DELETE remove an order
app.delete("/orders/:orderId", async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const order = await Order.findByIdAndRemove(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }
    res.json({ message: "Order removed successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove order." });
  }
});

// Start the server
const port = 8000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

module.exports = app;
