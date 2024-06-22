class AppError extends Error {
  constructor(message, statusCode, status) {
    super(message);
    this.statusCode = statusCode;
    this.status = String(statusCode).startsWith("4")
      ? "Not Found"
      : "Internal Server Error";
  }
}

export default AppError;
