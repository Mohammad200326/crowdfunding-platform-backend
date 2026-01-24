import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { DatabaseService } from '../database/database.service';
import type { registerDonorDTO, UserResponseDTO } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'generated/prisma/enums';
import { UserService } from '../user/user.service';
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
  ): Promise<UserResponseDTO> {
    const { password, donorProfile, ...userData } = registerDonorDto;

    // Hash password
    const hashedPassword = await this.hashPassword(registerDonorDto.password);

    const createdUser = await this.userService.create({
      ...userData,
      password: hashedPassword,
    });

    const token = this.generateJwtToken(createdUser.id, UserRole.DONOR);

    // Create user with donor profile
    const user = await this.databaseService.user.create({
      data: {
        ...userData,
        password: hashedPassword,
        role: UserRole.DONOR,
        donor: {
          create: donorProfile,
        },
      },
      include: {
        donor: true,
      },
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  private generateJwtToken(userId: string, role: UserRole) {
    return this.jwtService.sign(
      { sub: String(userId), role },
      { expiresIn: '30d' },
    );
  }
}
