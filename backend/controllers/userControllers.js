const asyncHandler = require("express-async-handler");
const Boom = require("@hapi/boom");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const sequelize = require("../utils/database");

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
      status: true,
      message: "User authenticated successfully",
      user: userDoc.email,
      token: generateToken(userDoc.id),
    });
  } catch (err) {
    next(err);
  }
});

const registerUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      throw Boom.badRequest("Email and password are required");

    const emailSplit = email.toLowerCase();

    const userDoc = await User.findOne({ where: { email: emailSplit } });
    if (userDoc) throw Boom.badRequest("User already exists");

    await User.create({ email: emailSplit, password, rol: "user" });
    return res.status(201).json({
      status: true,
      message: "User created successfully",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = { authUser, registerUser };
