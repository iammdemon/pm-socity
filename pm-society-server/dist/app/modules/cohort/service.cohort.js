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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CohortService = void 0;
const model_cohort_1 = require("./model.cohort");
const model_users_1 = require("../users/model.users");
/**
 * Create a cohort and update users' cohort list
 */
const createCohortIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const cohort = yield model_cohort_1.Cohort.create(payload);
    if ((_a = payload.members) === null || _a === void 0 ? void 0 : _a.length) {
        yield model_users_1.User.updateMany({ _id: { $in: payload.members } }, { $addToSet: { cohort: cohort._id } });
    }
    return cohort;
});
/**
 * Get all cohorts, populated with members
 */
const getCohortsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    return model_cohort_1.Cohort.find()
        .populate("members", "_id name email username")
        .sort({ createdAt: -1 });
});
/**
 * Get a single cohort by ID
 */
const getSingleCohortFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return model_cohort_1.Cohort.findById(id).populate("members", "_id name email username");
});
/**
 * Update cohort and sync membership changes
 */
const updateCohortInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const previous = yield model_cohort_1.Cohort.findById(id);
    if (!previous)
        throw new Error("Cohort not found");
    const updated = yield model_cohort_1.Cohort.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!updated)
        return null;
    // Sync member changes
    const oldMembers = previous.members.map(String);
    const newMembers = (payload.members || []).map(String);
    const addedMembers = newMembers.filter((m) => !oldMembers.includes(m));
    const removedMembers = oldMembers.filter((m) => !newMembers.includes(m));
    if (addedMembers.length) {
        yield model_users_1.User.updateMany({ _id: { $in: addedMembers } }, { $addToSet: { cohort: id } });
    }
    if (removedMembers.length) {
        yield model_users_1.User.updateMany({ _id: { $in: removedMembers } }, { $pull: { cohort: id } });
    }
    return updated;
});
/**
 * Delete a cohort and remove it from all users
 */
const deleteCohortFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const cohort = yield model_cohort_1.Cohort.findById(id);
    if (!cohort)
        return null;
    yield model_users_1.User.updateMany({ _id: { $in: cohort.members } }, { $pull: { cohort: id } });
    return model_cohort_1.Cohort.findByIdAndDelete(id);
});
/**
 * Add a member to a cohort
 */
const addMemberToCohort = (cohortId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const cohort = yield model_cohort_1.Cohort.findByIdAndUpdate(cohortId, { $addToSet: { members: userId } }, { new: true });
    if (cohort) {
        yield model_users_1.User.findByIdAndUpdate(userId, { $addToSet: { cohort: cohortId } });
    }
    return cohort;
});
/**
 * Remove a member from a cohort
 */
const removeMemberFromCohort = (cohortId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const cohort = yield model_cohort_1.Cohort.findByIdAndUpdate(cohortId, { $pull: { members: userId } }, { new: true });
    if (cohort) {
        yield model_users_1.User.findByIdAndUpdate(userId, { $pull: { cohort: cohortId } });
    }
    return cohort;
});
exports.CohortService = {
    createCohortIntoDB,
    getCohortsFromDB,
    getSingleCohortFromDB,
    updateCohortInDB,
    deleteCohortFromDB,
    addMemberToCohort,
    removeMemberFromCohort,
};
