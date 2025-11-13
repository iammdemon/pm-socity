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
exports.CohortPostController = void 0;
// controller.cohortPost.ts
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const service_cohortPost_1 = require("./service.cohortPost");
const createPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_cohortPost_1.CohortPostService.createPost(req.body, req.user.email, req.file);
    res.status(201).json({ message: "Post created successfully", data: result });
}));
const getPostsByCohort = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cohortId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const result = yield service_cohortPost_1.CohortPostService.getPostsByCohort(cohortId, req.user.email, page, limit);
    res.status(200).json({ message: "Posts fetched successfully", data: result });
}));
const getAllPostsForUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_cohortPost_1.CohortPostService.getAllPostsForUser(req.user.email);
    res.status(200).json({ message: "Posts fetched successfully", data: result });
}));
const getPostById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    const result = yield service_cohortPost_1.CohortPostService.getPostById(postId, req.user.email);
    res.status(200).json({ message: "Post fetched successfully", data: result });
}));
const addReply = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    const result = yield service_cohortPost_1.CohortPostService.addReplyToPost(postId, req.body, req.user.email);
    res.status(201).json({ message: "Reply added successfully", data: result });
}));
const toggleReactionOnPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    const result = yield service_cohortPost_1.CohortPostService.toggleReactionOnPost(postId, req.user.email);
    res.status(200).json({ message: "Reaction toggled successfully", data: result });
}));
const toggleReactionOnReply = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId, replyId } = req.params;
    const result = yield service_cohortPost_1.CohortPostService.toggleReactionOnReply(postId, replyId, req.user.email);
    res.status(200).json({ message: "Reaction toggled successfully", data: result });
}));
const editPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    const updatedPost = yield service_cohortPost_1.CohortPostService.editPost(postId, req.body, req.user.email, req.file // optional file (new image)
    );
    res.status(200).json({
        message: "Post updated successfully",
        data: updatedPost,
    });
}));
const deletePost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    const result = yield service_cohortPost_1.CohortPostService.deletePost(postId, req.user.email);
    res.status(200).json({
        message: result.message,
    });
}));
exports.CohortPostController = {
    createPost,
    getPostsByCohort,
    getAllPostsForUser,
    getPostById,
    editPost,
    deletePost,
    addReply,
    toggleReactionOnPost,
    toggleReactionOnReply,
};
