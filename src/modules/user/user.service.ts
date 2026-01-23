import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from '../database/database.service';
import { FileService } from '../file/file.service';
import { AssetKind } from 'generated/prisma/client';

@Injectable()
export class UserService {
  constructor(
    private prismaService: DatabaseService,
    private fileService: FileService,
  ) {}

  async create(createUserDto: CreateUserDto, avatar?: Express.Multer.File) {
    const user = await this.prismaService.user.create({
      data: {
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        password: createUserDto.password,
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

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }
}
