import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/modules/database/database.service';
import { Reflector } from '@nestjs/core';
export declare class AuthGuard implements CanActivate {
    private jwtService;
    private prismaService;
    private reflector;
    constructor(jwtService: JwtService, prismaService: DatabaseService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
