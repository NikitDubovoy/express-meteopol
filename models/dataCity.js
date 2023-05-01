const mongoose = require("mongoose");

const dataCitySchema = new mongoose.Schema({
  address: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  geo_lat: {
    type: Number,
    required: true,
  },
  geo_lon: {
    type: Number,
    required: true,
  },
  timezone: {
    type: String,
    required: true,
  },
});

dataCitySchema.methods.toJSON = function () {
  const dataCitySchema = this.toObject();
  delete dataCitySchema.priority;
  return dataCitySchema;
};

module.exports = mongoose.model("dataCity", dataCitySchema);
