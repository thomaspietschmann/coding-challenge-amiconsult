const Seat = require("../models/seatModel");
// const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllSeats = catchAsync(async (req, res, next) => {
  const seats = await Seat.find();

  res.status(200).json({
    status: "success",
    data: {
      seats,
    },
  });
});

exports.getSeat = catchAsync(async (req, res, next) => {
  const seat = await Seat.findById(req.params.id);

  if (!seat) {
    return next(new AppError("No seat found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      seat,
    },
  });
});
