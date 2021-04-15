const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "A user needs a name."],
  },
  token: {
    type: String,
    required: [true, "A user needs a token."],
    select: false,
  },
  profilePicture: {
    type: String,
    default: "storage/user_pictures/xyz.jpeg",
  },
});

userSchema.methods.checkPassword = async function (inputToken, userToken) {
  return await bcrypt.compare(inputToken, userToken);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
