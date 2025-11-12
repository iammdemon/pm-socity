import express from "express";
import { CohortController } from "./controller.cohort";

const router = express.Router();

router.post("/", CohortController.createCohort);
router.get("/", CohortController.getCohort);

export const CohortRoutes = router;
