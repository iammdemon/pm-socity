"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CohortRoutes = void 0;
// routes.cohort.ts
const express_1 = __importDefault(require("express"));
const controller_cohort_1 = require("./controller.cohort");
const auth_1 = require("../../middlewares/auth");
const router = express_1.default.Router();
/**
 * ROUTE ORDER MATTERS
 * Static or custom routes -> then ":id"
 */
// CREATE cohort
router.post("/", auth_1.authenticateJWT, controller_cohort_1.CohortController.createCohort);
// GET all
router.get("/", auth_1.authenticateJWT, controller_cohort_1.CohortController.getCohorts);
// GET the cohort of current user
router.get("/my", auth_1.authenticateJWT, controller_cohort_1.CohortController.myCohort);
// GET single cohort (must be after /my)
router.get("/:id", auth_1.authenticateJWT, controller_cohort_1.CohortController.getSingleCohort);
// UPDATE
router.patch("/:id", auth_1.authenticateJWT, controller_cohort_1.CohortController.updateCohort);
// DELETE
router.delete("/:id", auth_1.authenticateJWT, controller_cohort_1.CohortController.deleteCohort);
exports.CohortRoutes = router;
