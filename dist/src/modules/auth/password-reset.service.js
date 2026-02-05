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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordResetService = void 0;
const common_1 = require("@nestjs/common");
const otp_service_1 = require("./otp.service");
const user_service_1 = require("../user/user.service");
const crypto_1 = require("crypto");
const auth_service_1 = require("./auth.service");
const ioredis_1 = __importDefault(require("ioredis"));
const redis_provider_1 = require("../../lib/redis.provider");
let PasswordResetService = class PasswordResetService {
    userService;
    otpService;
    authService;
    redis;
    RESET_TOKEN_TTL = 15 * 60;
    PURPOSE = 'forgot_password';
    constructor(userService, otpService, authService, redis) {
        this.userService = userService;
        this.otpService = otpService;
        this.authService = authService;
        this.redis = redis;
    }
    async forgot(emailRaw) {
        const email = emailRaw.trim().toLowerCase();
        console.log('verify email:', email);
        const user = await this.userService.findByEmail(email);
        console.log('user found?', !!user);
        if (user) {
            await this.otpService.sendOtp(email, this.PURPOSE);
        }
        return { message: 'If the email exists, an OTP has been sent.' };
    }
    async verify(emailRaw, otp) {
        const email = emailRaw.trim().toLowerCase();
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new common_1.BadRequestException('Invalid OTP or email');
        }
        try {
            await this.otpService.verifyOtp(email, this.PURPOSE, otp);
        }
        catch (e) {
            const code = e instanceof Error ? e?.message : 'OTP_INVALID';
            if (code === 'OTP_EXPIRED')
                throw new common_1.BadRequestException('OTP expired');
            throw new common_1.BadRequestException('OTP invalid');
        }
        const resetToken = (0, crypto_1.randomUUID)();
        const key = this.resetTokenKey(resetToken);
        await this.redis.set(key, user.id, 'EX', this.RESET_TOKEN_TTL);
        return { resetToken, expiresIn: this.RESET_TOKEN_TTL };
    }
    async reset(resetToken, newPassword) {
        const token = resetToken.trim();
        if (!newPassword || newPassword.length < 8) {
            throw new common_1.BadRequestException('Password must be at least 8 characters');
        }
        const key = this.resetTokenKey(token);
        const userId = await this.redis.get(key);
        if (!userId) {
            throw new common_1.BadRequestException('Reset token invalid or expired');
        }
        await this.redis.del(key);
        const passwordHash = await this.authService.hashPassword(newPassword);
        await this.userService.update(userId, { password: passwordHash });
        return { message: 'Password reset successfully' };
    }
    resetTokenKey(token) {
        return `pwdreset:token:${token}`;
    }
};
exports.PasswordResetService = PasswordResetService;
exports.PasswordResetService = PasswordResetService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, common_1.Inject)(redis_provider_1.REDIS)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        otp_service_1.OtpService,
        auth_service_1.AuthService,
        ioredis_1.default])
], PasswordResetService);
//# sourceMappingURL=password-reset.service.js.map