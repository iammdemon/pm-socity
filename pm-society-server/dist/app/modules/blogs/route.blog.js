"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller_blog_1 = require("./controller.blog");
const router = express_1.default.Router();
router.post("/", controller_blog_1.blogController.createABlog);
router.get("/", controller_blog_1.blogController.getAllblogs);
router.get("/:slug", controller_blog_1.blogController.getSingleBlog);
router.put("/:slug", controller_blog_1.blogController.updateBlog);
router.delete("/:slug", controller_blog_1.blogController.deleteBlog);
exports.blogRoutes = router;
