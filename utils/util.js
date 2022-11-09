const updateOrder = (event, prevOrder) => {
	return {
		id: event.id,
		datetime: event.datetime || prevOrder.datetime,
		totalfee: event.totalfee || prevOrder.totalfee,
		services: event.services || prevOrder.services,
	};
	try {
		const updatedOrder = {
			id: event.id,
			datetime: event.datetime || prevOrder.datetime,
			totalfee: event.totalfee || prevOrder.totalfee,
			services: event.services || prevOrder.services,
		};
		orders = orders.map((order) => {
			if (order.id === prevOrder.id) {
				return updatedOrder;
			}
		});
		console.log(orders);
		return;
	} catch (error) {
		throw new Error(error);
	}
	// mongo update function
};

const isValidUpdateEvent = (prevOrder) => {
	const now = new Date();
	now.setHours(now.getHours() + 3);
	const orderTime = new Date(prevOrder.datetime);
	if (now > orderTime) {
		return true;
	} else {
		return false;
	}
};

module.exports = {
	updateOrder,
	isValidUpdateEvent,
};
