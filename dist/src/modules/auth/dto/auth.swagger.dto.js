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
exports.RegisterCampaignCreatorFormDto = exports.InstitutionDocumentsDto = exports.RegisterCampaignCreatorResponseDto = exports.CampaignCreatorUserDataResponseDto = exports.CampaignCreatorProfileResponseDto = exports.RegisterCampaignCreatorDto = exports.CampaignCreatorProfileDto = exports.LoginResponseDto = exports.LoginUserDto = exports.LoginRequestDto = exports.ExpiresInResponseDto = exports.ResetPasswordDto = exports.VerifyForgotOtpDto = exports.ForgotPasswordDto = exports.RegisterDonorResponseDto = exports.RegisterDonorUserResponseDto = exports.DonorProfileResponseDto = exports.RegisterDonorDto = exports.DonorProfileDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_transformer_1 = require("class-transformer");
const swagger_2 = require("@nestjs/swagger");
class DonorProfileDto {
    areasOfInterest;
    preferredCampaignTypes;
    geographicScope;
    targetAudience;
    preferredCampaignSize;
    preferredCampaignVisibility;
}
exports.DonorProfileDto = DonorProfileDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Education and Health' }),
    __metadata("design:type", String)
], DonorProfileDto.prototype, "areasOfInterest", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Charitable and Social' }),
    __metadata("design:type", String)
], DonorProfileDto.prototype, "preferredCampaignTypes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'local' }),
    __metadata("design:type", String)
], DonorProfileDto.prototype, "geographicScope", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Children and needy families' }),
    __metadata("design:type", String)
], DonorProfileDto.prototype, "targetAudience", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10000 }),
    __metadata("design:type", Number)
], DonorProfileDto.prototype, "preferredCampaignSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Public' }),
    __metadata("design:type", String)
], DonorProfileDto.prototype, "preferredCampaignVisibility", void 0);
class RegisterDonorDto {
    firstName;
    lastName;
    email;
    password;
    dateOfBirth;
    phoneNumber;
    country;
    notes;
    donorProfile;
}
exports.RegisterDonorDto = RegisterDonorDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ahmed' }),
    __metadata("design:type", String)
], RegisterDonorDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Mahmoud' }),
    __metadata("design:type", String)
], RegisterDonorDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'mahmoud@example.com' }),
    __metadata("design:type", String)
], RegisterDonorDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123456789', minLength: 8 }),
    __metadata("design:type", String)
], RegisterDonorDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '1990-05-15',
        description: 'Date of birth in YYYY-MM-DD format',
    }),
    __metadata("design:type", String)
], RegisterDonorDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+970599123456', required: false }),
    __metadata("design:type", String)
], RegisterDonorDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Palestine', required: false }),
    __metadata("design:type", String)
], RegisterDonorDto.prototype, "country", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({
        example: 'New donor interested in supporting charitable projects',
        required: false,
    }),
    __metadata("design:type", String)
], RegisterDonorDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: DonorProfileDto, required: false }),
    __metadata("design:type", DonorProfileDto)
], RegisterDonorDto.prototype, "donorProfile", void 0);
class DonorProfileResponseDto {
    id;
    userId;
    dateOfBirth;
    areasOfInterest;
    preferredCampaignTypes;
    geographicScope;
    targetAudience;
    preferredCampaignSize;
    preferredCampaignVisibility;
    createdAt;
    updatedAt;
}
exports.DonorProfileResponseDto = DonorProfileResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '537a8d3e-4cf3-4a57-9d9e-b379f682aa1e' }),
    __metadata("design:type", String)
], DonorProfileResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'f2c0df9f-8756-49e3-85ea-695e651ca575' }),
    __metadata("design:type", String)
], DonorProfileResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1990-05-15T00:00:00.000Z' }),
    __metadata("design:type", String)
], DonorProfileResponseDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Education and Health' }),
    __metadata("design:type", String)
], DonorProfileResponseDto.prototype, "areasOfInterest", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Charitable and Social' }),
    __metadata("design:type", String)
], DonorProfileResponseDto.prototype, "preferredCampaignTypes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'local' }),
    __metadata("design:type", String)
], DonorProfileResponseDto.prototype, "geographicScope", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Children and needy families' }),
    __metadata("design:type", String)
], DonorProfileResponseDto.prototype, "targetAudience", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10000 }),
    __metadata("design:type", Number)
], DonorProfileResponseDto.prototype, "preferredCampaignSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Public' }),
    __metadata("design:type", String)
], DonorProfileResponseDto.prototype, "preferredCampaignVisibility", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-01-30T10:52:48.968Z' }),
    __metadata("design:type", String)
], DonorProfileResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-01-30T10:52:48.968Z' }),
    __metadata("design:type", String)
], DonorProfileResponseDto.prototype, "updatedAt", void 0);
class RegisterDonorUserResponseDto {
    id;
    firstName;
    lastName;
    email;
    role;
    country;
    phoneNumber;
    notes;
    isDeleted;
    isVerified;
    createdAt;
    updatedAt;
    verificationStatus;
    donorProfile;
}
exports.RegisterDonorUserResponseDto = RegisterDonorUserResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'f2c0df9f-8756-49e3-85ea-695e651ca575' }),
    __metadata("design:type", String)
], RegisterDonorUserResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ahmed' }),
    __metadata("design:type", String)
], RegisterDonorUserResponseDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Mahmoud' }),
    __metadata("design:type", String)
], RegisterDonorUserResponseDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'aas.mahmoud@example.com' }),
    __metadata("design:type", String)
], RegisterDonorUserResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'DONOR' }),
    __metadata("design:type", String)
], RegisterDonorUserResponseDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Palestine' }),
    __metadata("design:type", String)
], RegisterDonorUserResponseDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+970599123456' }),
    __metadata("design:type", String)
], RegisterDonorUserResponseDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'New donor interested in supporting charitable projects',
    }),
    __metadata("design:type", String)
], RegisterDonorUserResponseDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], RegisterDonorUserResponseDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], RegisterDonorUserResponseDto.prototype, "isVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-01-30T10:52:48.968Z' }),
    __metadata("design:type", String)
], RegisterDonorUserResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-01-30T10:52:48.968Z' }),
    __metadata("design:type", String)
], RegisterDonorUserResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'confirmed' }),
    __metadata("design:type", String)
], RegisterDonorUserResponseDto.prototype, "verificationStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: DonorProfileResponseDto }),
    __metadata("design:type", DonorProfileResponseDto)
], RegisterDonorUserResponseDto.prototype, "donorProfile", void 0);
class RegisterDonorResponseDto {
    user;
    token;
}
exports.RegisterDonorResponseDto = RegisterDonorResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: RegisterDonorUserResponseDto }),
    __metadata("design:type", RegisterDonorUserResponseDto)
], RegisterDonorResponseDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmMmMwZGY5Zi04NzU2LTQ5ZTMtODVlYS02OTVlNjUxY2E1NzUiLCJyb2xlIjoiRE9OT1IiLCJpYXQiOjE3Njk3NzAzNjgsImV4cCI6MTc3MjM2MjM2OH0.WmjTa0eO0oNtvkwJlV2ty6hInWgrNL7cgLwLV0EPBmk',
    }),
    __metadata("design:type", String)
], RegisterDonorResponseDto.prototype, "token", void 0);
class ForgotPasswordDto {
    email;
}
exports.ForgotPasswordDto = ForgotPasswordDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'example@gmail.com' }),
    __metadata("design:type", String)
], ForgotPasswordDto.prototype, "email", void 0);
class VerifyForgotOtpDto {
    email;
    otp;
}
exports.VerifyForgotOtpDto = VerifyForgotOtpDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'example@gmail.com' }),
    __metadata("design:type", String)
], VerifyForgotOtpDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '63324', description: '5 digits OTP' }),
    __metadata("design:type", String)
], VerifyForgotOtpDto.prototype, "otp", void 0);
class ResetPasswordDto {
    resetToken;
    password;
}
exports.ResetPasswordDto = ResetPasswordDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '550e8400-e29b-41d4-a716-446655440000' }),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "resetToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'NewStrongPass123', minLength: 8 }),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "password", void 0);
class ExpiresInResponseDto {
    otp;
    expiresIn;
}
exports.ExpiresInResponseDto = ExpiresInResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 12345, description: 'OTP of 5 digits' }),
    __metadata("design:type", Number)
], ExpiresInResponseDto.prototype, "otp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 900, description: 'Seconds until OTP expires' }),
    __metadata("design:type", Number)
], ExpiresInResponseDto.prototype, "expiresIn", void 0);
class LoginRequestDto {
    email;
    password;
}
exports.LoginRequestDto = LoginRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'example@gmail.com' }),
    __metadata("design:type", String)
], LoginRequestDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'StrongPassword123' }),
    __metadata("design:type", String)
], LoginRequestDto.prototype, "password", void 0);
class LoginUserDto {
    id;
    firstName;
    lastName;
    email;
    role;
    country;
}
exports.LoginUserDto = LoginUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'be1c995a-0c07-4222-a846-6f449905c70b' }),
    __metadata("design:type", String)
], LoginUserDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ahmad' }),
    __metadata("design:type", String)
], LoginUserDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Al-Hassan' }),
    __metadata("design:type", String)
], LoginUserDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ahmad.institution@example.com' }),
    __metadata("design:type", String)
], LoginUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: client_1.UserRole,
        example: client_1.UserRole.CAMPAIGN_CREATOR,
    }),
    __metadata("design:type", String)
], LoginUserDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Palestine' }),
    __metadata("design:type", String)
], LoginUserDto.prototype, "country", void 0);
class LoginResponseDto {
    user;
    token;
}
exports.LoginResponseDto = LoginResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: LoginUserDto }),
    __metadata("design:type", LoginUserDto)
], LoginResponseDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "token", void 0);
class CampaignCreatorProfileDto {
    institutionName;
    institutionType;
    institutionCountry;
    institutionDateOfEstablishment;
    institutionLegalStatus;
    institutionTaxIdentificationNumber;
    institutionRegistrationNumber;
    institutionRepresentativeName;
    institutionRepresentativePosition;
    institutionRepresentativeRegistrationNumber;
    institutionWebsite;
    institutionRepresentativeSocialMedia;
}
exports.CampaignCreatorProfileDto = CampaignCreatorProfileDto;
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 'Institution', nullable: true }),
    __metadata("design:type", Object)
], CampaignCreatorProfileDto.prototype, "institutionName", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 'NGO', nullable: true }),
    __metadata("design:type", Object)
], CampaignCreatorProfileDto.prototype, "institutionType", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 'Palestine', nullable: true }),
    __metadata("design:type", Object)
], CampaignCreatorProfileDto.prototype, "institutionCountry", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({
        example: '2015-01-01',
        format: 'date',
        nullable: true,
    }),
    __metadata("design:type", Object)
], CampaignCreatorProfileDto.prototype, "institutionDateOfEstablishment", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 'Registered NGO', nullable: true }),
    __metadata("design:type", Object)
], CampaignCreatorProfileDto.prototype, "institutionLegalStatus", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 'TAX-123456', nullable: true }),
    __metadata("design:type", Object)
], CampaignCreatorProfileDto.prototype, "institutionTaxIdentificationNumber", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 'REG-987654', nullable: true }),
    __metadata("design:type", Object)
], CampaignCreatorProfileDto.prototype, "institutionRegistrationNumber", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 'Lina Hassan', nullable: true }),
    __metadata("design:type", Object)
], CampaignCreatorProfileDto.prototype, "institutionRepresentativeName", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 'Director', nullable: true }),
    __metadata("design:type", Object)
], CampaignCreatorProfileDto.prototype, "institutionRepresentativePosition", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 'REP-001', nullable: true }),
    __metadata("design:type", Object)
], CampaignCreatorProfileDto.prototype, "institutionRepresentativeRegistrationNumber", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 'https://example.org', nullable: true }),
    __metadata("design:type", Object)
], CampaignCreatorProfileDto.prototype, "institutionWebsite", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: '@example_org', nullable: true }),
    __metadata("design:type", Object)
], CampaignCreatorProfileDto.prototype, "institutionRepresentativeSocialMedia", void 0);
class RegisterCampaignCreatorDto {
    firstName;
    lastName;
    email;
    password;
    phoneNumber;
    country;
    notes;
    dateOfBirth;
    type;
    assetIds;
    institutionDocuments;
    creatorProfile;
}
exports.RegisterCampaignCreatorDto = RegisterCampaignCreatorDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ahmad' }),
    __metadata("design:type", String)
], RegisterCampaignCreatorDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Saleh' }),
    __metadata("design:type", String)
], RegisterCampaignCreatorDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'creator@example.com' }),
    __metadata("design:type", String)
], RegisterCampaignCreatorDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123456789', minLength: 8 }),
    __metadata("design:type", String)
], RegisterCampaignCreatorDto.prototype, "password", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: '+970599111223', nullable: true }),
    __metadata("design:type", Object)
], RegisterCampaignCreatorDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 'Palestine', nullable: true }),
    __metadata("design:type", Object)
], RegisterCampaignCreatorDto.prototype, "country", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 'Campaign creator account', nullable: true }),
    __metadata("design:type", Object)
], RegisterCampaignCreatorDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({
        example: '1998-06-12',
        format: 'date',
        nullable: true,
    }),
    __metadata("design:type", Object)
], RegisterCampaignCreatorDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.CreatorType, example: client_1.CreatorType.INSTITUTION }),
    __metadata("design:type", String)
], RegisterCampaignCreatorDto.prototype, "type", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({
        type: [String],
        description: 'Optional general asset ids to be attached to the creator',
        example: ['uuid1', 'uuid2'],
    }),
    __metadata("design:type", Array)
], RegisterCampaignCreatorDto.prototype, "assetIds", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({
        type: () => InstitutionDocumentsDto,
        nullable: true,
        description: 'Optional institution documents (asset IDs) to attach to creator',
    }),
    (0, class_transformer_1.Type)(() => InstitutionDocumentsDto),
    __metadata("design:type", Object)
], RegisterCampaignCreatorDto.prototype, "institutionDocuments", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({
        type: () => CampaignCreatorProfileDto,
        nullable: true,
        description: 'Optional creator profile data (can be partial).',
    }),
    (0, class_transformer_1.Type)(() => CampaignCreatorProfileDto),
    __metadata("design:type", Object)
], RegisterCampaignCreatorDto.prototype, "creatorProfile", void 0);
class CampaignCreatorProfileResponseDto {
    id;
    type;
    userId;
    institutionName;
    institutionType;
    institutionCountry;
    institutionDateOfEstablishment;
    institutionLegalStatus;
    institutionTaxIdentificationNumber;
    institutionRegistrationNumber;
    institutionRepresentativeName;
    institutionRepresentativePosition;
    institutionRepresentativeRegistrationNumber;
    institutionWebsite;
    institutionRepresentativeSocialMedia;
    createdAt;
    updatedAt;
}
exports.CampaignCreatorProfileResponseDto = CampaignCreatorProfileResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    __metadata("design:type", String)
], CampaignCreatorProfileResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.CreatorType, example: client_1.CreatorType.INSTITUTION }),
    __metadata("design:type", String)
], CampaignCreatorProfileResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    __metadata("design:type", String)
], CampaignCreatorProfileResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 'Institution', nullable: true }),
    __metadata("design:type", Object)
], CampaignCreatorProfileResponseDto.prototype, "institutionName", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 'NGO', nullable: true }),
    __metadata("design:type", Object)
], CampaignCreatorProfileResponseDto.prototype, "institutionType", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 'Palestine', nullable: true }),
    __metadata("design:type", Object)
], CampaignCreatorProfileResponseDto.prototype, "institutionCountry", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({
        example: '2015-01-01T00:00:00.000Z',
        format: 'date-time',
        nullable: true,
    }),
    __metadata("design:type", Object)
], CampaignCreatorProfileResponseDto.prototype, "institutionDateOfEstablishment", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 'Registered NGO', nullable: true }),
    __metadata("design:type", Object)
], CampaignCreatorProfileResponseDto.prototype, "institutionLegalStatus", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 'TAX-123456', nullable: true }),
    __metadata("design:type", Object)
], CampaignCreatorProfileResponseDto.prototype, "institutionTaxIdentificationNumber", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 'REG-987654', nullable: true }),
    __metadata("design:type", Object)
], CampaignCreatorProfileResponseDto.prototype, "institutionRegistrationNumber", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 'Lina Hassan', nullable: true }),
    __metadata("design:type", Object)
], CampaignCreatorProfileResponseDto.prototype, "institutionRepresentativeName", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 'Director', nullable: true }),
    __metadata("design:type", Object)
], CampaignCreatorProfileResponseDto.prototype, "institutionRepresentativePosition", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 'REP-001', nullable: true }),
    __metadata("design:type", Object)
], CampaignCreatorProfileResponseDto.prototype, "institutionRepresentativeRegistrationNumber", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 'https://example.org', nullable: true }),
    __metadata("design:type", Object)
], CampaignCreatorProfileResponseDto.prototype, "institutionWebsite", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: '@example_org', nullable: true }),
    __metadata("design:type", Object)
], CampaignCreatorProfileResponseDto.prototype, "institutionRepresentativeSocialMedia", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-02-01T12:00:00.000Z', format: 'date-time' }),
    __metadata("design:type", String)
], CampaignCreatorProfileResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-02-01T12:00:00.000Z', format: 'date-time' }),
    __metadata("design:type", String)
], CampaignCreatorProfileResponseDto.prototype, "updatedAt", void 0);
class CampaignCreatorUserDataResponseDto {
    id;
    firstName;
    lastName;
    email;
    role;
    country;
    phoneNumber;
    notes;
    dateOfBirth;
    isDeleted;
    isVerified;
    verificationStatus;
    createdAt;
    updatedAt;
    type;
    preferences;
    creatorProfile;
}
exports.CampaignCreatorUserDataResponseDto = CampaignCreatorUserDataResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1a0a3cd3-3341-43ff-aa4a-32552c8d2346' }),
    __metadata("design:type", String)
], CampaignCreatorUserDataResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ahmad' }),
    __metadata("design:type", String)
], CampaignCreatorUserDataResponseDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Saleh' }),
    __metadata("design:type", String)
], CampaignCreatorUserDataResponseDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'creator@example.com' }),
    __metadata("design:type", String)
], CampaignCreatorUserDataResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.UserRole, example: client_1.UserRole.CAMPAIGN_CREATOR }),
    __metadata("design:type", String)
], CampaignCreatorUserDataResponseDto.prototype, "role", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 'Palestine', nullable: true }),
    __metadata("design:type", Object)
], CampaignCreatorUserDataResponseDto.prototype, "country", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: '+970599111223', nullable: true }),
    __metadata("design:type", Object)
], CampaignCreatorUserDataResponseDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 'Campaign creator account', nullable: true }),
    __metadata("design:type", Object)
], CampaignCreatorUserDataResponseDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({
        example: '1998-06-12',
        format: 'date',
        nullable: true,
    }),
    __metadata("design:type", Object)
], CampaignCreatorUserDataResponseDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], CampaignCreatorUserDataResponseDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], CampaignCreatorUserDataResponseDto.prototype, "isVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: client_1.VerificationStatus,
        example: client_1.VerificationStatus.pending,
    }),
    __metadata("design:type", String)
], CampaignCreatorUserDataResponseDto.prototype, "verificationStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-02-01T12:00:00.000Z', format: 'date-time' }),
    __metadata("design:type", String)
], CampaignCreatorUserDataResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-02-01T12:00:00.000Z', format: 'date-time' }),
    __metadata("design:type", String)
], CampaignCreatorUserDataResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.CreatorType, example: client_1.CreatorType.INSTITUTION }),
    __metadata("design:type", String)
], CampaignCreatorUserDataResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({
        description: 'Preferred campaign categories (optional)',
        isArray: true,
        enum: client_1.CampaignCategory,
        example: [client_1.CampaignCategory.WATER, client_1.CampaignCategory.HEALTH],
        nullable: true,
    }),
    __metadata("design:type", Object)
], CampaignCreatorUserDataResponseDto.prototype, "preferences", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({
        type: () => CampaignCreatorProfileResponseDto,
        nullable: true,
    }),
    __metadata("design:type", Object)
], CampaignCreatorUserDataResponseDto.prototype, "creatorProfile", void 0);
class RegisterCampaignCreatorResponseDto {
    token;
    userData;
}
exports.RegisterCampaignCreatorResponseDto = RegisterCampaignCreatorResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....',
    }),
    __metadata("design:type", String)
], RegisterCampaignCreatorResponseDto.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => CampaignCreatorUserDataResponseDto }),
    __metadata("design:type", CampaignCreatorUserDataResponseDto)
], RegisterCampaignCreatorResponseDto.prototype, "userData", void 0);
class InstitutionDocumentsDto {
    registrationCertificateId;
    commercialLicenseId;
    representativeIdPhotoId;
    commissionerImageId;
    authorizationLetterId;
}
exports.InstitutionDocumentsDto = InstitutionDocumentsDto;
__decorate([
    (0, swagger_2.ApiPropertyOptional)({
        example: 'uuid',
        description: 'INSTITUTION_REGISTRATION_CERTIFICATE asset id',
    }),
    __metadata("design:type", String)
], InstitutionDocumentsDto.prototype, "registrationCertificateId", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({
        example: 'uuid',
        description: 'INSTITUTION_COMMERCIAL_LICENSE asset id',
    }),
    __metadata("design:type", String)
], InstitutionDocumentsDto.prototype, "commercialLicenseId", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({
        example: 'uuid',
        description: 'INSTITUTION_REPRESENTATIVE_ID_PHOTO asset id',
    }),
    __metadata("design:type", String)
], InstitutionDocumentsDto.prototype, "representativeIdPhotoId", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({
        example: 'uuid',
        description: 'INSTITUTION_COMMISSIONER_IMAGE asset id',
    }),
    __metadata("design:type", String)
], InstitutionDocumentsDto.prototype, "commissionerImageId", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({
        example: 'uuid',
        description: 'INSTITUTION_AUTHORIZATION_LETTER asset id',
    }),
    __metadata("design:type", String)
], InstitutionDocumentsDto.prototype, "authorizationLetterId", void 0);
class RegisterCampaignCreatorFormDto {
    firstName;
    lastName;
    email;
    password;
    phoneNumber;
    country;
    notes;
    dateOfBirth;
    type;
    preferences;
    institutionName;
    institutionType;
    institutionCountry;
    institutionDateOfEstablishment;
    institutionLegalStatus;
    institutionTaxIdentificationNumber;
    institutionRegistrationNumber;
    institutionRepresentativeName;
    institutionRepresentativePosition;
    institutionRepresentativeRegistrationNumber;
    institutionWebsite;
    institutionRepresentativeSocialMedia;
    registrationCertificate;
    commercialLicense;
    representativeIdPhoto;
    commissionerImage;
    authorizationLetter;
    avatar;
}
exports.RegisterCampaignCreatorFormDto = RegisterCampaignCreatorFormDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ahmad' }),
    __metadata("design:type", String)
], RegisterCampaignCreatorFormDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Saleh' }),
    __metadata("design:type", String)
], RegisterCampaignCreatorFormDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'creator@example.com' }),
    __metadata("design:type", String)
], RegisterCampaignCreatorFormDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123456789', minLength: 8 }),
    __metadata("design:type", String)
], RegisterCampaignCreatorFormDto.prototype, "password", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: '+970599111223', nullable: true }),
    __metadata("design:type", String)
], RegisterCampaignCreatorFormDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 'Palestine', nullable: true }),
    __metadata("design:type", String)
], RegisterCampaignCreatorFormDto.prototype, "country", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 'Campaign creator account', nullable: true }),
    __metadata("design:type", String)
], RegisterCampaignCreatorFormDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({
        example: '1998-06-12',
        format: 'date',
        nullable: true,
    }),
    __metadata("design:type", String)
], RegisterCampaignCreatorFormDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.CreatorType, example: client_1.CreatorType.INSTITUTION }),
    __metadata("design:type", String)
], RegisterCampaignCreatorFormDto.prototype, "type", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({
        description: 'Preferred campaign categories (optional, one or more)',
        isArray: true,
        enum: client_1.CampaignCategory,
        example: [client_1.CampaignCategory.WATER, client_1.CampaignCategory.HEALTH],
    }),
    __metadata("design:type", Array)
], RegisterCampaignCreatorFormDto.prototype, "preferences", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 'Institution', nullable: true }),
    __metadata("design:type", String)
], RegisterCampaignCreatorFormDto.prototype, "institutionName", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 'NGO', nullable: true }),
    __metadata("design:type", String)
], RegisterCampaignCreatorFormDto.prototype, "institutionType", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 'Palestine', nullable: true }),
    __metadata("design:type", String)
], RegisterCampaignCreatorFormDto.prototype, "institutionCountry", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({
        example: '2015-01-01',
        format: 'date',
        nullable: true,
    }),
    __metadata("design:type", String)
], RegisterCampaignCreatorFormDto.prototype, "institutionDateOfEstablishment", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 'Registered NGO', nullable: true }),
    __metadata("design:type", String)
], RegisterCampaignCreatorFormDto.prototype, "institutionLegalStatus", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 'TAX-123456', nullable: true }),
    __metadata("design:type", String)
], RegisterCampaignCreatorFormDto.prototype, "institutionTaxIdentificationNumber", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 'REG-987654', nullable: true }),
    __metadata("design:type", String)
], RegisterCampaignCreatorFormDto.prototype, "institutionRegistrationNumber", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 'Lina Hassan', nullable: true }),
    __metadata("design:type", String)
], RegisterCampaignCreatorFormDto.prototype, "institutionRepresentativeName", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 'Director', nullable: true }),
    __metadata("design:type", String)
], RegisterCampaignCreatorFormDto.prototype, "institutionRepresentativePosition", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 'REP-001', nullable: true }),
    __metadata("design:type", String)
], RegisterCampaignCreatorFormDto.prototype, "institutionRepresentativeRegistrationNumber", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 'https://example.org', nullable: true }),
    __metadata("design:type", String)
], RegisterCampaignCreatorFormDto.prototype, "institutionWebsite", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: '@example_org', nullable: true }),
    __metadata("design:type", String)
], RegisterCampaignCreatorFormDto.prototype, "institutionRepresentativeSocialMedia", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ type: 'string', format: 'binary' }),
    __metadata("design:type", Object)
], RegisterCampaignCreatorFormDto.prototype, "registrationCertificate", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ type: 'string', format: 'binary' }),
    __metadata("design:type", Object)
], RegisterCampaignCreatorFormDto.prototype, "commercialLicense", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ type: 'string', format: 'binary' }),
    __metadata("design:type", Object)
], RegisterCampaignCreatorFormDto.prototype, "representativeIdPhoto", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ type: 'string', format: 'binary' }),
    __metadata("design:type", Object)
], RegisterCampaignCreatorFormDto.prototype, "commissionerImage", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ type: 'string', format: 'binary' }),
    __metadata("design:type", Object)
], RegisterCampaignCreatorFormDto.prototype, "authorizationLetter", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ type: 'string', format: 'binary' }),
    __metadata("design:type", Object)
], RegisterCampaignCreatorFormDto.prototype, "avatar", void 0);
//# sourceMappingURL=auth.swagger.dto.js.map