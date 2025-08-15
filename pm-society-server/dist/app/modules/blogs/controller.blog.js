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
exports.blogController = void 0;
const service_blog_1 = require("./service.blog");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const createABlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield service_blog_1.blogService.createABlogIntoDB(req.body);
        res.status(201).json({
            message: "Blog created successfully",
            data: result,
        });
    }
    catch (error) {
        console.error("Error creating blog:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
const getAllblogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield service_blog_1.blogService.getAllblogs();
        res.status(200).json({
            message: "Blogs fetched successfully",
            data: result,
        });
    }
    catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
const getSingleBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slug = req.params.slug;
        const result = yield service_blog_1.blogService.getSingleBlog(slug);
        if (!result) {
            res.status(404).json({ error: "Blog not found" });
            return;
        }
        res.status(200).json({
            message: "Blog fetched successfully",
            data: result,
        });
    }
    catch (error) {
        console.error("Error fetching blog:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
const updateBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slug = req.params.slug;
        const updatedData = req.body;
        const result = yield service_blog_1.blogService.updateBlog(slug, updatedData);
        if (!result) {
            res.status(404).json({ error: "Blog not found" });
            return;
        }
        res.status(200).json({
            message: "Blog updated successfully",
            data: result,
        });
    }
    catch (error) {
        console.error("Error updating blog:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
const deleteBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slug = req.params.slug;
        const result = yield service_blog_1.blogService.deleteBlog(slug);
        if (!result) {
            res.status(404).json({ error: "Blog not found" });
            return;
        }
        res.status(200).json({
            message: "Blog deleted successfully",
            data: result,
        });
    }
    catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
exports.blogController = {
    createABlog,
    getAllblogs,
    getSingleBlog,
    updateBlog,
    deleteBlog
};
