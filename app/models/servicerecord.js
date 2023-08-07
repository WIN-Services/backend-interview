const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Counter = require("./counter");

const ServiceRecordSchema = new mongoose.Schema(
  {
    id: {
      autoIncrement: true,
      type: Number,
      primaryKey: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
ServiceRecordSchema.plugin(mongoosePaginate);

ServiceRecordSchema.pre("save", function (next) {
  const doc = this;
  Counter.findByIdAndUpdate(
    { _id: "sid", model: "ServiceRecords" },
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

module.exports = mongoose.model("ServiceRecords", ServiceRecordSchema);
