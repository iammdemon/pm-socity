import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./app/routes";
import notFound from "./app/middlewares/notFound";

const app: Application = express();
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000", "https://pm-society.vercel.app", "https://www.thepmsociety.com","https://thepmsociety.com"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(cookieParser());


// Trust proxy FIRST - crucial for Coolify deployments
app.set("trust proxy", 1);






// API routes
app.use("/api", router);

// Not found middleware
app.use(notFound);





export default app;