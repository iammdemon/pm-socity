"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CohortController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const service_cohort_1 = require("./service.cohort");
/**
 * Create cohort
 */
const createCohort = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_cohort_1.CohortService.createCohortIntoDB(req.body);
    res.status(201).json({
        success: true,
        message: "Cohort created successfully",
        data: result,
    });
}));
/**
 * Get all cohorts
 */
const getCohorts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_cohort_1.CohortService.getCohortsFromDB();
    res.status(200).json({
        success: true,
        message: "Cohorts fetched successfully",
        data: result,
    });
}));
/**
 * Get single cohort by ID
 */
const getSingleCohort = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_cohort_1.CohortService.getSingleCohortFromDB(req.params.id);
    res.status(200).json({
        success: true,
        message: "Cohort fetched successfully",
        data: result,
    });
}));
/**
 * Update cohort
 */
const updateCohort = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_cohort_1.CohortService.updateCohortInDB(req.params.id, req.body);
    res.status(200).json({
        success: true,
        message: "Cohort updated successfully",
        data: result,
    });
}));
/**
 * Delete cohort
 */
const deleteCohort = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield service_cohort_1.CohortService.deleteCohortFromDB(req.params.id);
    res.status(200).json({
        success: true,
        message: "Cohort deleted successfully",
    });
}));
exports.CohortController = {
    createCohort,
    getCohorts,
    getSingleCohort,
    updateCohort,
    deleteCohort,
};
