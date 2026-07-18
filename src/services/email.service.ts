import nodemailer from 'nodemailer';
import { env } from '../config/env';

const isSmtpConfigured = Boolean(env.smtpHost && env.smtpUser && env.smtpPass && env.emailFrom);

const transporter = nodemailer.createTransport({
  host: env.smtpHost,
  port: env.smtpPort,
  secure: env.smtpSecure,
  auth: {
    user: env.smtpUser,
    pass: env.smtpPass
  }
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  if (!isSmtpConfigured) {
    const previewText = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    console.warn(`[email skipped] ${subject} -> ${to}: ${previewText}`);
    return;
  }

  await transporter.sendMail({ from: env.emailFrom, to, subject, html });
};

export const sendOtpEmail = async (to: string, otp: string) => {
  const expiresInMinutes = env.otpExpiresMinutes;
  await sendEmail(
    to,
    'Verify your email - OTP code',
    `
      <div style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,sans-serif;">
        <div style="max-width:560px;margin:0 auto;padding:24px 16px;">
          <div style="background:#ffffff;border:1px solid #e4e4e7;border-radius:14px;padding:24px;">
            <p style="margin:0 0 8px;font-size:12px;color:#71717a;letter-spacing:0.08em;text-transform:uppercase;">
              MERN Auth Starter
            </p>
            <h2 style="margin:0 0 10px;font-size:22px;color:#18181b;">Email Verification OTP</h2>
            <p style="margin:0 0 16px;font-size:14px;color:#3f3f46;line-height:1.6;">
              Use this OTP to verify your account. This code is valid for ${expiresInMinutes} minutes.
            </p>
            <div style="margin:0 0 18px;padding:14px;border-radius:12px;background:#faf5ff;border:1px dashed #a855f7;text-align:center;">
              <span style="font-size:30px;font-weight:700;letter-spacing:0.35em;color:#6d28d9;">${otp}</span>
            </div>
            <p style="margin:0 0 8px;font-size:13px;color:#52525b;">If you did not request this OTP, please ignore this email.</p>
            <p style="margin:0;font-size:12px;color:#a1a1aa;">For security, never share this OTP with anyone.</p>
          </div>
        </div>
      </div>
    `
  );
};

export const sendResetTokenEmail = async (to: string, token: string) => {
  await sendEmail(
    to,
    'Password reset token',
    `<p>Your reset token is <b>${token}</b>. It expires in ${env.resetTokenExpiresMinutes} minutes.</p>`
  );
};

export const sendReminderEmail = async (userEmail: string, userName: string) => {
  const subject = 'Nhắc nhở học tập - Tiếp tục lộ trình của bạn';
  const dashboardUrl = `${env.clientUrl}/dashboard`;
  const html = `
    <div style="margin:0;padding:0;background-color:#f4f4f5;font-family:Arial,sans-serif;">
      <div style="max-width:560px;margin:0 auto;padding:24px 16px;">
        <div style="background-color:#ffffff;border:1px solid #e4e4e7;border-radius:14px;padding:24px;">
          <p style="margin:0 0 8px;font-size:12px;color:#71717a;letter-spacing:0.08em;text-transform:uppercase;font-weight:bold;">
            Career Path System
          </p>
          <h2 style="margin:0 0 16px;font-size:20px;color:#18181b;">Chào ${userName},</h2>
          <p style="margin:0 0 16px;font-size:14px;color:#3f3f46;line-height:1.6;">
            Đã lâu bạn chưa quay lại học tập. Hãy dành ít phút mỗi ngày để tiếp tục lộ trình và hoàn thành mục tiêu nghề nghiệp của mình nhé!
          </p>
          <div style="margin:24px 0;text-align:center;">
            <a href="${dashboardUrl}" style="display:inline-block;padding:12px 28px;font-size:14px;font-weight:600;color:#ffffff;background-color:#4f46e5;text-decoration:none;border-radius:8px;">Quay lại Học tập</a>
          </div>
          <p style="margin:0;font-size:12px;color:#a1a1aa;border-top:1px solid #e4e4e7;padding-top:16px;text-align:center;">
            Đây là thông báo tự động từ hệ thống. Vui lòng không trả lời email này.
          </p>
        </div>
      </div>
    </div>
  `;
  await sendEmail(userEmail, subject, html);
};
