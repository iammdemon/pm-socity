import { ILearningResource } from "./interface.learning-resources";
import { LearningResource } from "./model.learning-resources";

const addLearningResourcesToDB = async(payload:ILearningResource)=>{
return await LearningResource.create(payload)
}

const getAllLearningResourcesFromDB = async()=>{
return await LearningResource.find()
}

const updateLearningResourcesByIdToDB = async(id:string,payload:Partial<ILearningResource>)=>{
return await LearningResource.findByIdAndUpdate(id, payload, { new: true });
}

const deleteLearningResourcesByIdFromDB = async(id:string)=>{
return await LearningResource.findByIdAndDelete(id);

}

export const LearningResourcesService={
    addLearningResourcesToDB,
    getAllLearningResourcesFromDB,
    updateLearningResourcesByIdToDB,
    deleteLearningResourcesByIdFromDB
}