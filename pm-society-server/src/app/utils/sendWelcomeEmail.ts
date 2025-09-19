import nodemailer from "nodemailer";
import config from "../config";

const transporter = nodemailer.createTransport({
  host: config.EMAIL_HOST,
  port: Number(config.EMAIL_PORT),
  secure: false,
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS,
  },
});

export default transporter;

interface SendWelcomeEmailOptions {
  to: string;
  userName: string;
  packageType: string;
  subscriptionType: string;
  subscriptionEndDate?: Date; // optional now
}

export async function sendWelcomeEmail({
  to,
  userName,
  packageType,
  subscriptionType,
  subscriptionEndDate,
}: SendWelcomeEmailOptions) {
  const membershipEnds = subscriptionEndDate
    ? new Date(subscriptionEndDate).toLocaleDateString()
    : "N/A"; // fallback if undefined

const htmlContent = `
<div style="font-family: Arial, sans-serif; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 24px;">
  <div style="max-width: 400px; margin: auto; background: white; border-radius: 12px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); overflow: hidden;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 24px; text-align: center;">
      <h1 style="color: white; font-size: 24px; font-weight: bold; margin: 0; letter-spacing: 2px;">PM SOCIETY</h1>
    </div>
    
    <!-- Main Content -->
    <div style="padding: 32px;">
      <h2 style="color: #111827; font-size: 24px; font-weight: bold; margin: 0 0 24px 0; line-height: 1.3;">
        Welcome to PM Society!
      </h2>
      
      <p style="color: #374151; margin: 0 0 16px 0;">
        Hi <strong>${userName}</strong>,
      </p>
      
      <p style="color: #374151; margin: 0 0 24px 0; line-height: 1.6;">
        Thank you for joining PM Society. We're excited to have you on board!
      </p>
      
      <!-- Details Box -->
      <div style="background: #f9fafb; border-radius: 8px; padding: 24px; margin: 0 0 24px 0;">
        <h3 style="color: #111827; font-weight: 600; margin: 0 0 16px 0;">Your Membership Details:</h3>
        <div style="space-y: 12px;">
          
          <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
            <span style="color: #6b7280;">Package:</span>
            <strong style="color: #111827;">${packageType}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
            <span style="color: #6b7280;">Subscription:</span>
            <strong style="color: #111827;">${subscriptionType}</strong>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #6b7280;">Membership Ends:</span>
            <strong style="color: #111827;">${membershipEnds}</strong>
          </div>
        </div>
      </div>
      
      <!-- CTA Button -->
      <a href="https://pmsociety.com/login" style="display: block; width: 100%; background: #dc2626; color: white; font-weight: 600; padding: 12px; border-radius: 8px; text-decoration: none; text-align: center; margin: 0 0 24px 0;">
        GET STARTED
      </a>
      
      <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0 0 16px 0;">
        We're here to help if you need it.For more info  <a href="https://pmsociety.com/connect" style="color: #2563eb; font-weight: 500;">Connect with us</a>.
      </p>
      
      <p style="color: #374151; margin: 0;">
        Best regards,<br />
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

  await transporter.sendMail({
    from: config.EMAIL_FROM,
    to,
    subject: "Welcome to PM Society!",
    html: htmlContent,
  });
}
