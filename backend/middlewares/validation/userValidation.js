const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { messages } = require("../../config/joiMessages");

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages(messages).label("Email"),
  password: Joi.string().required().messages(messages).label("Password"),
});

module.exports = {
  loginSchema,
};
