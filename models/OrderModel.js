import mongoose from "mongoose";
const { Schema, model } = mongoose

const Orders = new Schema({
	totalFee: { type: Number, required: true },
	services: { type: Array, required: true },
	isDeleted: { type: Boolean, default: false }
},
	{ timestamps: true });

export default model("Orders", Orders);
