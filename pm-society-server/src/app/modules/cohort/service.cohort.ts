import { Types } from "mongoose";
import { Cohort } from "./model.cohort";
import { User } from "../users/model.users";
import { ICohort } from "./cohort.interface";

/**
 * Create a cohort and update users' cohort list
 */
const createCohortIntoDB = async (payload: ICohort) => {
  const cohort = await Cohort.create(payload);

  if (payload.members?.length) {
    await User.updateMany(
      { _id: { $in: payload.members } },
      { $addToSet: { cohort: cohort._id } }
    );
  }

  return cohort;
};

/**
 * Get all cohorts, populated with members
 */
const getCohortsFromDB = async () => {
  return Cohort.find()
    .populate("members", "_id name email username")
    .sort({ createdAt: -1 });
};

/**
 * Get a single cohort by ID
 */
const getSingleCohortFromDB = async (id: string) => {
  return Cohort.findById(id).populate("members", "_id name email username");
};

/**
 * Update cohort and sync membership changes
 */
const updateCohortInDB = async (id: string, payload: Partial<ICohort>) => {
  const previous = await Cohort.findById(id);
  if (!previous) throw new Error("Cohort not found");

  const updated = await Cohort.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!updated) return null;

  // Sync member changes
  const oldMembers = previous.members.map(String);
  const newMembers = (payload.members || []).map(String);

  const addedMembers = newMembers.filter((m) => !oldMembers.includes(m));
  const removedMembers = oldMembers.filter((m) => !newMembers.includes(m));

  if (addedMembers.length) {
    await User.updateMany(
      { _id: { $in: addedMembers } },
      { $addToSet: { cohort: id } }
    );
  }

  if (removedMembers.length) {
    await User.updateMany(
      { _id: { $in: removedMembers } },
      { $pull: { cohort: id } }
    );
  }

  return updated;
};

/**
 * Delete a cohort and remove it from all users
 */
const deleteCohortFromDB = async (id: string) => {
  const cohort = await Cohort.findById(id);
  if (!cohort) return null;

  await User.updateMany(
    { _id: { $in: cohort.members } },
    { $pull: { cohort: id } }
  );

  return Cohort.findByIdAndDelete(id);
};

/**
 * Add a member to a cohort
 */
const addMemberToCohort = async (cohortId: string, userId: Types.ObjectId) => {
  const cohort = await Cohort.findByIdAndUpdate(
    cohortId,
    { $addToSet: { members: userId } },
    { new: true }
  );

  if (cohort) {
    await User.findByIdAndUpdate(userId, { $addToSet: { cohort: cohortId } });
  }

  return cohort;
};

/**
 * Remove a member from a cohort
 */
const removeMemberFromCohort = async (cohortId: string, userId: Types.ObjectId) => {
  const cohort = await Cohort.findByIdAndUpdate(
    cohortId,
    { $pull: { members: userId } },
    { new: true }
  );

  if (cohort) {
    await User.findByIdAndUpdate(userId, { $pull: { cohort: cohortId } });
  }

  return cohort;
};

export const CohortService = {
  createCohortIntoDB,
  getCohortsFromDB,
  getSingleCohortFromDB,
  updateCohortInDB,
  deleteCohortFromDB,
  addMemberToCohort,
  removeMemberFromCohort,
};
