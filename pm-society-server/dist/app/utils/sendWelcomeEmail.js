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
exports.sendWelcomeEmail = sendWelcomeEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config"));
const transporter = nodemailer_1.default.createTransport({
    host: config_1.default.EMAIL_HOST,
    port: Number(config_1.default.EMAIL_PORT),
    secure: false,
    auth: {
        user: config_1.default.EMAIL_USER,
        pass: config_1.default.EMAIL_PASS,
    },
});
exports.default = transporter;
function sendWelcomeEmail(_a) {
    return __awaiter(this, arguments, void 0, function* ({ to, userName, packageType, subscriptionType, subscriptionEndDate, }) {
        const membershipEnds = subscriptionEndDate
            ? new Date(subscriptionEndDate).toLocaleDateString()
            : "N/A"; // fallback if undefined
        const htmlContent = `
<div style="font-family: Arial, sans-serif; background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 24px;">
  <div style="max-width: 480px; margin: auto; background: #ffffff; border-radius: 14px; box-shadow: 0 12px 32px rgba(0,0,0,0.12); overflow: hidden;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%); padding: 28px; text-align: center;">
      <h1 style="color: #ffffff; font-size: 24px; font-weight: 700; margin: 0; letter-spacing: 1px;">PM SOCIETY</h1>
    </div>
    
    <!-- Main Content -->
    <div style="padding: 32px;">
      <h2 style="color: #111827; font-size: 22px; font-weight: bold; margin: 0 0 20px 0; line-height: 1.4;">
        Welcome to PM Society!
      </h2>
      
      <p style="color: #374151; margin: 0 0 16px 0; font-size: 15px; line-height: 1.6;">
        Hi <strong>${userName}</strong>,
      </p>
      
      <p style="color: #374151; margin: 0 0 24px 0; font-size: 15px; line-height: 1.6;">
        Thank you for joining PM Society. We're excited to have you on board!
      </p>
      
      <!-- Details Box -->
      <div style="background: #f3f4f6; border-radius: 10px; padding: 20px; margin: 0 0 28px 0;">
        <h3 style="color: #111827; font-size: 16px; font-weight: 600; margin: 0 0 14px 0;">Your Membership Details:</h3>
        
        <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
          <span style="color: #6b7280; font-size: 14px;">Package:</span>
          <strong style="color: #111827; font-size: 14px;">${packageType}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
          <span style="color: #6b7280; font-size: 14px;">Subscription:</span>
          <strong style="color: #111827; font-size: 14px;">${subscriptionType}</strong>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: #6b7280; font-size: 14px;">Membership Ends:</span>
          <strong style="color: #111827; font-size: 14px;">${membershipEnds}</strong>
        </div>
      </div>
      
      <!-- CTA Button -->
      <a href="https://thepmsociety.com/login" 
         style="display: block; width: 100%; background: #dc2626; color: #ffffff; font-weight: 600; font-size: 15px; padding: 14px; border-radius: 10px; text-decoration: none; text-align: center; margin: 0 0 24px 0; box-shadow: 0 4px 10px rgba(220,38,38,0.3);">
        GET STARTED
      </a>
      
      <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0 0 16px 0;">
        We're here to help if you need it. For more info, 
        <a href="https://thepmsociety.com/connect" style="color: #2563eb; font-weight: 600; text-decoration: none;">Connect with us</a>.
      </p>
      
      <p style="color: #374151; font-size: 14px; margin: 0;">
        Best regards,<br/>
        <strong>The PM Society Team</strong>
      </p>
    </div>
    
    <!-- Footer -->
    <div style="background: #f9fafb; padding: 16px; text-align: center; border-top: 1px solid #e5e7eb;">
      <p style="color: #9ca3af; font-size: 12px; margin: 0;">
        © 2025 PM Society. All rights reserved.
      </p>
    </div>
  </div>
</div>
`;
        yield transporter.sendMail({
            from: config_1.default.EMAIL_FROM,
            to,
            subject: "Welcome to PM Society!",
            html: htmlContent,
        });
    });
}
