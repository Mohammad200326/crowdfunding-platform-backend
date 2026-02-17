import Redis from 'ioredis';
export declare class OtpService {
    private readonly redis;
    constructor(redis: Redis);
    private ttl;
    sendOtp(email: string, purpose: string): Promise<{
        otp: string;
        expiresIn: number;
    }>;
    verifyOtp(email: string, purpose: string, otp: string): Promise<boolean>;
}
