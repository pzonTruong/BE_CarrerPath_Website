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
  const subject = 'Nhac nho hoc tap - Tiep tuc lo trinh cua ban';
  const dashboardUrl = `${env.clientUrl}/dashboard`;
  const html = `
    <div style="margin:0;padding:0;background-color:#f4f4f5;font-family:Arial,sans-serif;">
      <div style="max-width:560px;margin:0 auto;padding:24px 16px;">
        <div style="background-color:#ffffff;border:1px solid #e4e4e7;border-radius:14px;padding:24px;">
          <p style="margin:0 0 8px;font-size:12px;color:#71717a;letter-spacing:0.08em;text-transform:uppercase;font-weight:bold;">
            Career Path System
          </p>
          <h2 style="margin:0 0 16px;font-size:22px;color:#18181b;">Hay quay lai tiep tuc hoc tap, ${userName}!</h2>
          <p style="margin:0 0 16px;font-size:14px;color:#3f3f46;line-height:1.6;">
            Chung toi nhan thay da mot thoi gian ban chua quay lai tham gia cac hoat dong hoc tap tren he thong.
          </p>
          <p style="margin:0 0 16px;font-size:14px;color:#3f3f46;line-height:1.6;">
            Viec duy tri thoi quen hoc tap deu dan, du chi 15-30 phut moi ngay, la yeu to quyet dinh giup ban lam chu kien thuc va nhanh chong dat duoc muc tieu nghe nghiep da de ra.
          </p>
          <p style="margin:0 0 24px;font-size:14px;color:#3f3f46;line-height:1.6;">
            Hay bat dau lai ngay hom nay bang cach tiep tuc cac bai hoc dang do hoac thuc hien cac bai kiem tra nang luc tiep theo.
          </p>
          <div style="margin:0 0 24px;text-align:center;">
            <a href="${dashboardUrl}" style="display:inline-block;padding:12px 28px;font-size:14px;font-weight:600;color:#ffffff;background-color:#4f46e5;text-decoration:none;border-radius:8px;">Quay lai Hoc tap</a>
          </div>
          <p style="margin:0 0 8px;font-size:13px;color:#52525b;">Hoac sao chep duong dan duoi day vao trinh duyet cua ban:</p>
          <p style="margin:0 0 24px;font-size:13px;color:#4f46e5;word-break:break-all;">${dashboardUrl}</p>
          <p style="margin:0;font-size:12px;color:#a1a1aa;border-top:1px solid #e4e4e7;padding-top:16px;text-align:center;">
            Day la thong bao tu dong tu he thong. Vui long khong tra loi email nay.
          </p>
        </div>
      </div>
    </div>
  `;
  await sendEmail(userEmail, subject, html);
};
