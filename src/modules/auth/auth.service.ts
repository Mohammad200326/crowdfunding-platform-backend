import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon from 'argon2';
import { DatabaseService } from '../database/database.service';
import type { registerDonorDTO } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { AssetKind, Prisma, UserRole } from '@prisma/client';
import { UserService } from '../user/user.service';
import { DonorService } from '../donor/donor.service';
import { OtpService } from './otp.service';
import { EmailService } from './email.service';
import { LoginDTO } from './dto/auth.dto';
import { RegisterCampaignCreatorFormDTO } from './dto/register-campaign-creator.schema';
import { CampaignCreatorService } from '../campaign-creator/campaign-creator.service';
import { FileService } from '../file/file.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private donorService: DonorService,
    private databaseService: DatabaseService,
    private jwtService: JwtService,
    private readonly otpService: OtpService,
    private readonly emailService: EmailService,
    private readonly campaignCreatorService: CampaignCreatorService,
    private readonly fileService: FileService,
  ) {}

  // LOGIN
  async login(dto: LoginDTO) {
    // Find User by email
    const user = await this.databaseService.user.findUnique({
      where: { email: dto.email },
    });

    // Validate (Generic error for safety)
    if (!user || !(await this.verifyPassword(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate Token
    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(payload);

    return {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        country: user.country,
      },
      token,
    };
  }

  async registerDonor(registerDonorDto: registerDonorDTO) {
    // Check if email already exists
    const existingUser = await this.userService.findByEmail(
      registerDonorDto.email,
    );
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const { password, donorProfile, ...userData } = registerDonorDto;

    // Use transaction to create user and donor profile
    const result = await this.databaseService.$transaction(async (tx) => {
      // Create user using user.service
      const user = await this.userService.createUserForRegistration(
        { ...userData, password },
        UserRole.DONOR,
        tx,
      );

      // Create donor profile using donor.service
      const profile = await this.donorService.createDonorProfile(
        user.id,
        donorProfile,
        tx,
      );

      return {
        ...user,
        donorProfile: profile,
      };
    });

    // Generate JWT token
    const token = this.generateJwtToken(result.id, UserRole.DONOR);

    // Map user and include donorProfile based on whether custom data was provided
    const userWithoutPassword = this.userService.mapUserWithoutPassword(result);

    // If custom data was provided, show all profile data, otherwise show only id and userId
    let donorProfileResponse = null;
    if (result.donorProfile) {
      const { hasCustomData, ...profileData } = result.donorProfile as any;
      donorProfileResponse = hasCustomData
        ? profileData
        : { id: profileData.id, userId: profileData.userId };
    }

    return {
      user: {
        ...userWithoutPassword,
        donorProfile: donorProfileResponse,
      },
      token,
    };
  }

  // async registerCampaignCreator(dto: RegisterCampaignCreatorDTO) {
  //   const email = dto.email.trim().toLowerCase();

  //   const existing = await this.databaseService.user.findUnique({
  //     where: { email },
  //     select: { id: true },
  //   });
  //   if (existing) throw new ConflictException('Email already exists');

  //   const hashedPassword = await this.hashPassword(dto.password);
  //   const notes = dto.notes ?? null;

  //   const { creatorProfile, type } = dto;

  //   const result = await this.databaseService.$transaction(async (tx) => {
  //     // 1) create user (always unverified at signup per new plan)
  //     const user = await tx.user.create({
  //       data: {
  //         firstName: dto.firstName,
  //         lastName: dto.lastName,
  //         email,
  //         password: hashedPassword,
  //         phoneNumber: dto.phoneNumber,
  //         dateOfBirth: dto.dateOfBirth,
  //         country: dto.country,
  //         notes: notes,
  //         role: UserRole.CAMPAIGN_CREATOR,
  //         isVerified: false,
  //         verificationStatus: 'pending',
  //       },
  //     });

  //     // 2) create profile only if provided now
  //     const profile = creatorProfile
  //       ? await tx.campaignCreator.create({
  //           data: {
  //             userId: user.id,
  //             type, // INDIVIDUAL or INSTITUTION (outer type)
  //             ...creatorProfile, // institution fields (if you allow them)
  //           },
  //         })
  //       : null;

  //     return { user, profile };
  //   });

  //   const token = this.generateJwtToken(result.user.id, result.user.role);

  //   const { password, ...userData } = result.user;

  //   return {
  //     token,
  //     userData: {
  //       ...userData,
  //       type,
  //       creatorProfile: result.profile,
  //     },
  //   };
  // }
  async registerCampaignCreatorForm(
    dto: RegisterCampaignCreatorFormDTO,
    files: {
      avatar?: Express.Multer.File[];
      registrationCertificate?: Express.Multer.File[];
      commercialLicense?: Express.Multer.File[];
      representativeIdPhoto?: Express.Multer.File[];
      commissionerImage?: Express.Multer.File[];
      authorizationLetter?: Express.Multer.File[];
    },
  ) {
    const email = dto.email.trim().toLowerCase();

    const existing = await this.databaseService.user.findUnique({
      where: { email },
      select: { id: true },
    });
    if (existing) throw new ConflictException('Email already exists');

    const hashedPassword = await this.hashPassword(dto.password);
    const notes = dto.notes ?? null;

    const result = await this.databaseService.$transaction(async (tx) => {
      // 1) create user
      const user = await tx.user.create({
        data: {
          firstName: dto.firstName,
          lastName: dto.lastName,
          email,
          password: hashedPassword,
          phoneNumber: dto.phoneNumber ?? null,
          dateOfBirth: dto.dateOfBirth ?? null,
          country: dto.country ?? null,
          notes,
          role: UserRole.CAMPAIGN_CREATOR,
          isVerified: false,
          verificationStatus: 'pending',
        },
      });

      const avatar = files?.avatar?.[0];
      if (avatar) {
        const avatarAsset = this.fileService.createFileAssetData(
          avatar,
          user.id,
          AssetKind.USER_AVATAR,
        );

        await tx.asset.create({
          data: {
            ...avatarAsset,
            userId: user.id,
          },
        });
      }

      // 2) create creator profile (optional) - only if INSTITUTION
      let creator: { id: string } | null = null;

      if (dto.type === 'INSTITUTION') {
        creator = await this.campaignCreatorService.createForUser(
          {
            userId: user.id,
            type: 'INSTITUTION',

            institutionName: dto.institutionName,
            institutionType: dto.institutionType,
            institutionCountry: dto.institutionCountry,
            institutionDateOfEstablishment: dto.institutionDateOfEstablishment,
            institutionLegalStatus: dto.institutionLegalStatus,
            institutionTaxIdentificationNumber:
              dto.institutionTaxIdentificationNumber,
            institutionRegistrationNumber: dto.institutionRegistrationNumber,
            institutionRepresentativeName: dto.institutionRepresentativeName,
            institutionRepresentativePosition:
              dto.institutionRepresentativePosition,
            institutionRepresentativeRegistrationNumber:
              dto.institutionRepresentativeRegistrationNumber,
            institutionWebsite: dto.institutionWebsite,
            institutionRepresentativeSocialMedia:
              dto.institutionRepresentativeSocialMedia,

            // docs will be attached below
          },
          tx,
        );

        // 3) create document assets (all optional)
        const assets: Prisma.AssetUncheckedCreateInput[] = [];

        const regCert = files?.registrationCertificate?.[0];
        const commLic = files?.commercialLicense?.[0];
        const repId = files?.representativeIdPhoto?.[0];
        const commissioner = files?.commissionerImage?.[0];
        const authLetter = files?.authorizationLetter?.[0];

        if (regCert) {
          assets.push(
            this.fileService.createFileAssetData(
              regCert,
              user.id,
              AssetKind.INSTITUTION_REGISTRATION_CERTIFICATE,
            ),
          );
        }
        if (commLic) {
          assets.push(
            this.fileService.createFileAssetData(
              commLic,
              user.id,
              AssetKind.INSTITUTION_COMMERCIAL_LICENSE,
            ),
          );
        }
        if (repId) {
          assets.push(
            this.fileService.createFileAssetData(
              repId,
              user.id,
              AssetKind.INSTITUTION_REPRESENTATIVE_ID_PHOTO,
            ),
          );
        }
        if (commissioner) {
          assets.push(
            this.fileService.createFileAssetData(
              commissioner,
              user.id,
              AssetKind.INSTITUTION_COMMISSIONER_IMAGE,
            ),
          );
        }
        if (authLetter) {
          assets.push(
            this.fileService.createFileAssetData(
              authLetter,
              user.id,
              AssetKind.INSTITUTION_AUTHORIZATION_LETTER,
            ),
          );
        }

        if (assets.length) {
          // اربطها بالـ creatorId
          assets.forEach((a) => (a.creatorId = creator!.id));
          await tx.asset.createMany({ data: assets });
        }
      }

      return { user, creator };
    });

    const token = this.generateJwtToken(result.user.id, result.user.role);
    const { password, ...userData } = result.user;

    return {
      token,
      userData: {
        ...userData,
        type: dto.type,
        creatorProfile: result.creator, // أو رجّع select كامل لو بدك
      },
    };
  }

  hashPassword(password: string) {
    return argon.hash(password);
  }

  verifyPassword(password: string, hashedPassword: string) {
    return argon.verify(hashedPassword, password);
  }

  private generateJwtToken(userId: string, role: UserRole) {
    return this.jwtService.sign(
      { sub: String(userId), role },
      { expiresIn: '30d' },
    );
  }

  // async forgotPassword(email: string) {
  //   const { otp, expiresIn } = await this.otpService.sendOtp(
  //     email,
  //     'forgot_password',
  //   );

  //   await this.emailService.sendOtp(email, otp);

  //   return { expiresIn };
  // }
}
