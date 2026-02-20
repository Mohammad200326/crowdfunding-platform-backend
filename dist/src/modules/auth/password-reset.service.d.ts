import { OtpService } from './otp.service';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import Redis from 'ioredis';
import { EmailService } from './email.service';
export declare class PasswordResetService {
    private userService;
    private otpService;
    private authService;
    private emailService;
    private readonly redis;
    private readonly RESET_TOKEN_TTL;
    private readonly PURPOSE;
    constructor(userService: UserService, otpService: OtpService, authService: AuthService, emailService: EmailService, redis: Redis);
    forgot(emailRaw: string): Promise<{
        expiresIn: number;
        message?: undefined;
    } | {
        message: string;
        expiresIn?: undefined;
    }>;
    verify(emailRaw: string, otp: string): Promise<{
        resetToken: `${string}-${string}-${string}-${string}-${string}`;
        expiresIn: number;
    }>;
    reset(resetToken: string, newPassword: string): Promise<{
        message: string;
    }>;
    private resetTokenKey;
}
