// app.js
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import helmet from "helmet";
import { dbConnection } from "./database/dbconnection.js";
import { errorMiddleware } from "./middlewares/error.js"; 


// Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from './routes/userRoutes.js';
import donationRoutes from "./routes/donationRoutes.js";
import notificationRoutes from './routes/notificationRoutes.js';
import donorAnalyticsRoutes from './routes/donorAnalyticsRoutes.js';
import otpVerification from './routes/otpVerificationRoutes.js';
import ngoAnalyticsRoutes from './routes/ngoAnalyticsRoutes.js';
import mapplsRoutes from './routes/mapplsRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config({ path: "./config/config.env" });

const app = express();


// CORS Setup
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    credentials: true,
  })
);



// Security Headers
app.use(helmet({
  crossOriginResourcePolicy: false,
}
));


// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// File Upload
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/donations", donationRoutes);
app.use('/api/v1/notifications', notificationRoutes);
app.use('/api/v1/analytics/donor', donorAnalyticsRoutes);
app.use('/api/v1/analytics/ngo', ngoAnalyticsRoutes);
app.use('/api/v1/otp',otpVerification);
app.use('/api/v1/mappls', mapplsRoutes);
app.use('/api/v1/contact',contactRoutes);
app.use('/api/v1/feedback',feedbackRoutes);
app.use("/api/v1/newsletter", newsletterRoutes);
app.use("/api/v1/admin",adminRoutes);
// DB Connection
dbConnection();

// Global Error Handler
app.use(errorMiddleware);

// set socket
app.set("io", null);

export default app;
