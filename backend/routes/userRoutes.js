const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { joiValidation } = require("../middlewares/joiMiddleware");
const { boomHandler } = require("../middlewares/errorMiddleware");

//router.route("/login").get();
//router.route("/register").post();
