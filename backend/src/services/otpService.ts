import nodemailer from 'nodemailer';

export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOTPEmail = async (email: string, otp: string): Promise<boolean> => {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587');
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  // Print OTP clearly to server log for immediate testing
  console.log('\n==================================================');
  console.log(`🔑 [AUTH OTP GENERATED] Email: ${email} | OTP CODE: ${otp}`);
  console.log('==================================================\n');

  if (user && pass && user !== 'test@gmail.com') {
    try {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });

      const mailOptions = {
        from: process.env.SMTP_FROM || '"COETA E-Cell" <noreply@coetaecell.org>',
        to: email,
        subject: '🔒 Your COETA E-Cell Login Verification Code',
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #0f2a11; padding: 40px; color: #f8fafc;">
            <div style="max-width: 500px; margin: 0 auto; background: #1e293b; border-radius: 12px; padding: 30px; border: 1px solid #334155;">
              <h2 style="color: #38bdf8; text-align: center; margin-bottom: 20px;">COETA E-Cell Portal</h2>
              <p style="font-size: 16px; color: #cbd5e1;">Hello,</p>
              <p style="font-size: 15px; color: #94a3b8;">Use the verification code below to log into your account. This code is valid for 10 minutes.</p>
              <div style="text-align: center; margin: 30px 0;">
                <span style="font-size: 36px; font-weight: bold; letter-spacing: 6px; color: #a855f7; background: #0f172a; padding: 12px 24px; border-radius: 8px; border: 1px solid #6b21a8;">
                  ${otp}
                </span>
              </div>
              <p style="font-size: 13px; color: #64748b; text-align: center;">If you did not request this OTP, please ignore this email.</p>
            </div>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log(`[OTP Service] Email successfully dispatched to ${email}`);
      return true;
    } catch (err: any) {
      console.error(`[OTP Service Error] Failed to send email via SMTP:`, err.message);
    }
  }

  return true;
};
