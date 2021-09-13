module.exports = (error, req, res, next) => {
  console.error(error);
  if (error.name === "ValidationError" || error.name === "CastError") {
    return res.status(400).json({
      error: "id invalid",
    });
  } else {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
