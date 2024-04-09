const asyncHandler = require("express-async-handler");
const createPaymentModel = require("../models/createPaymentModel");
const Boom = require("@hapi/boom");
const moment = require("moment/moment");

const createPayment = asyncHandler(async (req, res, next) => {
  const { amount, typePayment, destination } = req.body;
  try {
    if (amount <= 0) throw Boom.badRequest("Amount must be greater than 0");
    if (destination === "") throw Boom.badRequest("Destination is empty");

    const payment = await createPaymentModel.create({
      status: true,
      amount,
      date: moment().format("YYYY-MM-DD HH:mm:ss"),
      typePayment,
      destination,
    });
    res.status(201).json({
      status: true,
      payment: payment,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

const listPayment = asyncHandler(async (req, res) => {
  try {
    const payment = await createPaymentModel.findAll();
    if (!payment) throw Boom.notFound("Payment not found");
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

module.exports = { createPayment, listPayment, filterPayment };
