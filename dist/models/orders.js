Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const serviceSchema = new mongoose_1.Schema({
    id: { type: String, required: true }
}, { _id: false });
const orderSchema = new mongoose_1.Schema({
    datetime: { type: Date, required: true },
    totalfee: { type: Number, required: true },
    services: [serviceSchema]
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});
exports.Order = (0, mongoose_1.model)('Order', orderSchema);
