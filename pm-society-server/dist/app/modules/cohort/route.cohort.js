"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CohortRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller_cohort_1 = require("./controller.cohort");
const router = express_1.default.Router();
// POST /api/cohorts
router.post("/", controller_cohort_1.CohortController.createCohort);
// GET /api/cohorts
router.get("/", controller_cohort_1.CohortController.getCohorts);
// GET /api/cohorts/:id
router.get("/:id", controller_cohort_1.CohortController.getSingleCohort);
// PATCH /api/cohorts/:id
router.patch("/:id", controller_cohort_1.CohortController.updateCohort);
// DELETE /api/cohorts/:id
router.delete("/:id", controller_cohort_1.CohortController.deleteCohort);
exports.CohortRoutes = router;
