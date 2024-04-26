import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth_route.js";

dotenv.config();
const app = express();

app.use(express.json());

// It is used to parse the cookie header and extract cookie data from it.
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error(`Error connecting to MongoDB: ${err}`);
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000!!");
});

// Hit the /api/user/<route name defiined in user.route.js> to hit the particular route(imported above)(test)
app.use("/api/user", userRouter);

// Hit the /api/auth/<route name defiined in auth_route.js> to hit the particular route(imported above)(signup)
app.use("/api/auth", authRouter);

// Error handling middleware:
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
