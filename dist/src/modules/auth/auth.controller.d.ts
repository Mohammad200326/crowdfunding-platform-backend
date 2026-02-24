import { AuthService } from './auth.service';
import { PasswordResetService } from './password-reset.service';
import type { ForgotPasswordDTO, ResetPasswordDTO, VerifyOtpDTO, LoginDTO, registerDonorDTO } from './dto/auth.dto';
import type { RegisterCampaignCreatorFormDTO } from './dto/register-campaign-creator.schema';
export declare class AuthController {
    private authService;
    private passwordResetService;
    constructor(authService: AuthService, passwordResetService: PasswordResetService);
    registerDonor(registerDonorDto: registerDonorDTO): Promise<{
        user: {
            donorProfile: null;
            email: string;
            id: string;
            firstName: string;
            lastName: string;
            dateOfBirth: Date | null;
            role: import("@prisma/client").$Enums.UserRole;
            country: string | null;
            phoneNumber: string | null;
            notes: string | null;
            isDeleted: boolean;
            isVerified: boolean;
            createdAt: Date;
            updatedAt: Date;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
        };
        token: string;
    }>;
    registerCampaignCreator(dto: RegisterCampaignCreatorFormDTO, files: {
        avatar?: Express.Multer.File[];
        registrationCertificate?: Express.Multer.File[];
        commercialLicense?: Express.Multer.File[];
        representativeIdPhoto?: Express.Multer.File[];
        commissionerImage?: Express.Multer.File[];
        authorizationLetter?: Express.Multer.File[];
    }): Promise<{
        token: string;
        userData: {
            type: "INDIVIDUAL" | "INSTITUTION";
            creatorProfile: {
                id: string;
            } | null;
            preferences: import("@prisma/client").$Enums.CampaignCategory[];
            email: string;
            id: string;
            firstName: string;
            lastName: string;
            dateOfBirth: Date | null;
            role: import("@prisma/client").$Enums.UserRole;
            country: string | null;
            phoneNumber: string | null;
            notes: string | null;
            isVerified: boolean;
            createdAt: Date;
            updatedAt: Date;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
        };
    }>;
    login(dto: LoginDTO): Promise<{
        user: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            role: import("@prisma/client").$Enums.UserRole;
            country: string | null;
        };
        token: string;
    }>;
    forgot(forgotPasswordDTO: ForgotPasswordDTO): Promise<{
        expiresIn: number;
        message?: undefined;
    } | {
        message: string;
        expiresIn?: undefined;
    }>;
    verifyOTP(verifyOTPSchema: VerifyOtpDTO): Promise<{
        resetToken: `${string}-${string}-${string}-${string}-${string}`;
        expiresIn: number;
    }>;
    reset(resetPasswordDTO: ResetPasswordDTO): Promise<{
        message: string;
    }>;
}
