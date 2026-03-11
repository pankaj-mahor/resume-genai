const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5174",
      "http://localhost:3000",
      "http://localhost:5173",
    ],
    credentials: true,
  }),
);
//Routes require
const authRouter = require("./routes/auth.routes");

app.use("/api/auth", authRouter);

module.exports = app;
