const express = require("express");
const app = express();

const sequelize = require("./util/database");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access.Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methlods",
    "GET",
    "POST",
    "PUT",
    "DELETE"
  );
  next();
});

app.options("*", function (req, res) {
  res.send({});
});

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));

(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Database connected!");
    app.listen(process.env.PORT || 3001);
  } catch (error) {
    console.log(error);
  }
})();
