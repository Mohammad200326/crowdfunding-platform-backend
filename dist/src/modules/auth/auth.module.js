"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const password_reset_service_1 = require("./password-reset.service");
const user_module_1 = require("../user/user.module");
const donor_module_1 = require("../donor/donor.module");
const otp_service_1 = require("./otp.service");
const redis_module_1 = require("../../lib/redis.module");
const database_module_1 = require("../database/database.module");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const file_module_1 = require("../file/file.module");
const email_service_1 = require("./email.service");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            donor_module_1.DonorModule,
            redis_module_1.RedisModule,
            database_module_1.DatabaseModule,
            jwt_1.JwtModule.registerAsync({
                global: true,
                useFactory: (configService) => ({
                    secret: configService.getOrThrow('JWT_SECRET'),
                }),
                inject: [config_1.ConfigService],
            }),
            file_module_1.FileModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, password_reset_service_1.PasswordResetService, otp_service_1.OtpService, email_service_1.EmailService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map