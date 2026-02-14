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
exports.DonorFindOneResponseDto = exports.UpdateDonorResponseDto = exports.UserWithoutPasswordDto = exports.DonorIdentityResponseDto = exports.AssetResponseDto = exports.UpdateDonorFormDto = exports.FindAllDonorsResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const auth_swagger_dto_1 = require("../../auth/dto/auth.swagger.dto");
class FindAllDonorsResponseDto {
    data;
}
exports.FindAllDonorsResponseDto = FindAllDonorsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [auth_swagger_dto_1.RegisterDonorUserResponseDto] }),
    __metadata("design:type", Array)
], FindAllDonorsResponseDto.prototype, "data", void 0);
class UpdateDonorFormDto {
    firstName;
    lastName;
    email;
    dateOfBirth;
    phoneNumber;
    country;
    notes;
    'donorProfile[areasOfInterest]';
    'donorProfile[preferredCampaignTypes]';
    'donorProfile[geographicScope]';
    'donorProfile[targetAudience]';
    'donorProfile[preferredCampaignSize]';
    'donorProfile[preferredCampaignVisibility]';
    fullNameOnId;
    idNumber;
    idFront;
    idBack;
    selfieWithId;
}
exports.UpdateDonorFormDto = UpdateDonorFormDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ahmed', required: false }),
    __metadata("design:type", String)
], UpdateDonorFormDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Mahmoud', required: false }),
    __metadata("design:type", String)
], UpdateDonorFormDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ahmed@example.com', required: false }),
    __metadata("design:type", String)
], UpdateDonorFormDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1990-05-15', required: false }),
    __metadata("design:type", String)
], UpdateDonorFormDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+970599123456', required: false }),
    __metadata("design:type", String)
], UpdateDonorFormDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Palestine', required: false }),
    __metadata("design:type", String)
], UpdateDonorFormDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Notes about the donor', required: false }),
    __metadata("design:type", String)
], UpdateDonorFormDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Education and Health', required: false }),
    __metadata("design:type", String)
], UpdateDonorFormDto.prototype, "donorProfile[areasOfInterest]", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Charitable and Social', required: false }),
    __metadata("design:type", String)
], UpdateDonorFormDto.prototype, "donorProfile[preferredCampaignTypes]", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'local', required: false }),
    __metadata("design:type", String)
], UpdateDonorFormDto.prototype, "donorProfile[geographicScope]", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Children and needy families', required: false }),
    __metadata("design:type", String)
], UpdateDonorFormDto.prototype, "donorProfile[targetAudience]", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10000, required: false }),
    __metadata("design:type", Number)
], UpdateDonorFormDto.prototype, "donorProfile[preferredCampaignSize]", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Public', required: false }),
    __metadata("design:type", String)
], UpdateDonorFormDto.prototype, "donorProfile[preferredCampaignVisibility]", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Full Name on ID', required: false }),
    __metadata("design:type", String)
], UpdateDonorFormDto.prototype, "fullNameOnId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123456789', required: false }),
    __metadata("design:type", String)
], UpdateDonorFormDto.prototype, "idNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary', required: false }),
    __metadata("design:type", Object)
], UpdateDonorFormDto.prototype, "idFront", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary', required: false }),
    __metadata("design:type", Object)
], UpdateDonorFormDto.prototype, "idBack", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary', required: false }),
    __metadata("design:type", Object)
], UpdateDonorFormDto.prototype, "selfieWithId", void 0);
class AssetResponseDto {
    id;
    storageProviderName;
    fileImmutableUrl;
    kind;
}
exports.AssetResponseDto = AssetResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '550e8400-e29b-41d4-a716-446655440000' }),
    __metadata("design:type", String)
], AssetResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'imagekit' }),
    __metadata("design:type", String)
], AssetResponseDto.prototype, "storageProviderName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://ik.imagekit.io/xxx/image.jpg' }),
    __metadata("design:type", String)
], AssetResponseDto.prototype, "fileImmutableUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'DONOR_ID_FRONT' }),
    __metadata("design:type", String)
], AssetResponseDto.prototype, "kind", void 0);
class DonorIdentityResponseDto {
    id;
    donorId;
    fullNameOnId;
    idNumber;
    createdAt;
    updatedAt;
    assets;
}
exports.DonorIdentityResponseDto = DonorIdentityResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '550e8400-e29b-41d4-a716-446655440000' }),
    __metadata("design:type", String)
], DonorIdentityResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '550e8400-e29b-41d4-a716-446655440000' }),
    __metadata("design:type", String)
], DonorIdentityResponseDto.prototype, "donorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ahmed Mahmoud' }),
    __metadata("design:type", String)
], DonorIdentityResponseDto.prototype, "fullNameOnId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123456789', nullable: true }),
    __metadata("design:type", Object)
], DonorIdentityResponseDto.prototype, "idNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-01-26T09:29:20.773Z' }),
    __metadata("design:type", String)
], DonorIdentityResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-01-26T09:29:20.773Z' }),
    __metadata("design:type", String)
], DonorIdentityResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [AssetResponseDto] }),
    __metadata("design:type", Array)
], DonorIdentityResponseDto.prototype, "assets", void 0);
class UserWithoutPasswordDto {
    id;
    firstName;
    lastName;
    email;
    dateOfBirth;
    role;
    country;
    phoneNumber;
    notes;
    isDeleted;
    isVerified;
    createdAt;
    updatedAt;
    verificationStatus;
}
exports.UserWithoutPasswordDto = UserWithoutPasswordDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '550e8400-e29b-41d4-a716-446655440000' }),
    __metadata("design:type", String)
], UserWithoutPasswordDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ahmed' }),
    __metadata("design:type", String)
], UserWithoutPasswordDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Mahmoud' }),
    __metadata("design:type", String)
], UserWithoutPasswordDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ahmed@example.com' }),
    __metadata("design:type", String)
], UserWithoutPasswordDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1990-05-15T00:00:00.000Z' }),
    __metadata("design:type", String)
], UserWithoutPasswordDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'DONOR' }),
    __metadata("design:type", String)
], UserWithoutPasswordDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Palestine' }),
    __metadata("design:type", String)
], UserWithoutPasswordDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+970599123456' }),
    __metadata("design:type", String)
], UserWithoutPasswordDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Notes about the donor' }),
    __metadata("design:type", String)
], UserWithoutPasswordDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], UserWithoutPasswordDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], UserWithoutPasswordDto.prototype, "isVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-01-26T09:29:20.773Z' }),
    __metadata("design:type", String)
], UserWithoutPasswordDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-01-26T09:29:20.773Z' }),
    __metadata("design:type", String)
], UserWithoutPasswordDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'pending' }),
    __metadata("design:type", String)
], UserWithoutPasswordDto.prototype, "verificationStatus", void 0);
class UpdateDonorResponseDto {
    id;
    userId;
    areasOfInterest;
    preferredCampaignTypes;
    geographicScope;
    targetAudience;
    preferredCampaignSize;
    preferredCampaignVisibility;
    createdAt;
    updatedAt;
    identity;
    user;
}
exports.UpdateDonorResponseDto = UpdateDonorResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '550e8400-e29b-41d4-a716-446655440000' }),
    __metadata("design:type", String)
], UpdateDonorResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '550e8400-e29b-41d4-a716-446655440000' }),
    __metadata("design:type", String)
], UpdateDonorResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Education and Health' }),
    __metadata("design:type", String)
], UpdateDonorResponseDto.prototype, "areasOfInterest", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Charitable and Social' }),
    __metadata("design:type", String)
], UpdateDonorResponseDto.prototype, "preferredCampaignTypes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'local' }),
    __metadata("design:type", String)
], UpdateDonorResponseDto.prototype, "geographicScope", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Children and needy families' }),
    __metadata("design:type", String)
], UpdateDonorResponseDto.prototype, "targetAudience", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10000 }),
    __metadata("design:type", Number)
], UpdateDonorResponseDto.prototype, "preferredCampaignSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Public' }),
    __metadata("design:type", String)
], UpdateDonorResponseDto.prototype, "preferredCampaignVisibility", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-01-26T09:29:20.773Z' }),
    __metadata("design:type", String)
], UpdateDonorResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-01-26T09:29:20.773Z' }),
    __metadata("design:type", String)
], UpdateDonorResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: DonorIdentityResponseDto, nullable: true }),
    __metadata("design:type", Object)
], UpdateDonorResponseDto.prototype, "identity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: UserWithoutPasswordDto }),
    __metadata("design:type", UserWithoutPasswordDto)
], UpdateDonorResponseDto.prototype, "user", void 0);
class DonorFindOneResponseDto {
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
exports.DonorFindOneResponseDto = DonorFindOneResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '5078c7d2-530a-40fd-adda-e2a762892ce3' }),
    __metadata("design:type", String)
], DonorFindOneResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ahmed' }),
    __metadata("design:type", String)
], DonorFindOneResponseDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Mahmoud' }),
    __metadata("design:type", String)
], DonorFindOneResponseDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ahmesedaaaa.mahmoud@example.com' }),
    __metadata("design:type", String)
], DonorFindOneResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'DONOR' }),
    __metadata("design:type", String)
], DonorFindOneResponseDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Palestine' }),
    __metadata("design:type", String)
], DonorFindOneResponseDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+970599123456' }),
    __metadata("design:type", String)
], DonorFindOneResponseDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'New donor interested in supporting charitable projects',
    }),
    __metadata("design:type", String)
], DonorFindOneResponseDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], DonorFindOneResponseDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], DonorFindOneResponseDto.prototype, "isVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-01-26T09:29:20.773Z' }),
    __metadata("design:type", String)
], DonorFindOneResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-01-26T09:29:20.773Z' }),
    __metadata("design:type", String)
], DonorFindOneResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'confirmed' }),
    __metadata("design:type", String)
], DonorFindOneResponseDto.prototype, "verificationStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: auth_swagger_dto_1.DonorProfileResponseDto }),
    __metadata("design:type", auth_swagger_dto_1.DonorProfileResponseDto)
], DonorFindOneResponseDto.prototype, "donorProfile", void 0);
//# sourceMappingURL=donors.swagger.dto.js.map