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
  const { dateFilter, amount, typePayment } = req.query;

  try {
    const payments = await createPaymentModel.findAll();

    let paymentFiltered = payments;

    if (dateFilter && (dateFilter === "moreNow" || dateFilter === "lessNow")) {
      if (dateFilter === "moreNow") {
        paymentFiltered = payments.slice().reverse();
      } else {
        paymentFiltered = payments.slice();
      }
    }

    if (amount === "less") {
      paymentFiltered.sort(
        (a, b) => parseFloat(a.amount) - parseFloat(b.amount)
      );
    } else if (amount === "more") {
      paymentFiltered.sort(
        (a, b) => parseFloat(b.amount) - parseFloat(a.amount)
      );
    } else {
      paymentFiltered = paymentFiltered;
    }

    if (typePayment) {
      paymentFiltered = paymentFiltered.filter(
        (payment) => payment.typePayment === typePayment
      );
    } else {
      paymentFiltered = paymentFiltered;
    }

    // Devolver resultados filtrados
    res.status(200).json(paymentFiltered);
  } catch (error) {
    console.error("Error al filtrar pagos:", error);
    res.status(500).json({ message: "Error al filtrar pagos" });
  }
});

const downloadPayment = asyncHandler(async (req, res) => {
  try {
  } catch {}
});

module.exports = { createPayment, listPayment, filterPayment, downloadPayment };
