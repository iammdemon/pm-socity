import { Request, Response } from "express";

import catchAsync from "../../utils/catchAsync";

import { ResourceService } from "./service.resources";

const createAResource = catchAsync(async (req, res)=>{
 
    try {
        const result = await ResourceService.createResourceIntoDB(req.body);
        res.status(201).json({
            message: "Resource created successfully",
            data: result,
        });
    } catch (error) {
        console.error("Error creating Resource:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

const getAllResources = async (req: Request, res: Response) => {

    try {
        const result = await ResourceService.getAllResources()
        res.status(200).json({
            message: "Resources fetched successfully",
            data: result,
        });
    } catch (error) {
        console.error("Error fetching Resources:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


const updateResource = catchAsync(async (req, res)=>{
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const result = await ResourceService.updateResource(id, updatedData);
        if (!result) {
            res.status(404).json({ error: "Resource not found" });
            return;
        }
        res.status(200).json({
            message: "Resource updated successfully",
            data: result,
        });
    } catch (error) {
        console.error("Error updating Resource:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

const deleteResource = catchAsync(async (req, res) => {
    try {
        const id = req.params.id;
        const result = await ResourceService.deleteResource(id);
        if (!result) {
            res.status(404).json({ error: "Resource not found" });
            return;
        }
        res.status(200).json({
            message: "Resource deleted successfully",
            data: result,
        });
    } catch (error) {
        console.error("Error deleting Resource:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

export const ResourceController = {
    createAResource,
    getAllResources,
    updateResource,
    deleteResource
};