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
exports.PaymentService = void 0;
const stripe_1 = __importDefault(require("stripe"));
const config_1 = __importDefault(require("../../config"));
const stripe = new stripe_1.default(config_1.default.STRIPE_SECRET_KEY);
const createPaymentIntent = (amount) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paymentIntent = yield stripe.paymentIntents.create({
            amount,
            currency: 'usd', // Change to your desired currency
            payment_method_types: ['card'],
        });
        return paymentIntent;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to create payment intent: ${error.message}`);
        }
        else {
            throw new Error(`Failed to create payment intent: ${String(error)}`);
        }
    }
});
const verifyPayment = (paymentIntentId) => __awaiter(void 0, void 0, void 0, function* () {
    const paymentIntent = yield stripe.paymentIntents.retrieve(paymentIntentId);
    return paymentIntent;
});
exports.PaymentService = {
    createPaymentIntent,
    verifyPayment,
};
