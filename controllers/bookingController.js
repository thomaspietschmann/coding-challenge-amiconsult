const Booking = require("../models/bookingModel");
const helpers = require("./../utils/helpers");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createBooking = catchAsync(async (req, res, next) => {
  const today = new Date();
  const bookingDate = new Date(new Date(req.body.date).setHours(8, 0, 0, 0));
  const maxDate = helpers.addDays(today, 7);

  const existingBooking = await Booking.findOne({
    date: bookingDate,
    seat: req.body.seat,
  });
  if (existingBooking)
    throw new AppError("Booking for this date and seat exists", 400);

  if (bookingDate < today)
    return next(new AppError("Booking needs to be in the future", 400));
  if (bookingDate > maxDate)
    return next(
      new AppError("Booking can only be up to 7 days in advance", 400)
    );

  const booking = await Booking.create({
    seat: req.body.seat,
    date: bookingDate,
    user: req.user._id,
  });

  res.status(200).json({
    status: "success",
    message: `Booking created for ${helpers.convertDate(booking.date)}`,
    data: {
      booking,
    },
  });
});

exports.deleteBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(new AppError("Booking not found", 404));
  }

  if (booking.user.name !== req.user.name)
    return next(
      new AppError("You don't have permission to delete this booking", 401)
    );

  booking.delete();

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getAllBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({
    date: {
      $gte: helpers.addDays(new Date(), -14),
    },
  }).sort("-date");

  res.status(200).json({
    status: "success",
    data: {
      bookings,
    },
  });
});

exports.getBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(new AppError("No booking found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      booking,
    },
  });
});
