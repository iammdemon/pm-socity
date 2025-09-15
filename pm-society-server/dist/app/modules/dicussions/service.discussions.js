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
exports.ForumService = void 0;
const model_discussions_1 = require("./model.discussions");
const createTopic = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_discussions_1.ForumTopic.create(payload);
});
const getAllTopics = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_discussions_1.ForumTopic.find().sort({ createdAt: -1 });
});
const getSingleTopic = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_discussions_1.ForumTopic.findOne({ slug });
});
const createMessage = (topicId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_discussions_1.ForumMessage.create(Object.assign(Object.assign({}, payload), { topicId }));
});
const getMessagesByTopic = (topicId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_discussions_1.ForumMessage.find({ topicId }).sort({ createdAt: 1 });
});
const deleteTopic = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_discussions_1.ForumTopic.findOneAndDelete({ slug });
});
exports.ForumService = {
    createTopic,
    getAllTopics,
    getSingleTopic,
    createMessage,
    getMessagesByTopic,
    deleteTopic
};
