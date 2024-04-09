require("dotenv").config();
const express = require("express");
const app = express();
const sequelize = require("./utils/database");
const cors = require("cors");

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://gestion-de-pagos-almendra-lwkxmstq3-fxivans-projects.vercel.app",
    "https://gestion-de-pagos-almendra.vercel.app",
    "https://gestion-de-pagos-almendra.vercel.app",
  ],
  optionsSuccessStatus: 204,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.json({ limit: "100mb" }));
app.use(cors(corsOptions));

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
    console.log("Server running on port " + process.env.PORT || 3001);
  } catch (error) {
    console.log(error);
  }
})();
