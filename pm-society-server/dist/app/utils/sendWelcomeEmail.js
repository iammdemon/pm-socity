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
        const htmlContent = `
  <div style="font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 20px;">
    <table role="presentation" width="100%" style="max-width: 600px; margin: auto; background: white; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
      <tr>
        <td style="padding: 30px; text-align: center; background-color: #004aad; color: white; border-radius: 8px 8px 0 0;">
          <h2>Welcome to PM Society!</h2>
        </td>
      </tr>
      <tr>
        <td style="padding: 30px; color: #333;">
          <p>Hi <strong>${userName}</strong>,</p>
          <p>Thank you for joining PM Society. We’re excited to have you on board!</p>
          <p>Here are your membership details:</p>

          <ul style="list-style: none; padding: 0;">
            <li><strong>Email:</strong> ${to}</li>
            <li><strong>Package:</strong> ${packageType}</li>
            <li><strong>Subscription Type:</strong> ${subscriptionType.replace("_", " ")}</li>
            <li><strong>Membership Ends:</strong> ${subscriptionEndDate.toLocaleDateString()}</li>
          </ul>

          <p>If you have any questions, feel free to contact our support team.</p>

          <p>Enjoy your journey with us!</p>

          <p>Best regards,<br />The PM Society Team</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 20px; text-align: center; font-size: 12px; color: #aaa;">
          &copy; 2025 PM Society. All rights reserved.
        </td>
      </tr>
    </table>
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
