import mongoose from 'mongoose';

export const Order = mongoose.model('Win-Order', {
    id: String,
    datetime: Date,
    totalfee: Number,
    services: [{ id: String }],
    __v: {
        type: Number,
        select: false
    }
});

export const ServiceRecord = mongoose.model('Win-Service', {
    id: String,
    name: String,
    __v: {
        type: Number,
        select: false
    },
    _id: {
        type: Number,
        select: false
    },
});