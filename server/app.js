import express from "express";
const app = express();

app.use(express.json());

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Something went wrong";

  return res.status(err.statusCode).json({
    success: false,
    status: err.status,
    message: err.message,
  });
});

export default app;
