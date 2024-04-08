const asyncHandler = require("express-async-handler");
const createPaymentModel = require("../models/createPaymentModel");
const Boom = require("@hapi/boom");
const moment = require("moment/moment");

const createPayment = asyncHandler(async (req, res, next) => {
  const { amount, typePayment, destination } = req.body;
  try {
    if (amount <= 0)
      throw next(Boom.badRequest("Amount must be greater than 0"));

    const payment = await createPaymentModel.create({
      amount,
      date: moment().format("YYYY-MM-DD HH:mm:ss"),
      typePayment,
      destination,
    });
    res.status(201).json({ payment, messages: "Payment created" });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

const listPayment = asyncHandler(async (req, res) => {
  try {
    const payment = await createPaymentModel.findAll();
    res.status(200).json(payment);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

const filterPayment = asyncHandler(async (req, res) => {
  try {
  } catch {}
});

const downloadPayment = asyncHandler(async (req, res) => {
  try {
  } catch {}
});

module.exports = { createPayment, listPayment, filterPayment, downloadPayment };
