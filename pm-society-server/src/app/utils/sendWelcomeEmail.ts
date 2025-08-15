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
  subscriptionEndDate: Date;
}

export async function sendWelcomeEmail({
  to,
  userName,
  packageType,
  subscriptionType,
  subscriptionEndDate,
}: SendWelcomeEmailOptions) {
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

  await transporter.sendMail({
    from: config.EMAIL_FROM,
    to,
    subject: "Welcome to PM Society!",
    html: htmlContent,
  });
}
