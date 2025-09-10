
import express from "express";
import { subscribeUser } from "./controller";


const router = express.Router();

// POST /subscribe
router.post("/", subscribeUser);

export const mailchimpRoutes = router;
