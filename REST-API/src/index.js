import express from "express";
import routes from "./routes.js";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import { authMiddleware } from "./middlewares/authMiddleware.js";
import { corsMiddleware } from "./middlewares/cors.js";

try {
  await mongoose.connect("mongodb://localhost:27017", {
    dbName: "the-window-of-knowledge",
  });
  console.log("Connected to the database!");
} catch (err) {
  console.log("Cannot connect to the database!");
}

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);
//app.use(authMiddleware);
// app.use(corsMiddleware);
app.use(routes);

app.listen(3000, () =>
  console.log("Server is listening on http://localhost:3000")
);
