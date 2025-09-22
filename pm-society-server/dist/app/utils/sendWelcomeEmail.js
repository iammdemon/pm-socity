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
    secure: true,
    auth: {
        user: config_1.default.EMAIL_USER,
        pass: config_1.default.EMAIL_PASS,
    },
});
exports.default = transporter;
function sendWelcomeEmail(_a) {
    return __awaiter(this, arguments, void 0, function* ({ to, userName, email, packageType, }) {
        const htmlContent = `<div style="max-width:600px; margin:0 auto; background:#FCF4F0; border-radius:14px; overflow:hidden; font-family:Arial, sans-serif;">

  <!-- Header -->
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px; text-align:center;">
    <tr>
      <td style="text-align:left;">
        <img src="https://thepmsociety.com/logo.png" alt="PM Society Logo" width="100" style="max-width:100px; height:auto;">
      </td>
      <td style="text-align:right; font-weight:700; font-size:18px; color:#111827;">
        A Society Built on Collaboration
      </td>
    </tr>
  </table>

  <!-- Divider -->
  <hr style="border:0; border-top:1px solid #ddd; margin:0;">

  <!-- Main Content -->
  <div style="padding:20px; text-align:center;">
    <h1 style="color:#111827; font-size:26px; font-weight:800; margin-bottom:20px;">Your Journey Starts Here!</h1>
    <img src="https://thepmsociety.com/image/interview.webp" alt="Interview" width="70%" style="max-width:400px; height:auto; border-radius:500px 500px 0 0;">
    <p style="color:#111827; font-size:16px; font-weight:500; line-height:1.5; margin:20px 0;">
      We’re thrilled to welcome you to <strong>The PM Society!</strong> You’ve taken the first step toward advancing your project management career — we are honored to be part of your journey!
    </p>
  </div>

  <!-- Enrollment Details -->
  <div style="background:#EBEBEB; border-radius:10px; padding:20px; margin:20px;">
    <h3 style="color:#111827; font-size:16px; font-weight:600; margin-bottom:15px;">ENROLLMENT DETAILS</h3>
    <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px; color:#111827;">
      <tr>
        <td style="color:#6b7280;">Name:</td>
        <td style="font-weight:600; text-align:right;">${userName}</td>
      </tr>
      <tr>
        <td style="color:#6b7280;">Email:</td>
        <td style="font-weight:600; text-align:right;">${email}</td>
      </tr>
      <tr>
        <td style="color:#6b7280;">Package:</td>
        <td style="font-weight:600; text-align:right;">${packageType}</td>
      </tr>
    </table>
  </div>

  <!-- CTA -->
  <div style="text-align:center; margin:30px 0;">
    <a href="https://thepmsociety.com" style="display:inline-block; min-width:160px; background:#111827; color:#ffffff; font-weight:600; font-size:15px; padding:12px 24px; text-decoration:none; border-radius:9999px;">
      Explore
    </a>
  </div>

  <!-- Support Text -->
  <p style="padding:0 20px; color:#111827; font-size:14px; line-height:1.6; text-align:center; font-weight:500;">
    We are here to support you every step of the way. If you have any questions, reply to this email or contact our support team.<br><br>
    Welcome to the community! Your future in project management just got brighter. 
  </p>

  <!-- Social Links -->
  <h2 style="color:#111827; font-size:20px; font-weight:700; text-align:center; margin-top:30px;">Follow Our Journey - Build With Us!</h2>
  <div style="text-align:center; margin:20px 0;">
    <a href="https://www.instagram.com/the_pm_society" target="_blank" style="margin:0 8px;">
      <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" width="28" style="display:inline-block;">
    </a>
    <a href="https://www.linkedin.com/company/the-pm-society-inc" target="_blank" style="margin:0 8px;">
      <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" width="28" style="display:inline-block;">
    </a>
    <a href="https://www.tiktok.com/@the_pm_society" target="_blank" style="margin:0 8px;">
      <img src="https://cdn-icons-png.flaticon.com/512/3046/3046125.png" alt="TikTok" width="28" style="display:inline-block;">
    </a>
  </div>

  <!-- Footer -->
  <div style="padding:16px; text-align:center; border-top:1px solid #e5e7eb; background:#F9F9F9;">
    <p style="color:#6b7280; font-size:12px; margin:0;">© 2025 PM Society. All rights reserved.</p>
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
