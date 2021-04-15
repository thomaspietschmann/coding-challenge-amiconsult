const Room = require("../models/roomModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllRooms = catchAsync(async (req, res, next) => {
  const rooms = await Room.find();

  res.status(200).json({
    status: "success",
    data: {
      rooms,
    },
  });
});

exports.getRoom = catchAsync(async (req, res, next) => {
  const room = await Room.findById(req.params.id);
  console.log(room);

  if (!room) {
    return next(new AppError("No room found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      room,
    },
  });
});
