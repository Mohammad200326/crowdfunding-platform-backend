// // src/modules/email/email.service.ts
// import { Injectable, InternalServerErrorException } from '@nestjs/common';
// import * as nodemailer from 'nodemailer';

// @Injectable()
// export class EmailService {
//   private transporter: nodemailer.Transporter;

//   constructor() {
//     this.transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST,
//       port: Number(process.env.SMTP_PORT),
//       secure: Number(process.env.SMTP_PORT) === 465,
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//       },
//     });
//   }

//   async sendOtp(email: string, otp: string) {
//     try {
//       await this.transporter.sendMail({
//         from: process.env.SMTP_FROM,
//         to: email,
//         subject: 'Verification Code',
//         html: this.otpTemplate(otp),
//       });

//       return {
//         success: true,
//         sentTo: email,
//         message: 'Verification code sent successfully.',
//       };
//     } catch (error) {
//       console.error('Email error ❌', error);
//       throw new InternalServerErrorException('FAILED_TO_SEND_EMAIL');
//     }
//   }

//   private otpTemplate(otp: string) {
//     return `
//       <div style="font-family: Arial, sans-serif; direction: ltr; text-align: left">
//         <h2>Verification Code</h2>

//         <p>Use the following code to complete your request:</p>

//         <div style="
//           font-size: 28px;
//           font-weight: bold;
//           letter-spacing: 6px;
//           margin: 20px 0;
//         ">
//           ${otp}
//         </div>

//         <p>This code is valid for <strong>5 minutes</strong>.</p>

//         <p style="color: #777; font-size: 12px">
//           If you did not request this code, you can safely ignore this email.
//         </p>
//       </div>
//     `;
//   }
// }

// src/modules/email/email.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';

// type ResendErrorResponse = {
//   message?: string;
//   name?: string;
// };

@Injectable()
export class EmailService {
  private readonly apiKey = process.env.RESEND_API_KEY;
  private readonly from = process.env.EMAIL_FROM;

  constructor() {
    if (!this.apiKey) console.warn('[Email] RESEND_API_KEY is missing');
    if (!this.from) console.warn('[Email] EMAIL_FROM is missing');
  }

  async sendOtp(email: string, otp: string) {
    try {
      if (!this.apiKey || !this.from) {
        console.error('[Email] Missing RESEND_API_KEY or EMAIL_FROM');
        throw new Error('EMAIL_CONFIG_MISSING');
      }

      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: this.from,
          to: [email],
          subject: 'Verification Code',
          html: this.otpTemplate(otp),
        }),
      });

      if (!res.ok) {
        const text = await res.text(); // Resend يرجّع JSON غالبًا، بس نخليه نص لتفادي مشاكل parsing
        console.error('[Resend] send failed:', res.status, text);
        throw new Error('RESEND_FAILED');
      }

      return {
        success: true,
        sentTo: email,
        message: 'Verification code sent successfully.',
      };
    } catch (error) {
      console.error('Email error ❌', error);
      throw new InternalServerErrorException('FAILED_TO_SEND_EMAIL');
    }
  }

  private otpTemplate(otp: string) {
    return `
      <div style="font-family: Arial, sans-serif; direction: ltr; text-align: left">
        <h2>Verification Code</h2>

        <p>Use the following code to complete your request:</p>

        <div style="
          font-size: 28px;
          font-weight: bold;
          letter-spacing: 6px;
          margin: 20px 0;
        ">
          ${otp}
        </div>

        <p>This code is valid for <strong>5 minutes</strong>.</p>

        <p style="color: #777; font-size: 12px">
          If you did not request this code, you can safely ignore this email.
        </p>
      </div>
    `;
  }
}
