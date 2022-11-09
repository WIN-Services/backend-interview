const mongoose = require('mongoose');

mongoose.model('order', {
	id: String,
	datetime: String,
	totalfee: Number,
	services: [
		{
			id: String,
		},
	],
});
