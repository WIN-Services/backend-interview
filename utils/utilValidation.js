let Validator = require('jsonschema').Validator;
let v = new Validator();
let schema = {
	id: '/orderRequest',
	type: 'object',
	required: ['id', 'totalfee', 'services'],
	properties: {
		id: { type: 'string' },
		totalfee: { type: 'number' },
		services: {
			type: 'array',
			items: {
				properties: {
					id: { type: 'string' },
				},
				required: ['id'],
			},
		},
	},
};

const orderEventValidator = (data) => {
	const validationResult = v.validate(data, schema);
	if (validationResult.errors.length === 0) {
		return data;
	} else {
		throw new Error('Invalid event');
	}
};

module.exports = {
	orderEventValidator,
};
