import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { DatabaseService } from '../database/database.service';
import type { registerDonorDTO, UserResponseDTO } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '@prisma/client';
import { UserService } from '../user/user.service';
import { AssetKind } from '@prisma/client';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private databaseService: DatabaseService,
    private jwtService: JwtService,
  ) {}

  create(createAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  hashPassword(password: string) {
    return argon.hash(password);
  }

  verifyPassword(password: string, hashedPassword: string) {
    return argon.verify(hashedPassword, password);
  }

  async registerDonor(
    registerDonorDto: registerDonorDTO,
    file?: Express.Multer.File,
  ) {
    const { password, donorProfile, ...userData } = registerDonorDto;

    // Hash password
    const hashedPassword = await this.hashPassword(password);

    // Create user with donor profile
    const user = await this.databaseService.user.create({
      data: {
        ...userData,
        password: hashedPassword,
        role: UserRole.DONOR,

        donorProfile: {
          create: {
            ...donorProfile,
          },
        },

        ownedAssets: file
          ? {
              create: {
                // 1. تصحيح الاسم من path إلى url
                url: file.path,

                // 2. إضافة الحقول الإجبارية الناقصة
                fileId: file.filename || `${Date.now()}-${file.originalname}`,
                fileType: file.mimetype,
                fileSizeInKB: Math.round(file.size / 1024),

                // 3. تحديد النوع
                kind: AssetKind.USER_AVATAR,
              },
            }
          : undefined,
      },
      include: {
        donorProfile: true,
        ownedAssets: true,
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

  private generateJwtToken(userId: string, role: UserRole) {
    return this.jwtService.sign(
      { sub: String(userId), role },
      { expiresIn: '30d' },
    );
  }
}
