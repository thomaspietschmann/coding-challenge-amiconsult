const AppError = require("./../utils/appError");

const sendError = (err, res) => {
  res.status(err.statusCode).json({
    error: err.message,
  });
};

const sendError500 = (err, res) => {
  res.status(err.statusCode).json({
    error: "Internal server error",
  });
};

const sendCastErrorDB = (err, res) => {
  res.status(400).json({
    errors: [
      {
        msg: "Invalid value",
        param: err.path,
        location: "body",
      },
    ],
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  console.log(err);

  if (err.name === "CastError") return sendCastErrorDB(err, res);
  if (err.statusCode === 500) return sendError500(err, res);

  sendError(err, res);
};
