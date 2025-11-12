"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cohort = void 0;
const mongoose_1 = require("mongoose");
const CohortSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String },
    members: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true }],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
});
CohortSchema.virtual("memberCount").get(function () {
    var _a;
    return ((_a = this.members) === null || _a === void 0 ? void 0 : _a.length) || 0;
});
exports.Cohort = (0, mongoose_1.model)("Cohort", CohortSchema);
