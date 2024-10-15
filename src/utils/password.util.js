const bcrypt = require("bcrypt");

async function hashPassword(password) {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, saltRound);
}

async function compare(password, hashPassword) {
  return await bcrypt.compare(password, hashPassword);
}

module.exports = { hashPassword, compare };
