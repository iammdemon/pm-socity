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
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogService = void 0;
const model_blog_1 = require("./model.blog");
const createABlogIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_blog_1.Blog.create(payload);
    return result;
});
const getAllblogs = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_blog_1.Blog.find();
    return result;
});
const getSingleBlog = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_blog_1.Blog.findOne({ slug });
    return result;
});
const updateBlog = (slug, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_blog_1.Blog.findOneAndUpdate({ slug }, updateData, { new: true });
    return result;
});
const deleteBlog = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_blog_1.Blog.findOneAndDelete({ slug });
    return result;
});
exports.blogService = {
    createABlogIntoDB,
    getAllblogs,
    getSingleBlog,
    updateBlog, deleteBlog
};
