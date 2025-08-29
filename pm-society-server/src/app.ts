import express, { Application, NextFunction, Request, Response } from "express";

import { ErrorRequestHandler } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./app/routes";
import notFound from "./app/middlewares/notFound";

const app: Application = express();

// Trust proxy for environments behind a load balancer (e.g., Coolify)
app.set("trust proxy", 1);

// Enable CORS with detailed configuration
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean | string) => void) => {
    const allowedOrigins = [
      "https://thepmsociety.com",
      "https://www.thepmsociety.com", // Add www version
      "https://pm-society.vercel.app",
      "https://pm-socity.vercel.app", // Keep typo version if needed
      "http://localhost:3000",
      "http://localhost:3001", // Add additional localhost ports if needed
    ];
    
    // Allow requests with no origin (mobile apps, curl requests, etc.)
    if (!origin) {
      return callback(null, true);
    }
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`CORS blocked origin: ${origin}`);
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Content-Type", 
    "Authorization", 
    "X-Requested-With",
    "Accept",
    "Origin",
    "Access-Control-Request-Method",
    "Access-Control-Request-Headers"
  ],
  exposedHeaders: ["Set-Cookie"],
  optionsSuccessStatus: 200, // For legacy browser support
  preflightContinue: false,
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests explicitly
app.options("*", cors(corsOptions));

// Parse JSON bodies (should come after CORS)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Parse cookies
app.use(cookieParser());

// Add security headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

// Test route
app.get("/", (req, res) => {
  res.json({ 
    message: "Server is running",
    timestamp: new Date().toISOString(),
    cors: "enabled"
  });
});

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use("/api", router);

// Not found middleware
app.use(notFound);


// Global error handler
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error("Global error handler:", err);
  
  if (err.message && err.message.includes("CORS")) {
    res.status(403).json({
      error: "CORS Error",
      message: "Origin not allowed",
      origin: req.get("Origin")
    });
  } else {
    res.status(500).json({
      error: "Internal Server Error",
      message: process.env.NODE_ENV === "production" ? "Something went wrong" : err.message
    });
  }
};

app.use(errorHandler);

export default app;