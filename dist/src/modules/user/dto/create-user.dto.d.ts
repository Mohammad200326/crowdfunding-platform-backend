import { UserRole } from '@prisma/client';
export declare class CreateUserDto {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    email: string;
    password: string;
    role?: UserRole;
    country: string;
    phoneNumber: string;
    notes?: string;
}
