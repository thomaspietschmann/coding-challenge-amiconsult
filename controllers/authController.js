const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const AppError = require("../utils/appError");

exports.authenticate = catchAsync(async (req, res, next) => {
  // Check for bearer token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    return next(
      new AppError("Please provide your token to access this information.", 401)
    );
  }

  // find user for token

  const currentUser = await User.findOne({ token: token });
  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token does not exist", 401)
    );
  }

  // grant access to protected route
  req.user = currentUser;
  next();
});
