export { };

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// core
import express from "express";
import path from "path";

// configs
import connect from "./configs/mongodb.configs";
import googleAuth from "./configs/passportGoogleOauth2";
import { connectRedis } from "./configs/redis.configs";
import "./utils/auth/generateJwtKeyPairs.utils";

// global middleware
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";
import passport from "passport";
import errorHandler from "./middleware/error.middleware";

// routes
import authRoutes from "./routes/auth.routes";
import contactsRoutes from "./routes/contact.routes";
import emailRoutes from "./routes/email.routes";
import userRoutes from "./routes/user.routes";

// ts types
import { Application, Request, Response } from "express";

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

// session config
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
  })
);

// passport config
app.use(passport.initialize());
app.use(passport.session());
googleAuth(passport);

// multer config
const storage = multer.memoryStorage();
export const upload = multer({ storage });

// serving static files
app.use(express.static(path.join(__dirname, "uploads")));

// middleware
app.use(helmet())
app.use(morgan("dev"));
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
app.use("/api/auth", authRoutes);
app.use("/api/users", upload.single("userImg"), userRoutes);
app.use("/api/contacts", upload.single("contactImg"), contactsRoutes);

// error handlers
app.get("*", (req: Request, res: Response) => {
  res.status(404).json({ success: false, message: "404, Page not found." });
});

app.use(errorHandler);
