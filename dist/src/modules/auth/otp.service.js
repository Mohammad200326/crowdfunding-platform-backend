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
exports.OtpService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = __importDefault(require("ioredis"));
const redis_provider_1 = require("../../lib/redis.provider");
const otp_util_1 = require("./util/otp.util");
let OtpService = class OtpService {
    redis;
    constructor(redis) {
        this.redis = redis;
    }
    ttl = 300;
    async sendOtp(email, purpose) {
        const otp = (0, otp_util_1.generateOtp)();
        const hash = (0, otp_util_1.hashOtp)(otp);
        const key = `otp:${purpose}:${email.toLowerCase()}`;
        await this.redis.set(key, hash, 'EX', this.ttl);
        console.log('OTP:', otp);
        return { otp, expiresIn: this.ttl };
    }
    async verifyOtp(email, purpose, otp) {
        const key = `otp:${purpose}:${email.toLowerCase()}`;
        const stored = await this.redis.get(key);
        if (!stored)
            throw new Error('OTP_EXPIRED');
        if ((0, otp_util_1.hashOtp)(otp) !== stored)
            throw new Error('OTP_INVALID');
        await this.redis.del(key);
        return true;
    }
};
exports.OtpService = OtpService;
exports.OtpService = OtpService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(redis_provider_1.REDIS)),
    __metadata("design:paramtypes", [ioredis_1.default])
], OtpService);
//# sourceMappingURL=otp.service.js.map