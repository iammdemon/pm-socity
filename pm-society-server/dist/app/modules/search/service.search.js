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
exports.searchService = void 0;
const model_discussions_1 = require("../dicussions/model.discussions");
const model_events_1 = __importDefault(require("../events/model.events"));
const model_resources_1 = require("../resources/model.resources");
const model_users_1 = require("../users/model.users");
const searchAll = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const trimmedQuery = query === null || query === void 0 ? void 0 : query.trim();
    if (!trimmedQuery) {
        return { users: [], posts: [], resources: [], events: [] };
    }
    const queryRegex = new RegExp(trimmedQuery, "i");
    const [users, posts, resources, events] = yield Promise.all([
        // 👇 No .select() — returns full user docs
        model_users_1.User.find({
            $or: [{ name: queryRegex }, { userName: queryRegex }, { bio: queryRegex }],
        })
            .limit(5)
            .catch(() => []),
        // 👇 Full forum topic (with populated author)
        model_discussions_1.ForumTopic.find({ content: queryRegex })
            .populate("author", "name userName") // full author data
            .limit(5)
            .catch(() => []),
        // 👇 Full resource documents
        model_resources_1.Resource.find({
            $or: [{ title: queryRegex }, { description: queryRegex }, { tags: queryRegex }],
        })
            .limit(5)
            .catch(() => []),
        // 👇 Full event documents
        model_events_1.default.find({
            $or: [{ title: queryRegex }, { description: queryRegex }],
        })
            .limit(5)
            .catch(() => []),
    ]);
    return { users, posts, resources, events };
});
exports.searchService = { searchAll };
