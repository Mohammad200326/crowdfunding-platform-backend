import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from '../database/database.service';
import { FileService } from '../file/file.service';
import { AssetKind, User, UserRole, PrismaClient } from '@prisma/client';
import { removeFields } from 'src/utils/object.util';
import { registerUserDTO, UserResponseDTO } from '../auth/dto/auth.dto';
import * as argon from 'argon2';
// import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private prismaService: DatabaseService,
    private fileService: FileService,
  ) {}

  async createUserForRegistration(
    userData: Omit<registerUserDTO, 'password'> & { password: string },
    role: UserRole,
    tx?: Omit<
      PrismaClient,
      '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
    >,
  ): Promise<User> {
    const prisma = tx || this.prismaService;
    const hashedPassword = await argon.hash(userData.password);

    return prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
        role,
        isVerified: true,
        verificationStatus: 'confirmed',
      },
    });
  }

  createUser(registerUserDTO: registerUserDTO) {
    return this.prismaService.user.create({
      data: registerUserDTO,
    });
  }

  async create(createUserDto: CreateUserDto, avatar?: Express.Multer.File) {
    const user = await this.prismaService.user.create({
      data: {
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        password: createUserDto.password,
        dateOfBirth: createUserDto.dateOfBirth,
        role: createUserDto.role,
        country: createUserDto.country,
        phoneNumber: createUserDto.phoneNumber,
        notes: createUserDto.notes || '',
      },
    });

    if (avatar) {
      const assetData = this.fileService.createFileAssetData(
        avatar,
        user.id,
        AssetKind.USER_AVATAR,
      );

      await this.prismaService.asset.create({
        data: {
          ...assetData,
          userId: user.id,
        },
      });
    }

    return user;
  }

  async findAll() {
    return this.prismaService.user.findMany({
      where: {
        isDeleted: false,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        country: true,
        phoneNumber: true,
        isVerified: true,
        verificationStatus: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prismaService.user.findUnique({
      where: {
        id,
        isDeleted: false,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        country: true,
        phoneNumber: true,
        notes: true,
        isVerified: true,
        verificationStatus: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    avatar?: Express.Multer.File,
  ) {
    const user = await this.prismaService.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });

    if (avatar) {
      // Delete existing avatar if any
      const existingAvatar = await this.prismaService.asset.findFirst({
        where: {
          userId: id,
          kind: AssetKind.USER_AVATAR,
        },
      });

      if (existingAvatar) {
        await this.fileService.deleteFileFromImageKit(existingAvatar.fileId);
        await this.prismaService.asset.delete({
          where: { id: existingAvatar.id },
        });
      }

      // Create new avatar asset
      const assetData = this.fileService.createFileAssetData(
        avatar,
        id,
        AssetKind.USER_AVATAR,
      );

      await this.prismaService.asset.create({
        data: {
          ...assetData,
          userId: id,
        },
      });
    }

    return user;
  }

  async remove(id: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user || user.isDeleted) {
      return null;
    }

    return this.prismaService.user.update({
      where: { id },
      data: { isDeleted: true },
    });
  }

  async findByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  mapUserWithoutPassword(user: User): UserResponseDTO['userData'] {
    const userWithoutPassword = removeFields(user, ['password']);

    return {
      ...userWithoutPassword,
      id: userWithoutPassword.id,
    };
  }
}
