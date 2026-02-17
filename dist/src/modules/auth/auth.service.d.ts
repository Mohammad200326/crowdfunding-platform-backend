import { DatabaseService } from '../database/database.service';
import type { registerDonorDTO } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { DonorService } from '../donor/donor.service';
import { OtpService } from './otp.service';
import { EmailService } from './email.service';
import { LoginDTO } from './dto/auth.dto';
import { RegisterCampaignCreatorDTO } from './dto/register-campaign-creator.schema';
export declare class AuthService {
    private userService;
    private donorService;
    private databaseService;
    private jwtService;
    private readonly otpService;
    private readonly emailService;
    constructor(userService: UserService, donorService: DonorService, databaseService: DatabaseService, jwtService: JwtService, otpService: OtpService, emailService: EmailService);
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
    registerCampaignCreator(dto: RegisterCampaignCreatorDTO): Promise<{
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
    hashPassword(password: string): Promise<string>;
    verifyPassword(password: string, hashedPassword: string): Promise<boolean>;
    private generateJwtToken;
    forgotPassword(email: string): Promise<{
        expiresIn: number;
    }>;
}
