const express = require("express");
require("./config/database");
require("dotenv").config();
const authRouter = require("./routes/auth.route");

const app = express();

app.use(express.json());

app.use("/auth", authRouter);

app.listen(process.env.PORT, () =>
  console.log(`Server running on http://localhost:${process.env.PORT}`)
);
