export {};

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

import { Application, Request, Response } from "express";

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import multer from "multer";
import path from "path";

import authRoutes from "./routes/auth-routes";
import contactsRoutes from "./routes/contacts-routes";
import emailRoutes from "./routes/email-routes";
import userRoutes from "./routes/users-routes";

import connect from "./config/database";
import { connectRedis } from "./config/redis";
import "./utils/auth/generateJwtKeyPairs";

import errorHandler from "./middlewares/error";

// connect to database
connect();

// connect to redis
connectRedis();

// server config
const port: number | string = process.env.PORT || 2022;
const app: Application = express();

app.listen(port, () => {
  console.log(`running on port: ${port}`);
});

// multer config
const storage = multer.memoryStorage();
export const upload = multer({ storage });

// serving static files
app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "../src/views")));
app.use(express.static(path.join(__dirname, "../src/public")));

// middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["PUT", "POST", "DELETE", "GET"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// using routes
app.use("/api", emailRoutes);
app.use("/api/contacts", upload.single("contactAvatar"), contactsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// error handlers
app.get("*", (req: Request, res: Response) => {
  res.status(404).json({ success: false, message: "404, Page not found." });
});

app.use(errorHandler);
