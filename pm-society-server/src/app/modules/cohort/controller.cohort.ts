import catchAsync from "../../utils/catchAsync";
import { CohortService } from "./service.cohort";

/**
 * Create cohort
 */
const createCohort = catchAsync(async (req, res) => {
  const result = await CohortService.createCohortIntoDB(req.body);
  res.status(201).json({
    success: true,
    message: "Cohort created successfully",
    data: result,
  });
});

/**
 * Get all cohorts
 */
const getCohorts = catchAsync(async (req, res) => {
  const result = await CohortService.getCohortsFromDB();
  res.status(200).json({
    success: true,
    message: "Cohorts fetched successfully",
    data: result,
  });
});

/**
 * Get single cohort by ID
 */
const getSingleCohort = catchAsync(async (req, res) => {
  const result = await CohortService.getSingleCohortFromDB(req.params.id);
  res.status(200).json({
    success: true,
    message: "Cohort fetched successfully",
    data: result,
  });
});

/**
 * Update cohort
 */
const updateCohort = catchAsync(async (req, res) => {
  const result = await CohortService.updateCohortInDB(req.params.id, req.body);
  res.status(200).json({
    success: true,
    message: "Cohort updated successfully",
    data: result,
  });
});

/**
 * Delete cohort
 */
const deleteCohort = catchAsync(async (req, res) => {
  await CohortService.deleteCohortFromDB(req.params.id);
  res.status(200).json({
    success: true,
    message: "Cohort deleted successfully",
  });
});

export const CohortController = {
  createCohort,
  getCohorts,
  getSingleCohort,
  updateCohort,
  deleteCohort,
};
