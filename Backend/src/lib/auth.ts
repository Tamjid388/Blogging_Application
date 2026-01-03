import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: ["http://localhost:3000", "http://localhost:5000"],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "USER",
        input: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      try {
        // Build verification URL
        const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;

        // Send email using Nodemailer
        const info = await transporter.sendMail({
          from: '"Prisma IT" <noreply@prisma-it.com>',
          to: user.email,
          subject: "Verify your email address",
          text: `Hello ${user.name}, please verify your email by visiting: ${verificationUrl}`,
          html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify Your Email</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif; background-color: #f7f7f7;">
          <div style="background-color: #f7f7f7; padding: 40px 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07); overflow: hidden;">
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 40px 20px; text-align: center;">
                <h1 style="margin: 0; color: white; font-size: 28px; font-weight: 700;">Verify Your Email</h1>
              </div>
              
              <!-- Content -->
              <div style="padding: 40px 30px;">
                <p style="margin: 0 0 20px 0; font-size: 16px; color: #1f2937; font-weight: 500;">
                  Hi <strong>${user.name}</strong>,
                </p>
                
                <p style="margin: 0 0 30px 0; font-size: 15px; color: #4b5563; line-height: 1.6;">
                  Welcome to Prisma IT! Thank you for signing up. We're excited to have you join our community. To get started, please verify your email address to complete your registration.
                </p>
                
                <!-- CTA Button -->
                <div style="text-align: center; margin: 40px 0;">
                  <a href="${verificationUrl}" style="display: inline-block; padding: 14px 40px; background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; transition: transform 0.2s ease;">
                    Verify Email Address
                  </a>
                </div>
                
                <!-- Alternative link -->
                <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid #4f46e5;">
                  <p style="margin: 0 0 10px 0; font-size: 13px; color: #6b7280; font-weight: 500;">Can't click the button?</p>
                  <p style="margin: 0; font-size: 13px; color: #4b5563; word-break: break-all;">
                    <a href="${url}" style="color: #4f46e5; text-decoration: none; font-weight: 500;">${verificationUrl}</a>
                  </p>
                </div>
                
                <!-- Footer note -->
                <p style="margin: 30px 0 0 0; font-size: 13px; color: #9ca3af; line-height: 1.6;">
                  If you didn't create an account, you can safely ignore this email. This verification link will expire in 24 hours.
                </p>
              </div>
              
              <!-- Footer -->
              <div style="background-color: #f9fafb; padding: 20px 30px; border-top: 1px solid #e5e7eb; text-align: center;">
                <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                  &copy; 2026 Prisma IT. All rights reserved.<br/>
                  <a href="https://example.com" style="color: #4f46e5; text-decoration: none;">Visit our website</a>
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
        });
      } catch (error) {
        console.error("Error Sending Verification email");
        throw error;
      }
    },
  },
  socialProviders:{
 google: {
   accessType: "offline", 
      prompt: "select_account consent",
    clientId: process.env.OAuth_Client_Id as string,
    clientSecret: process.env.OAuth_Client_Secret as string,
  },
  }
 
});
