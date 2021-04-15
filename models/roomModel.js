const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A room must have a name"],
    unique: true,
    trim: true,
    maxlength: [40, "A room name must have less or equal then 40 characters"],
    minlength: [3, "A room name must have more or equal then 3 characters"],
  },
});

roomSchema.pre(/^find/, function (next) {
  this.select("-__v");
  next();
});

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
