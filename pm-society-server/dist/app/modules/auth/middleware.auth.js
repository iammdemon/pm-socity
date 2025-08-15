"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const isAuthenticated = (req, res, next) => {
    try {
        console.log(req.cookies);
        const token = req.cookies.accessToken;
        console.log(token);
        if (!token) {
            res.status(401).json({ message: 'Not authenticated' });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
        req.user = decoded;
        console.log("Decoded token:", decoded);
        next();
    }
    catch (err) {
        res.status(401).json({ message: 'Token invalid' });
    }
};
exports.isAuthenticated = isAuthenticated;
