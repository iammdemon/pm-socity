import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import router from "./app/routes";
import notFound from "./app/middlewares/notFound";

const app: Application = express();
const allowedOrigins = [
  'https://thepmsociety.com',
  'https://www.thepmsociety.com',
  'http://localhost:3000',
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS']
}));

// Handle preflight
app.options('*', cors());

app.use(express.json());




app.use(cookieParser());



app.use("/api/", router);
app.get("/", (req, res) => {
  res.send("Server is running");
});

// app.use(globalErrorHandler);

app.use(notFound);

export default app;
