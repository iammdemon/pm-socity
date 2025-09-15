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
exports.subscribeUser = void 0;
const mailchimp_marketing_1 = __importDefault(require("@mailchimp/mailchimp_marketing"));
const config_1 = __importDefault(require("../../config"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
mailchimp_marketing_1.default.setConfig({
    apiKey: config_1.default.MAILCHIMP_API_KEY,
    server: "us14",
});
const listId = config_1.default.MAILCHIMP_AUDIENCE_ID;
exports.subscribeUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name } = req.body;
    console.log(email, name);
    if (!email)
        res.status(400).json({ error: "Email is required" });
    const response = yield mailchimp_marketing_1.default.lists.addListMember(listId, {
        email_address: email,
        status: "subscribed",
        merge_fields: { FNAME: name },
    });
    console.log(response);
    res.status(200).json({ success: true, data: response });
}));
