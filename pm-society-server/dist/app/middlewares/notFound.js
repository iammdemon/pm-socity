"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Not Found",
        error: "",
    });
    // No need to return the response, and we don't call next() since this is the final response
};
exports.default = notFound;
