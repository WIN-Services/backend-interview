import mongoose from "mongoose";
const { Schema, model } = mongoose

const services = new Schema({
    name: { type: String, required: true },
},
    { timestamps: true });

export default model("services", services);
