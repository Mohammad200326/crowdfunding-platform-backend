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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const password_reset_service_1 = require("./password-reset.service");
const zod_validation_pipe_1 = require("../../pipes/zod-validation.pipe");
const password_reset_schema_1 = require("./types/password-reset.schema");
const auth_dto_1 = require("./dto/auth.dto");
const donor_validation_schema_1 = require("../donor/utils/donor.validation.schema");
const swagger_1 = require("@nestjs/swagger");
const auth_swagger_dto_1 = require("./dto/auth.swagger.dto");
const public_decorator_1 = require("../../utils/decorators/public.decorator");
const register_campaign_creator_schema_1 = require("./dto/register-campaign-creator.schema");
let AuthController = class AuthController {
    authService;
    passwordResetService;
    constructor(authService, passwordResetService) {
        this.authService = authService;
        this.passwordResetService = passwordResetService;
    }
    async registerDonor(registerDonorDto) {
        return await this.authService.registerDonor(registerDonorDto);
    }
    async newRegisterCampaignCreator(dto) {
        return await this.authService.registerCampaignCreator(dto);
    }
    async login(dto) {
        return this.authService.login(dto);
    }
    async forgot(forgotPasswordDTO) {
        return this.authService.forgotPassword(forgotPasswordDTO.email);
    }
    async verifyOTP(verifyOTPSchema) {
        return this.passwordResetService.verify(verifyOTPSchema.email, verifyOTPSchema.otp);
    }
    async reset(resetPasswordDTO) {
        return this.passwordResetService.reset(resetPasswordDTO.resetToken, resetPasswordDTO.password);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register/donor'),
    (0, public_decorator_1.IsPublic)(true),
    (0, swagger_1.ApiOperation)({ summary: 'Register new donor' }),
    (0, swagger_1.ApiBody)({ type: auth_swagger_dto_1.RegisterDonorDto }),
    (0, swagger_1.ApiOkResponse)({ type: auth_swagger_dto_1.RegisterDonorResponseDto }),
    __param(0, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(donor_validation_schema_1.donorValidationSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerDonor", null);
__decorate([
    (0, common_1.Post)('register/campaign-creator'),
    (0, public_decorator_1.IsPublic)(true),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new campaign creator' }),
    (0, swagger_1.ApiBody)({ type: auth_swagger_dto_1.RegisterCampaignCreatorDto }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Campaign creator registered successfully',
        type: auth_swagger_dto_1.RegisterCampaignCreatorResponseDto,
    }),
    __param(0, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(register_campaign_creator_schema_1.RegisterCampaignCreatorSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "newRegisterCampaignCreator", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, public_decorator_1.IsPublic)(true),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Login with email and password' }),
    (0, swagger_1.ApiBody)({ type: auth_swagger_dto_1.LoginRequestDto }),
    (0, swagger_1.ApiOkResponse)({ type: auth_swagger_dto_1.LoginResponseDto }),
    __param(0, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(auth_dto_1.LoginSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('password/forgot'),
    (0, public_decorator_1.IsPublic)(true),
    (0, swagger_1.ApiOperation)({ summary: 'Send OTP for forgot password' }),
    (0, swagger_1.ApiBody)({ type: auth_swagger_dto_1.ForgotPasswordDto }),
    (0, swagger_1.ApiOkResponse)({ type: auth_swagger_dto_1.ExpiresInResponseDto }),
    __param(0, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(password_reset_schema_1.ForgotPasswordSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgot", null);
__decorate([
    (0, common_1.Post)('password/verify-otp'),
    (0, swagger_1.ApiOperation)({ summary: 'Verify OTP and return reset token' }),
    (0, swagger_1.ApiBody)({ type: auth_swagger_dto_1.VerifyForgotOtpDto }),
    (0, swagger_1.ApiOkResponse)({
        schema: {
            type: 'object',
            properties: {
                resetToken: { type: 'string', format: 'uuid' },
            },
            required: ['resetToken'],
        },
    }),
    __param(0, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(password_reset_schema_1.VerifyOtpSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyOTP", null);
__decorate([
    (0, common_1.Post)('password/reset'),
    (0, swagger_1.ApiOperation)({ summary: 'Reset password using reset token' }),
    (0, swagger_1.ApiBody)({ type: auth_swagger_dto_1.ResetPasswordDto }),
    (0, swagger_1.ApiOkResponse)({
        schema: {
            type: 'object',
            properties: {
                message: {
                    type: 'string',
                    example: 'Password reset successfully',
                },
            },
            required: ['message'],
        },
    }),
    __param(0, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(password_reset_schema_1.ResetPasswordSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "reset", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        password_reset_service_1.PasswordResetService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map