import express from "express";
import userRouter from "./routes/userRoutes.js";
import dotenv from "dotenv";
dotenv.config();

import globalErrorHandler from "./controllers/errorController.js";
const app = express();

app.use(express.json());
console.log(process.env.NODE_ENV, "application");

app.use("/api/v1/user", userRouter);

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Something went wrong";

  globalErrorHandler(res, err);
});

export default app;
