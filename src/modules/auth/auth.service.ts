import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon from 'argon2';
import { DatabaseService } from '../database/database.service';
import type { registerDonorDTO } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '@prisma/client';
import { UserService } from '../user/user.service';
import { OtpService } from './otp.service';
import { EmailService } from './email.service';
import { LoginDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
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
      access_token: token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        country: user.country,
      },
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

    // Hash password
    const hashedPassword = await this.hashPassword(password);

    // Create user with donor profile
    const user = await this.databaseService.user.create({
      data: {
        ...userData,
        isVerified: true,
        verificationStatus: 'confirmed',
        password: hashedPassword,
        role: UserRole.DONOR,

        donorProfile: donorProfile
          ? {
              create: {
                ...donorProfile,
              },
            }
          : undefined,
      },
      include: {
        donorProfile: true,
      },
    });

    // Generate JWT token
    const token = this.generateJwtToken(user.id, UserRole.DONOR);

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
