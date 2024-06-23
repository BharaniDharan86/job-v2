import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import mongoose from "mongoose";

const PORT = process.env.PORT;
const MONGO_DB_URI = process.env.MONGODB_URI;

console.log(process.env.NODE_ENV, "server");

mongoose
  .connect(MONGO_DB_URI)
  .then((con) => {
    console.log("Database connected successfully !!!");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
