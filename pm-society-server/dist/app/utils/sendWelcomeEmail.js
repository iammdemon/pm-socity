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
    return __awaiter(this, arguments, void 0, function* ({ to, userName, email, packageType, }) {
        const htmlContent = `
<div style="max-width: 600px; margin: 0 auto; background: #FCF4F0; border-radius: 14px;  overflow: hidden;">
    
    <!-- Header -->
    <div style="padding: 28px; text-align: center; display:flex; justify-content:space-between; align-items:center">
        <img src="https://thepmsociety.com/logo.png" width="100px" height="auto">
      <p style="font-weight:700; font-size: 20px"> A Society Built on Collaboration</p>
    </div>
    <div style="border: 1px solid black"></div>
    
    <!-- Main Content -->
    <div style="padding:20px;">
      <h1 style="color: #111827; font-size: 30px; text-align:center; font-weight: 800; ">
        Your Journey Starts Here!
      </h1>
      
      <div style="text-align:center">
          <img src="https://thepmsociety.com/image/interview.webp" width="400" height="auto" style="border-radius:500px 500px 0px 0px; ">
             <p style="color: black; text-align:center; font-size: 18px; font-weight:500; line-height: 1.5; padding: 0 10px">
       We’re thrilled to welcome you to <strong>The PM Society! </strong> You’ve taken the first step toward advancing your project management career — we are honored to be apart of your journey!
      </p>
      </div>
      
      
      
   
      
      <!-- Details Box -->
      <div style="background: #EBEBEB; border-radius: 10px; padding: 20px; margin: 0 0 28px 0;">
        <h3 style="color: #111827; font-size: 16px; font-weight: 600; margin: 0 0 14px 0;">ENROLLMENT DETAILS</h3>
      
         <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
          <span style="color: #6b7280; font-size: 14px;">Name:</span>
          <strong>${userName}</strong>
        </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
          <span style="color: #6b7280; font-size: 14px;">Email:</span>
          <strong style="color: #111827; font-size: 14px;">${email}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
          <span style="color: #6b7280; font-size: 14px;">Package:</span>
          <strong style="color: #111827; font-size: 14px;">${packageType}</strong>
        </div>
       
      
      </div>
      
      <!-- CTA Button -->
    
      
      <p style="color:black; font-size: 14px; line-height: 1.6;text-align:center; font-weight:500;">
      We are here to support you every step of the way. If you have any questions, reply to this email or contact our support team. 

Welcome to the community! Your future in project management just got brighter. 
      </p>
<div style="text-align: center; margin: 24px 0;">
  <a href="https://thepmsociety.com" 
     style="
       display: inline-block;
       min-width: 160px;
       background: transparent;
       color: #111827;
       font-weight: 600;
       font-size: 15px;
       padding: 12px 24px;
       text-decoration: none;
       text-align: center;
       border-radius: 9999px;
       border: 1px solid #111827;
       transition: all 0.2s ease-in-out;
     "
     onmouseover="this.style.backgroundColor='#111827'; this.style.color='#ffffff'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.15)';"
     onmouseout="this.style.backgroundColor='transparent'; this.style.color='#111827'; this.style.boxShadow='none';"
  >
    Explore
  </a>
</div>

      
     
    </div>
    <div>
         <h1 style="color: #111827; font-size: 24px; text-align:center; font-weight: 700; ">
       Follow Our Journey - Build With Us!
      </h1>
      <div style="text-align: center; margin: 32px 0;">
  <!-- Instagram -->
  <a href="https://www.instagram.com/the_pm_society" target="_blank" style="margin: 0 8px; text-decoration: none;">
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24" style="color:#000000;">
      <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.2 2.3.4.6.2 1 .5 1.5 1s.8.9 1 1.5c.2.4.3 1.1.4 2.3.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.9-.4 2.3-.2.6-.5 1-1 1.5s-.9.8-1.5 1c-.4.2-1.1.3-2.3.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.2-2.3-.4-.6-.2-1-.5-1.5-1s-.8-.9-1-1.5c-.2-.4-.3-1.1-.4-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.9.4-2.3.2-.6.5-1 1-1.5s.9-.8 1.5-1c.4-.2 1.1-.3 2.3-.4C8.4 2.2 8.8 2.2 12 2.2m0-2.2C8.7 0 8.3 0 7 .1 5.7.2 4.8.4 4.1.7c-.9.3-1.7.8-2.4 1.5C.9 3 .4 3.8.1 4.7c-.3.7-.5 1.6-.6 2.9C-.6 9 0 9.3 0 12s0 3 .1 4.3c.1 1.3.3 2.2.6 2.9.3.9.8 1.7 1.5 2.4.7.7 1.5 1.2 2.4 1.5.7.3 1.6.5 2.9.6C9 24.6 9.3 24 12 24s3 0 4.3-.1c1.3-.1 2.2-.3 2.9-.6.9-.3 1.7-.8 2.4-1.5.7-.7 1.2-1.5 1.5-2.4.3-.7.5-1.6.6-2.9.1-1.3.1-1.7.1-4.3s0-3-.1-4.3c-.1-1.3-.3-2.2-.6-2.9-.3-.9-.8-1.7-1.5-2.4-.7-.7-1.5-1.2-2.4-1.5-.7-.3-1.6-.5-2.9-.6C15 0 14.7 0 12 0z"/>
      <path d="M12 5.8A6.2 6.2 0 1 0 18.2 12 6.2 6.2 0 0 0 12 5.8zm0 10.2a4 4 0 1 1 4-4 4 4 0 0 1-4 4z"/>
      <circle cx="18.4" cy="5.6" r="1.4"/>
    </svg>
  </a>

  <!-- LinkedIn -->
  <a href="https://www.linkedin.com/company/the-pm-society-inc" target="_blank" style="margin: 0 8px; text-decoration: none;">
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24" style="color:#000000;">
      <path d="M20.447 20.452H17.2v-5.569c0-1.327-.027-3.037-1.85-3.037-1.852 0-2.136 1.445-2.136 2.939v5.667h-3.248V9h3.121v1.561h.045c.435-.824 1.496-1.694 3.075-1.694 3.29 0 3.896 2.165 3.896 4.977v6.608zM5.337 7.433c-1.04 0-1.884-.846-1.884-1.887 0-1.04.844-1.885 1.884-1.885 1.041 0 1.886.845 1.886 1.885 0 1.041-.845 1.887-1.886 1.887zM6.882 20.452H3.791V9h3.091v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
    </svg>
  </a>

  <!-- TikTok -->
  <a href="https://www.tiktok.com/@the_pm_society" target="_blank" style="margin: 0 8px; text-decoration: none;">
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24" style="color:#000000;">
      <path d="M12.02 2.04c1.17.01 2.32-.02 3.48.01.08 1.2.55 2.39 1.35 3.29.85.96 2.1 1.49 3.36 1.63v3.42c-1.17-.04-2.35-.34-3.39-.93-.46-.26-.87-.58-1.28-.9-.01 2.92.01 5.84-.01 8.76-.05 1.15-.49 2.28-1.18 3.19-.78 1.03-1.94 1.74-3.18 2-1.29.28-2.7.15-3.89-.49-1.18-.63-2.12-1.72-2.55-2.99-.45-1.33-.42-2.82.11-4.11.52-1.32 1.56-2.42 2.85-3.02 1.15-.54 2.5-.66 3.73-.38.02 1.21-.04 2.41-.05 3.62-.82-.26-1.77-.11-2.47.4-.67.48-1.07 1.32-1.03 2.14-.02.9.52 1.8 1.34 2.2.84.42 1.93.28 2.62-.38.42-.4.65-.97.67-1.55.05-2.9.01-5.79.02-8.68-.01-1.03.01-2.07-.01-3.1z"/>
    </svg>
  </a>
</div>

    </div>
    
    <!-- Footer -->
    <div style=" padding: 16px; text-align: center; border-top: 1px solid #e5e7eb;">
      <p style="color: black; font-size: 14px; margin: 0;">
        © 2025 PM Society. All rights reserved.
      </p>
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
