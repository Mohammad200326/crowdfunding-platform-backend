export declare class EmailService {
    private readonly apiKey;
    private readonly from;
    constructor();
    sendOtp(email: string, otp: string): Promise<{
        success: boolean;
        sentTo: string;
        message: string;
    }>;
    private otpTemplate;
}
