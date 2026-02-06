export declare class EmailService {
    private transporter;
    constructor();
    sendOtp(email: string, otp: string): Promise<{
        success: boolean;
        sentTo: string;
        message: string;
    }>;
    private otpTemplate;
}
