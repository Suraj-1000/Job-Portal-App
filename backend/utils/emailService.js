import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD // Use App Password for Gmail
    }
});

// Verify transporter configuration
transporter.verify((error, success) => {
    if (error) {
        console.error('Email service configuration error:', error);
    } else {
        console.log('✓ Email service is ready to send messages');
    }
});

// Send OTP email
export const sendOTPEmail = async (email, otp, type = 'login') => {
    try {
        // Check if email credentials are configured
        if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
            console.error('Email credentials not configured in .env file');
            throw new Error('Email service not configured. Please add EMAIL_USER and EMAIL_APP_PASSWORD to .env file');
        }

        const subject = type === 'login'
            ? 'Your Login OTP Code'
            : type === 'signup'
                ? 'Your Signup Verification OTP Code'
                : 'Your Password Reset OTP Code';

        let htmlContent;
        if (type === 'login') {
            htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">Login OTP Code</h2>
          <p>Your OTP code for login is:</p>
          <div style="background: #f7fafc; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <h1 style="color: #3b82f6; font-size: 32px; letter-spacing: 8px; margin: 0;">${otp}</h1>
          </div>
          <p style="color: #718096;">This code will expire in 10 minutes.</p>
          <p style="color: #718096; font-size: 12px;">If you didn't request this code, please ignore this email.</p>
        </div>
      `;
        } else if (type === 'signup') {
            htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">Signup Verification OTP Code</h2>
          <p>Thank you for signing up! Your verification OTP code is:</p>
          <div style="background: #f7fafc; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <h1 style="color: #3b82f6; font-size: 32px; letter-spacing: 8px; margin: 0;">${otp}</h1>
          </div>
          <p style="color: #718096;">Enter this code to complete your registration. This code will expire in 10 minutes.</p>
          <p style="color: #718096; font-size: 12px;">If you didn't request this code, please ignore this email.</p>
        </div>
      `;
        } else {
            htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">Password Reset OTP Code</h2>
          <p>You requested to reset your password. Your OTP code is:</p>
          <div style="background: #f7fafc; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <h1 style="color: #3b82f6; font-size: 32px; letter-spacing: 8px; margin: 0;">${otp}</h1>
          </div>
          <p style="color: #718096;">This code will expire in 10 minutes.</p>
          <p style="color: #718096; font-size: 12px;">If you didn't request a password reset, please ignore this email.</p>
        </div>
      `;
        }

        const mailOptions = {
            from: `"ProManage System" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: subject,
            html: htmlContent
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✓ OTP email sent successfully to:', email);
        console.log('  Message ID:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('✗ Error sending OTP email:', error);
        if (error.message.includes('not configured')) {
            throw error;
        }
        throw new Error(`Failed to send OTP email: ${error.message}`);
    }
};

// Send credentials email to primary email
export const sendCredentialsEmail = async (primaryEmail, email, password, firstName, lastName, role) => {
    try {
        // Check if email credentials are configured
        if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
            console.error('Email credentials not configured in .env file');
            throw new Error('Email service not configured. Please add EMAIL_USER and EMAIL_APP_PASSWORD to .env file');
        }

        const roleName = role === 'admin' ? 'Admin' : 'Staff';
        const subject = `Your ${roleName} Account Credentials - ProManage System`;

        const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">ProManage System</h1>
        </div>
        <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
          <h2 style="color: #1f2937; margin-top: 0;">Welcome, ${firstName} ${lastName}!</h2>
          <p style="color: #4b5563; line-height: 1.6;">Your ${roleName} account has been created successfully. Below are your login credentials:</p>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
            <p style="margin: 0 0 10px 0; color: #374151; font-weight: 600;">Login Email:</p>
            <p style="margin: 0 0 20px 0; color: #1f2937; font-size: 16px; font-family: monospace; background: white; padding: 10px; border-radius: 4px;">${email}</p>
            
            <p style="margin: 0 0 10px 0; color: #374151; font-weight: 600;">Password:</p>
            <p style="margin: 0; color: #1f2937; font-size: 16px; font-family: monospace; background: white; padding: 10px; border-radius: 4px;">${password}</p>
          </div>

          <div style="background: #eff6ff; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
            <p style="margin: 0; color: #1e40af; font-size: 14px;">
              <strong>⚠️ Important:</strong> Please change your password after your first login for security purposes.
            </p>
          </div>

          <p style="color: #4b5563; line-height: 1.6; margin-bottom: 0;">You can now log in to the ProManage System using the credentials above.</p>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="${process.env.FRONTEND_URI || 'http://localhost:5173'}/login" 
               style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600;">
              Login to System
            </a>
          </div>

          <p style="color: #9ca3af; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            If you didn't expect this email, please contact your system administrator immediately.
          </p>
        </div>
      </div>
    `;

        const mailOptions = {
            from: `"ProManage System" <${process.env.EMAIL_USER}>`,
            to: primaryEmail,
            subject: subject,
            html: htmlContent
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✓ Credentials email sent successfully to:', primaryEmail);
        console.log('  Message ID:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('✗ Error sending credentials email:', error);
        if (error.message.includes('not configured')) {
            throw error;
        }
        throw new Error(`Failed to send credentials email: ${error.message}`);
    }
};

export default transporter;

