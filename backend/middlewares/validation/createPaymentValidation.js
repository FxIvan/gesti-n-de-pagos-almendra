const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { messages } = require("../../config/joiMessages");

const createPaymentSchema = Joi.object({
  amount: Joi.number().required().messages(messages).label("Amount"),
  typePayment: Joi.string().required().messages(messages).label("Type Payment"),
  destination: Joi.string().required().messages(messages).label("Destination"),
});

module.exports = {
  createPaymentSchema,
};
