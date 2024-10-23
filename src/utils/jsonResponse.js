function jsonResponse(success, message, data = "No data") {
  return {
    success,
    message,
    data,
  };
}

module.exports = jsonResponse;
