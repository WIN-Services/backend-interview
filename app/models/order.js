const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Counter = require("./counter");

const OrderSchema = new mongoose.Schema(
  {
    id: {
      autoIncrement: true,
      type: Number,
      primaryKey: true,
    },
    datetime: {
      type: String,
      required: true,
    },
    totalfee: {
      type: String,
      required: true,
    },
    services: [
      {
        id: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
OrderSchema.plugin(mongoosePaginate);

OrderSchema.pre("save", function (next) {
  const doc = this;
  Counter.findByIdAndUpdate(
    { _id: "id", model: "Orders" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  )
    .then(function (counter) {
      doc.id = counter.seq;
      next();
    })
    .catch(function (error) {
      return next(error);
    });
});

module.exports = mongoose.model("Orders", OrderSchema);
