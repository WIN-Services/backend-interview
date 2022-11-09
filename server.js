console.log('Start');
/**
 * Requires
 */
const { orderEventValidator } = require('./utils/utilValidation');
const { isValidUpdateEvent, updateOrder } = require('./utils/util');
const { PORT } = require('./utils/constant');

/**
 * Setup
 */
const express = require('express');
const app = express();
app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

/** Connect to database */
const mongoose = require('mongoose');
require('./schema/orderSchemaModel');
const order = mongoose.model('order');

const url = `mongodb+srv://<username>:<password>@cluster0.nvlfp.mongodb.net/winTestDB?retryWrites=true&w=majority`;
mongoose
	.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('Connected to database ');
	})
	.catch((err) => {
		console.error(`Error connecting to the database. \n${err}`);
	});

app.get('/get-all-orders', async (req, res) => {
	try {
		const result = await order.find();
		res.status(200).send(result);
	} catch (error) {
		res.status(404).send({
			message: 'Failed to get orders',
			error,
		});
	}
});

app.get('/get-order/:orderId', async function (req, res) {
	const orderId = req.params.orderId;
	try {
		const result = await order.findOne({ id: orderId });
		res.status(200).send(result);
	} catch (error) {
		res.status(400).send({
			message: `Order for orderId ${req.params.id} not found.`,
			error,
		});
	}
});

app.post('/add-new-order', async (req, res) => {
	try {
		const validatedOrder = orderEventValidator(req.body);
		const newOrder = new order(validatedOrder);
		await newOrder.save();
		res.status(200).send('Order successfully placed');
	} catch (error) {
		res.status(400).send('Failed to insert order');
	}
});

app.delete('/cancel-order/:id', async (req, res) => {
	const orderId = req.params.id;
	if (orderId) {
		try {
			await order.deleteOne({ id: orderId });
			res.status(200).send('Order successfully cancelled');
		} catch (error) {
			res.status(400).send({
				message: 'Failed to cancel the order',
				error,
			});
		}
	} else {
		res.status(400).send('Request should have an order id');
	}
});

app.put('/update-order', async (req, res) => {
	const orderId = req.body.id;
	const event = req.body;
	if (!orderId) {
		res.status(400).send('Order should have an order Id');
	}
	try {
		const result = await order.find({ id: orderId });
		const prevOrder = result[0];
		if (!isValidUpdateEvent(prevOrder)) {
			throw new Error();
		}
		const updatedOrder = updateOrder(event, prevOrder);
		await order.updateOne(
			{ id: updatedOrder.id },
			{
				$set: {
					totalfee: updatedOrder.totalfee,
				},
			}
		);
		res.status(200).send('Order successfully updated');
	} catch (error) {
		res.status(400).send({
			message: 'Failed to update order',
			error,
		});
	}
});

app.listen(PORT, () => console.log(`started server on port ${PORT}`));
module.exports = app;
