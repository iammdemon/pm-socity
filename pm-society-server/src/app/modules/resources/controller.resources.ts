
import catchAsync from "../../utils/catchAsync";
import { ResourceService } from "./service.resources";

const createAResource = catchAsync(async (req, res) => {
  const result = await ResourceService.createResourceIntoDB(req.body, req.file);
  res.status(201).json({
    message: "Resource created successfully",
    data: result,
  });
});

const getAllResources = catchAsync(async (_req, res) => {
  const result = await ResourceService.getAllResources();
  res.status(200).json({
    message: "Resources fetched successfully",
    data: result,
  });
});

const updateResource = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await ResourceService.updateResource(id, req.body, req.file);
  res.status(200).json({
    message: "Resource updated successfully",
    data: result,
  });
});

const deleteResource = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await ResourceService.deleteResource(id);
  res.status(200).json({
    message: "Resource deleted successfully",
    data: result,
  });
});

export const ResourceController = {
  createAResource,
  getAllResources,
  updateResource,
  deleteResource,
};
