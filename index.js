const express = require("express");
const cookieParser = require("cookie-parser");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");

const userRouter = require("./routes/api/user");
const cartRouter = require("./routes/api/cart");

const app = express();
const port = process.env.PORT || 5000;

//mongodb://localhost:27017
mongoose.connect(
  "mongodb+srv://haless132:motor-server@cluster0.t0tgj3u.mongodb.net/?retryWrites=true&w=majority",
  () => console.log("connected mongoose")
);

app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATH, DELETE");
    return res.status(200).json({});
  }

  next();
});

app.use("/users", userRouter);
app.use("/carts", cartRouter);

app.use((req, res, next) => {
  const error = new Error("Internal Server Error");
  error.status = 500;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status).json({
    error: {
      message: error.message,
    },
  });
});

app.listen(port, () => `Server start at ${port}`);
