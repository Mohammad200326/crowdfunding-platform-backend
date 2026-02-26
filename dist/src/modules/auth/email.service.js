"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
let EmailService = class EmailService {
    apiKey = process.env.RESEND_API_KEY;
    from = process.env.EMAIL_FROM;
    constructor() {
        if (!this.apiKey)
            console.warn('[Email] RESEND_API_KEY is missing');
        if (!this.from)
            console.warn('[Email] EMAIL_FROM is missing');
    }
    async sendOtp(email, otp) {
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
                const text = await res.text();
                console.error('[Resend] send failed:', res.status, text);
                throw new Error('RESEND_FAILED');
            }
            return {
                success: true,
                sentTo: email,
                message: 'Verification code sent successfully.',
            };
        }
        catch (error) {
            console.error('Email error ❌', error);
            throw new common_1.InternalServerErrorException('FAILED_TO_SEND_EMAIL');
        }
    }
    otpTemplate(otp) {
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
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EmailService);
//# sourceMappingURL=email.service.js.map