import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon from 'argon2';
import { DatabaseService } from '../database/database.service';
import type {
  registerCampaignCreatorDTO,
  registerDonorDTO,
} from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '@prisma/client';
import { UserService } from '../user/user.service';
import { DonorService } from '../donor/donor.service';
import { OtpService } from './otp.service';
import { EmailService } from './email.service';
import { LoginDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private donorService: DonorService,
    private databaseService: DatabaseService,
    private jwtService: JwtService,
    private readonly otpService: OtpService,
    private readonly emailService: EmailService,
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

  async registerCampaignCreator(
    registerCampaignCreatorDto: registerCampaignCreatorDTO,
  ) {
    const existingUser = await this.userService.findByEmail(
      registerCampaignCreatorDto.email,
    );
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const { password, creatorProfile, ...userData } =
      registerCampaignCreatorDto;

    const hashedPassword = await this.hashPassword(password);

    const user = await this.databaseService.user.create({
      data: {
        ...userData,
        isVerified: true,
        verificationStatus: 'confirmed',
        password: hashedPassword,
        role: UserRole.CAMPAIGN_CREATOR,

        creatorProfile: creatorProfile
          ? {
              create: {
                ...creatorProfile,
              },
            }
          : undefined,
      },
      include: {
        creatorProfile: true,
      },
    });

    // Generate JWT token
    const token = this.generateJwtToken(user.id, UserRole.CAMPAIGN_CREATOR);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
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

  async forgotPassword(email: string) {
    const { otp, expiresIn } = await this.otpService.sendOtp(
      email,
      'forgot_password',
    );

    await this.emailService.sendOtp(email, otp);

    return { expiresIn };
  }
}
