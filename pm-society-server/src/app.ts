import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./app/routes";
import notFound from "./app/middlewares/notFound";

const app: Application = express();
app.options("*", cors()); // Handle preflight requests for all routes
// Enable CORS with detailed configuration
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "https://thepmsociety.com",
        "https://pm-society.vercel.app",
        "https://pm-socity.vercel.app", // Fix typo in origin if needed
        "http://localhost:3000",
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin || "*"); // Allow requests with no origin (e.g., server-to-server)
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Explicitly allow methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  })
);

// Parse JSON bodies
app.use(express.json());

// Parse cookies
app.use(cookieParser());

// Trust proxy for environments behind a load balancer (e.g., Coolify)
app.set("trust proxy", 1);

// Test route
app.get("/", (req, res) => {
 res.send("Server is running");
});

// API routes
app.use("/api", router);

// Not found middleware
app.use(notFound);

export default app;