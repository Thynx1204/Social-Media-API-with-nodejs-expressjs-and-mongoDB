const express = require("express");
require("./config/database");
require("dotenv").config();
const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");
const { verifyToken } = require("./middlewares/auth.middleware");

const app = express();

app.use(express.json());

app.use("*", verifyToken);

app.use("/auth", authRouter);

app.use("/users", userRouter);

app.listen(process.env.PORT, () =>
  console.log(`Server running on http://localhost:${process.env.PORT}`)
);
