import { Request, Response } from "express";
import { blogService } from "./service.blog";
import catchAsync from "../../utils/catchAsync";

const createABlog = catchAsync(async (req, res)=>{
 
    try {
        const result = await blogService.createABlogIntoDB(req.body);
        res.status(201).json({
            message: "Blog created successfully",
            data: result,
        });
    } catch (error) {
        console.error("Error creating blog:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

const getAllblogs = async (req: Request, res: Response) => {

    try {
        const result = await blogService.getAllblogs();
        res.status(200).json({
            message: "Blogs fetched successfully",
            data: result,
        });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
const getSingleBlog = catchAsync(async (req, res)=>{
    try {
        const slug = req.params.slug;
        const result = await blogService.getSingleBlog(slug);
        if (!result) {
            res.status(404).json({ error: "Blog not found" });
            return;
        }
        res.status(200).json({
            message: "Blog fetched successfully",
            data: result,
        });
    } catch (error) {
        console.error("Error fetching blog:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

const updateBlog = catchAsync(async (req, res)=>{
    try {
        const slug = req.params.slug;
        const updatedData = req.body;
        const result = await blogService.updateBlog(slug, updatedData);
        if (!result) {
            res.status(404).json({ error: "Blog not found" });
            return;
        }
        res.status(200).json({
            message: "Blog updated successfully",
            data: result,
        });
    } catch (error) {
        console.error("Error updating blog:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

const deleteBlog = catchAsync(async (req, res) => {
    try {
        const slug = req.params.slug;
        const result = await blogService.deleteBlog(slug);
        if (!result) {
            res.status(404).json({ error: "Blog not found" });
            return;
        }
        res.status(200).json({
            message: "Blog deleted successfully",
            data: result,
        });
    } catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

export const blogController = {
    createABlog,
    getAllblogs,
    getSingleBlog,
    updateBlog,
    deleteBlog
};