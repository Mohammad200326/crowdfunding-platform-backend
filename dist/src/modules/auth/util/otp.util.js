"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOtp = generateOtp;
exports.hashOtp = hashOtp;
const crypto_1 = __importDefault(require("crypto"));
function generateOtp(length = 5) {
    const n = crypto_1.default.randomInt(0, 10 ** length);
    return n.toString().padStart(length, '0');
}
function hashOtp(otp) {
    return crypto_1.default
        .createHmac('sha256', process.env.OTP_SECRET)
        .update(otp)
        .digest('hex');
}
//# sourceMappingURL=otp.util.js.map