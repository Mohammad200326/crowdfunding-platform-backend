import { AuthService } from './auth.service';
import { PasswordResetService } from './password-reset.service';
import type { ForgotPasswordDTO, ResetPasswordDTO, VerifyOtpDTO, LoginDTO, registerDonorDTO } from './dto/auth.dto';
import type { RegisterCampaignCreatorDTO } from './dto/register-campaign-creator.schema';
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
    newRegisterCampaignCreator(dto: RegisterCampaignCreatorDTO): Promise<{
        token: string;
        userData: {
            type: "INDIVIDUAL" | "INSTITUTION";
            creatorProfile: {
                type: import("@prisma/client").$Enums.CreatorType;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                institutionName: string;
                institutionType: string;
                institutionCountry: string;
                institutionDateOfEstablishment: Date;
                institutionLegalStatus: string;
                institutionTaxIdentificationNumber: string;
                institutionRegistrationNumber: string;
                institutionRepresentativeName: string;
                institutionRepresentativePosition: string;
                institutionRepresentativeRegistrationNumber: string;
                institutionWebsite: string;
                institutionRepresentativeSocialMedia: string;
                stripeAccountId: string | null;
            } | null;
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
    }>;
    verifyOTP(verifyOTPSchema: VerifyOtpDTO): Promise<{
        resetToken: `${string}-${string}-${string}-${string}-${string}`;
        expiresIn: number;
    }>;
    reset(resetPasswordDTO: ResetPasswordDTO): Promise<{
        message: string;
    }>;
}
