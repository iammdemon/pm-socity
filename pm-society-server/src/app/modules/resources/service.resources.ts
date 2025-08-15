import { IResource } from "./interface.resources";
import { Resource } from "./model.resources";


const createResourceIntoDB = async(payload: IResource)=>{
    const result = await Resource.create(payload)
    return result
}

const getAllResources= async ()=>{
    const result = await Resource.find()
    return result
}


const updateResource = async (id: string, updateData: Partial<IResource>) => {
    const result = await Resource.findByIdAndUpdate(id, updateData, { new: true });
    return result;
};

const deleteResource = async (id: string) => {
    const result = await Resource.findByIdAndDelete(id )
    return result;
};
export const ResourceService = {
    createResourceIntoDB,
    getAllResources,
    updateResource,deleteResource
}