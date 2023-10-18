const orderSchema = {
  type: "object",
  properties: {
    totalFee: { type: "integer" },
  },
  required:['totalFee'],
  additionalProperties: false,
};
const serviceSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
  required:['name'],
  additionalProperties: false,
};

module.exports = {orderSchema,serviceSchema};

