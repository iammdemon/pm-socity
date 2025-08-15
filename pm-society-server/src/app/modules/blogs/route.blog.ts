import express from "express";
import { blogController } from "./controller.blog";

const router = express.Router();

router.post("/", blogController.createABlog);
router.get("/", blogController.getAllblogs);
router.get("/:slug", blogController.getSingleBlog);
router.put("/:slug", blogController.updateBlog);
router.delete("/:slug", blogController.deleteBlog);
export const blogRoutes = router;
