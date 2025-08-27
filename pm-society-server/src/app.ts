import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import router from "./app/routes";
import notFound from "./app/middlewares/notFound";

const app: Application = express();
app.use(express.json());
app.use(
  cors({
    origin: ["https://www.thepmsociety.com","https://pm-socity.vercel.app","http://localhost:3000", "https://pm-society.vercel.app", ],
    credentials: true,
  })
);

app.use(cookieParser());

app.set("trust proxy", 1)

app.use("/api/", router);
app.get("/", (req, res) => {
  res.send("Server is running");
});

// app.use(globalErrorHandler);

app.use(notFound);

export default app;
