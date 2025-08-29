import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import router from "./app/routes";
import notFound from "./app/middlewares/notFound";

const app: Application = express();
app.use(express.json());

// const allowedOrigins = [
//   'https://thepmsociety.com',
//   'https://www.thepmsociety.com',
//   'https://pm-socity.vercel.app',
//   'https://pm-society.vercel.app',
//   'http://localhost:3000',
// ];

// const corsOptions = {
//   origin: (origin: string | undefined, callback: (arg0: Error | null, arg1: boolean | undefined) => void) => {
//     if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'), false);
//     }
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
// };

// app.use(cors(corsOptions));
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
// app.use(
//   cors({
//     origin: ["https://thepmsociety.com","https://www.thepmsociety.com","https://pm-socity.vercel.app","http://localhost:3000",  ],
//     credentials: true,
//   })
// );

app.use(cookieParser());



app.use("/api/", router);
app.get("/", (req, res) => {
  res.send("Server is running");
});

// app.use(globalErrorHandler);

app.use(notFound);

export default app;
