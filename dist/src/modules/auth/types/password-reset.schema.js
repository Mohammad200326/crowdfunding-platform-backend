"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordSchema = exports.VerifyOtpSchema = exports.ForgotPasswordSchema = void 0;
const zod_1 = require("zod");
exports.ForgotPasswordSchema = zod_1.z.object({
    email: zod_1.z.string().trim().toLowerCase().email(),
});
exports.VerifyOtpSchema = zod_1.z.object({
    email: zod_1.z.string().trim().toLowerCase().email(),
    otp: zod_1.z
        .string()
        .trim()
        .regex(/^\d{5}$/, 'OTP must be 5 digits'),
});
exports.ResetPasswordSchema = zod_1.z.object({
    resetToken: zod_1.z.string().uuid(),
    password: zod_1.z.string().min(8, 'Password must be at least 8 characters'),
});
//# sourceMappingURL=password-reset.schema.js.map