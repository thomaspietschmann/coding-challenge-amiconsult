const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Room = require("./models/roomModel");
const Booking = require("./models/bookingModel");
const Seat = require("./models/seatModel");
const User = require("./models/userModel");

dotenv.config({ path: "./config.env" });

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));

rooms = ["Billardzimmer", "Arbeitszimmer", "Bibliothek"];

// IMPORT DATA INTO DB

const createSeats = async (roomId) => {
  try {
    seatPromises = Array.from({ length: 10 }).map((seat, index) =>
      Seat.create({
        room: roomId,
      })
    );
    await Promise.all(seatPromises);
  } catch (err) {
    console.log(err);
  }
};

const createUser = async () => {
  user = await User.create({
    name: "Malte",
    token: "wakndi492jn290n8398",
  });
  return user;
};

const importData = async () => {
  try {
    roomsPromises = rooms.map((room) => Room.create({ name: room }));
    await Promise.all(roomsPromises);
    console.log("Rooms created");

    const foundRooms = await Room.find();
    foundRooms.forEach((room) => createSeats(room._id));
    console.log("10 seats per room created");

    const user = await createUser();
    console.log(user);
    console.log("User created");

    console.log("Data successfully loaded.");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM COLLECTION

const deleteData = async () => {
  try {
    await Booking.deleteMany();
    await Seat.deleteMany();
    await Room.deleteMany();
    await User.deleteMany();
    console.log("All data deleted");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
