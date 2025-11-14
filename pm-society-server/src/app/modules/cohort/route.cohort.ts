// routes.cohort.ts
import express from "express";
import { CohortController } from "./controller.cohort";
import { authenticateJWT } from "../../middlewares/auth";

const router = express.Router();

/**
 * ROUTE ORDER MATTERS
 * Static or custom routes -> then ":id"
 */

// CREATE cohort
router.post("/", authenticateJWT, CohortController.createCohort);

// GET all
router.get("/", authenticateJWT, CohortController.getCohorts);

// GET the cohort of current user
router.get("/my", authenticateJWT, CohortController.myCohort);

// GET single cohort (must be after /my)
router.get("/:id", authenticateJWT, CohortController.getSingleCohort);

// UPDATE
router.patch("/:id", authenticateJWT, CohortController.updateCohort);

// DELETE
router.delete("/:id", authenticateJWT, CohortController.deleteCohort);

export const CohortRoutes = router;
