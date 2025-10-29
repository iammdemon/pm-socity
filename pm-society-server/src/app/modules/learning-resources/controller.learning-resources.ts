import catchAsync from "../../utils/catchAsync";
import { LearningResourcesService } from "./service.learning-resources";

const addLearningResources = catchAsync(async (req, res) => {
  const result = await LearningResourcesService.addLearningResourcesToDB(
    req.body
  );

  res.status(201).json({
    message: "Learning resource created successfully",
    data: result,
  });
});

const getAllLearningResources = catchAsync(async (req, res) => {
  const result = await LearningResourcesService.getAllLearningResourcesFromDB();

  res.status(200).json({
    message: "Learning resources fetched successfully",
    data: result,
  });
});

const updateLearningResources = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await LearningResourcesService.updateLearningResourcesByIdToDB(
    id,
    req.body
  );

  res.status(200).json({
    message: "Learning resource updated successfully",
    data: result,
  });
});

const deleteLearningResources = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await LearningResourcesService.deleteLearningResourcesByIdFromDB(id);

  res.status(200).json({
    message: "Learning resource deleted successfully",
    data: result,
  });
});


export const LearningResourcesController = {
  addLearningResources,
  getAllLearningResources,
  updateLearningResources,
  deleteLearningResources,
};