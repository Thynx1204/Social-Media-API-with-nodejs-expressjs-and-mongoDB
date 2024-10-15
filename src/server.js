const express = require("express");
require("./config/database");
require("dotenv").config();

const app = express();

app.listen(process.env.PORT, () =>
  console.log(`Server running on http://localhost:${process.env.PORT}`)
);
