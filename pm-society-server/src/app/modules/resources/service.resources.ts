import { StorageService } from "../../utils/minioClient";
import { IResource } from "./interface.resources";
import { Resource } from "./model.resources";

import { Types } from "mongoose";

const bucketName = "resources";

const createResourceIntoDB = async (
  payload: IResource,
  file?: Express.Multer.File
) => {
  let fileUrl: string | undefined;

  if (file) {
    const { fileUrl: uploadedUrl } = await StorageService.uploadFile(bucketName, file);
    fileUrl = uploadedUrl;
  }

  const result = await Resource.create({ ...payload, fileUrl });
  return result;
};

const getAllResources = async () => {
  return Resource.find();
};

const updateResource = async (
  id: string | Types.ObjectId,
  updateData: Partial<IResource>,
  file?: Express.Multer.File
) => {
  const resource = await Resource.findById(id);
  if (!resource) throw new Error("Resource not found");

  if (file) {
    // delete old file if exists
    if (resource.fileUrl) {
      await StorageService.deleteFile(bucketName, resource.fileUrl);
    }
    // upload new file
    const { fileUrl: newUrl } = await StorageService.uploadFile(bucketName, file);
    updateData.fileUrl = newUrl;
  }

  const result = await Resource.findByIdAndUpdate(id, updateData, { new: true });
  return result;
};

const deleteResource = async (id: string | Types.ObjectId) => {
  const resource = await Resource.findById(id);
  if (!resource) throw new Error("Resource not found");

  if (resource.fileUrl) {
    await StorageService.deleteFile(bucketName, resource.fileUrl);
  }

  return Resource.findByIdAndDelete(id);
};

export const ResourceService = {
  createResourceIntoDB,
  getAllResources,
  updateResource,
  deleteResource,
};
