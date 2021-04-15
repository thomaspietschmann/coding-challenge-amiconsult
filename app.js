const express = require("express");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const roomController = require("./controllers/roomController");
const seatController = require("./controllers/seatController");
const userController = require("./controllers/userController");
const bookingController = require("./controllers/bookingController");
const authController = require("./controllers/authController");
const AppError = require("./utils/appError");

// const AppError = require('./utils/appError');
const globalErrorHandler = require("./controllers/errorController");

const app = express();

// body parser, reading data from body into req.body
app.use(
  express.json({
    limit: "10kb",
  })
);

// data sanitization against NoSQL query injection
app.use(mongoSanitize());

// data sanitization against XSS
app.use(xss());

app.get("/rest/rooms/", roomController.getAllRooms);
app.get("/rest/rooms/:id", roomController.getRoom);
app.get("/rest/seats/", seatController.getAllSeats);
app.get("/rest/seats/:id", seatController.getSeat);

app
  .route("/rest/bookings/")
  .get(bookingController.getAllBookings)
  .post(authController.authenticate, bookingController.createBooking);

app
  .route("/rest/bookings/:id")
  .get(bookingController.getBooking)
  .delete(authController.authenticate, bookingController.deleteBooking);

app.post("/rest/users", userController.createUser);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find route ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

// 4) START SERVER
module.exports = app;
