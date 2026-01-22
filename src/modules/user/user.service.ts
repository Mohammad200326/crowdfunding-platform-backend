import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UserService {
  constructor(private prismaService: DatabaseService) { }

  async create(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({
      data: {
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        password: createUserDto.password,
        role: createUserDto.role,
        country: createUserDto.country,
        phoneNumber: createUserDto.phoneNumber,
        avatar: createUserDto.avatar || '',
        notes: createUserDto.notes || '',
      },
    });
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
        avatar: true,
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
        avatar: true,
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
