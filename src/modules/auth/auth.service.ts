import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon from 'argon2';
import { LoginDTO } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class AuthService {
  constructor(
    private databaseService: DatabaseService,
    private jwtService: JwtService,
  ) {}

  // LOGIN
  async login(dto: LoginDTO) {
    //Find User by email
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

  hashPassword(password: string) {
    return argon.hash(password);
  }

  verifyPassword(password: string, hashedPassword: string) {
    return argon.verify(hashedPassword, password);
  }
}
