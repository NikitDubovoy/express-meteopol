const mongoose = require("mongoose");

const imageBackgroundSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  priorityСolor: {
    type: String,
    require: true,
    default: "#000",
  },
  priorityСolor2: {
    type: String,
    require: true,
    default: "#000",
  },
});

imageBackgroundSchema.methods.toJSON = function () {
  const imageBackground = this.toObject();
  return imageBackground;
};

module.exports = mongoose.model("imageBackground", imageBackgroundSchema);
