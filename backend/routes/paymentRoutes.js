const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { joiValidation } = require("../middlewares/joiMiddleware");
const { boomHandler } = require("../middlewares/errorMiddleware");
const {
  createPaymentSchema,
} = require("../middlewares/validation/createPaymentValidation");
const { createPayment } = require("../controllers/paymentControllers");

router.route("/create").post(
  //protect,
  joiValidation(createPaymentSchema),
  createPayment,
  boomHandler
);
router.route("/list").get(protect, boomHandler);
//Example GET /api/payment/filter?date=2021-08-01
router.route("/filter").get(protect, boomHandler);
router.route("/download").get(protect, boomHandler);
module.exports = router;
