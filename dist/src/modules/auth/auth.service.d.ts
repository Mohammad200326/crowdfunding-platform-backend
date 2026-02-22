import { DatabaseService } from '../database/database.service';
import type { registerDonorDTO } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { DonorService } from '../donor/donor.service';
import { OtpService } from './otp.service';
import { EmailService } from './email.service';
import { LoginDTO } from './dto/auth.dto';
import { RegisterCampaignCreatorFormDTO } from './dto/register-campaign-creator.schema';
import { CampaignCreatorService } from '../campaign-creator/campaign-creator.service';
import { FileService } from '../file/file.service';
export declare class AuthService {
    private userService;
    private donorService;
    private databaseService;
    private jwtService;
    private readonly otpService;
    private readonly emailService;
    private readonly campaignCreatorService;
    private readonly fileService;
    constructor(userService: UserService, donorService: DonorService, databaseService: DatabaseService, jwtService: JwtService, otpService: OtpService, emailService: EmailService, campaignCreatorService: CampaignCreatorService, fileService: FileService);
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
    registerCampaignCreatorForm(dto: RegisterCampaignCreatorFormDTO, files: {
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
}
