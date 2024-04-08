const express = require("express");
const router = express.Router();
const { boomHandler } = require("../middlewares/errorMiddleware");
const { authUser } = require("../controllers/userControllers");

const { loginSchema } = require("../middlewares/validation/userValidation");
const { joiValidation } = require("../middlewares/joiMiddleware");

router.route("/login").post(joiValidation(loginSchema), authUser, boomHandler);

module.exports = router;
