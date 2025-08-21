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
exports.ContactController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const service_contact_1 = require("./service.contact");
const createContact = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contactData = req.body;
    const result = yield service_contact_1.ContactService.createContactInfoIntoDB(contactData);
    res.status(201).json({
        status: "success",
        data: result,
    });
}));
const getAllContacts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contacts = yield service_contact_1.ContactService.getAllContacts();
    res.status(200).json({
        status: "success",
        data: contacts,
    });
}));
exports.ContactController = {
    createContact,
    getAllContacts,
};
