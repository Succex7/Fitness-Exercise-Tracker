function errorHandler(err, req, res, next) {
  console.error('Error:', err.message);
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
}

exports.errorHandler = errorHandler;