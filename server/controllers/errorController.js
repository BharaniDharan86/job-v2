export default function globalErrorHandler(res, err) {
  if (process.env.NODE_ENV === "development") {
    return developmentError(res, err);
  } else if (process.env.NODE_ENV === "production") {
    return productionError(res, err);
  }
}

function productionError(res, err) {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: "Failed",
      message: err.message,
    });
  } else {
    return res.status(err.statusCode).json({
      status: "Error",
      message: "Something went very very wrong",
    });
  }
}

function developmentError(res, err) {
  return res.status(err.statusCode).json({
    status: err.status,
    success: false,
    message: err.message,
    stack: err.stack,
  });
}
