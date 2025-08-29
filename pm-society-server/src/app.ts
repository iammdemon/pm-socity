import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./app/routes";
import notFound from "./app/middlewares/notFound";

const app: Application = express();

// Trust proxy FIRST - crucial for Coolify deployments
app.set("trust proxy", 1);

// Define allowed origins
const allowedOrigins = [
  "https://thepmsociety.com",
  "https://www.thepmsociety.com",
  "https://pm-society.vercel.app",
  "https://pm-socity.vercel.app",
  "http://localhost:3000",
  "http://localhost:3001",
];

// CORS configuration
const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    // Allow requests with no origin (mobile apps, curl, postman, etc.)
    if (!origin) {
      console.log("Request with no origin allowed");
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      console.log(`Origin ${origin} allowed`);
      callback(null, true);
    } else {
      console.error(`Origin ${origin} blocked by CORS`);
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
    "Cache-Control",
    "X-Access-Token",
    "X-Key",
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Methods"
  ],
  exposedHeaders: ["Set-Cookie"],
  maxAge: 86400, // 24 hours
  optionsSuccessStatus: 200,
  preflightContinue: false
};

// Apply CORS middleware EARLY
app.use(cors(corsOptions));

// Handle preflight requests explicitly for ALL routes
app.options("*", (req, res) => {
  const origin = req.headers.origin;
  
  if (!origin || allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin || "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, X-Access-Token");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Max-Age", "86400");
  }
  
  res.status(200).end();
});

// Additional CORS headers middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  if (!origin || allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin || "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, X-Access-Token");
  }
  
  // Log all requests for debugging
  console.log(`${req.method} ${req.path} - Origin: ${origin || 'none'}`);
  
  next();
});

// Body parsers (after CORS)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Test route with CORS headers
app.get("/", (req, res) => {
  res.json({ 
    message: "Server is running",
    timestamp: new Date().toISOString(),
    cors: "enabled",
    origin: req.headers.origin
  });
});

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "healthy",
    timestamp: new Date().toISOString(),
    cors: "working"
  });
});

// CORS test route
app.get("/api/cors-test", (req, res) => {
  res.json({
    message: "CORS is working!",
    origin: req.headers.origin,
    method: req.method,
    headers: req.headers
  });
});

app.post("/api/cors-test", (req, res) => {
  res.json({
    message: "CORS POST is working!",
    origin: req.headers.origin,
    method: req.method,
    body: req.body
  });
});

// API routes
app.use("/api", router);

// Not found middleware
app.use(notFound);

// Global error handler
const errorHandler: express.ErrorRequestHandler = (err, req, res, next) => {
  console.error("Global error handler:", err);
  
  // Handle CORS errors specifically
  if (err.message && err.message.includes("CORS")) {
    res.status(403).json({
      error: "CORS Error",
      message: "Origin not allowed",
      origin: req.get("Origin"),
      allowedOrigins: allowedOrigins
    });
    return;
  }
  
  res.status(500).json({
    error: "Internal Server Error",
    message: process.env.NODE_ENV === "production" ? "Something went wrong" : err.message
  });
};

app.use(errorHandler);

export default app;