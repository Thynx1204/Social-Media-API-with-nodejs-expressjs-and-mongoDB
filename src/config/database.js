const mongoose = require("mongoose");
require("dotenv").config();

async function connectionDatabase() {
  await mongoose.connect(process.env.DATABASE_URL);
}

connectionDatabase()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));
