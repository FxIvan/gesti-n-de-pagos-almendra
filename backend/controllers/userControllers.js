const asyncHandler = require("express-async-handler");
const Boom = require("@hapi/boom");
const User = require("../models/userModel");
const generateToken = require("../util/generateToken");
const sequelize = require("../util/database");

const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      throw Boom.badRequest("Email and password are required");

    const emailSplit = email.toLowerCase();

    const userDoc = await User.findOne({ where: { email: emailSplit } });
    if (!userDoc) throw Boom.badRequest("User not found");
    console.log(userDoc);
    const isValidPassword = userDoc.password === password;

    if (!isValidPassword)
      throw Boom.badRequest("Email or password is incorrect");

    return res.status(200).json({
      message: "User authenticated successfully",
      user: userDoc.email,
      token: generateToken(userDoc.id),
    });
  } catch (err) {
    next(err);
  }
});

module.exports = { authUser };
