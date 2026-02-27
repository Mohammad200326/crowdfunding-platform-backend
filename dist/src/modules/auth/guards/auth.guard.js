"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const database_service_1 = require("../../database/database.service");
const object_util_1 = require("../../../utils/object.util");
const core_1 = require("@nestjs/core");
const public_decorator_1 = require("../../../utils/decorators/public.decorator");
let AuthGuard = class AuthGuard {
    jwtService;
    prismaService;
    reflector;
    constructor(jwtService, prismaService, reflector) {
        this.jwtService = jwtService;
        this.prismaService = prismaService;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(public_decorator_1.IsPublic, [
            context.getHandler(),
            context.getClass(),
        ]);
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization;
        const jwt = authHeader?.split(' ')[1];
        if (!jwt) {
            if (isPublic)
                return true;
            throw new common_1.UnauthorizedException();
        }
        try {
            const payload = this.jwtService.verify(jwt);
            const user = await this.prismaService.user.findUniqueOrThrow({
                where: { id: payload.sub },
            });
            req.user = {
                ...(0, object_util_1.removeFields)(user, ['password']),
                id: String(user.id),
            };
        }
        catch {
            if (isPublic)
                return true;
            throw new common_1.UnauthorizedException();
        }
        return true;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        database_service_1.DatabaseService,
        core_1.Reflector])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map