const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.ObjectId,
    ref: "Room",
    required: [true, "Seat must belong to a room"],
  },
});

seatSchema.pre(/^find/, function (next) {
  this.select("-__v");
  next();
});

seatSchema.pre(/^find/, function (next) {
  this.populate({
    path: "room",
    select: "-__v",
  });

  next();
});

const Seat = mongoose.model("Seat", seatSchema);
module.exports = Seat;
