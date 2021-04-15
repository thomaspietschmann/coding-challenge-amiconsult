const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  seat: {
    type: mongoose.Schema.ObjectId,
    ref: "Seat",
    required: [true, "A booking needs a specific seat."],
  },
  date: {
    type: Date,
    required: [true, "A booking needs a specific date."],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A bookings needs a userId"],
  },
});

bookingSchema.pre(/^find/, function (next) {
  this.select("-__v");
  next();
});

bookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user seat",
    select: "-__v -_id",
  });
  next();
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
