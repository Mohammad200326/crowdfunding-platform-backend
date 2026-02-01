import {
  IsString,
  IsEmail,
  IsEnum,
  IsOptional,
  MinLength,
  IsDate,
} from 'class-validator';
import { UserRole } from '@prisma/client';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsDate()
  dateOfBirth: Date;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @IsString()
  country: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
