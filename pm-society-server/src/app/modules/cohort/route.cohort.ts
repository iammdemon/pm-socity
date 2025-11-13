import express from "express";
import { CohortController } from "./controller.cohort";

const router = express.Router();

// POST /api/cohorts
router.post("/", CohortController.createCohort);

// GET /api/cohorts
router.get("/", CohortController.getCohorts);

// GET /api/cohorts/:id
router.get("/:id", CohortController.getSingleCohort);

// PATCH /api/cohorts/:id
router.patch("/:id", CohortController.updateCohort);

// DELETE /api/cohorts/:id
router.delete("/:id", CohortController.deleteCohort);

export const CohortRoutes = router;
