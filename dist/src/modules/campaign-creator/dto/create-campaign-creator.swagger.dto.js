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
exports.UpdateCampaignCreatorRequestDto = exports.CreateCreatorResponseWrapper = exports.CampaignCreatorResponseDto = exports.CreateCampaignCreatorRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateCampaignCreatorRequestDto {
    userId;
    type;
    assetIds;
    institutionName;
    institutionCountry;
    institutionType;
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
exports.CreateCampaignCreatorRequestDto = CreateCampaignCreatorRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '550e8400-e29b-41d4-a716-446655440000',
        description: 'Existing User ID',
    }),
    __metadata("design:type", String)
], CreateCampaignCreatorRequestDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'INSTITUTION',
        enum: ['INDIVIDUAL', 'INSTITUTION'],
        description: 'Type of creator: INDIVIDUAL or INSTITUTION',
    }),
    __metadata("design:type", String)
], CreateCampaignCreatorRequestDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['asset-uuid-1', 'asset-uuid-2'],
        description: 'Array of asset IDs (uploaded documents like licenses, ID photos, certificates)',
        required: false,
        type: [String],
    }),
    __metadata("design:type", Array)
], CreateCampaignCreatorRequestDto.prototype, "assetIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Hope Foundation',
        description: 'Name of the institution (required for INSTITUTION type)',
        required: false,
    }),
    __metadata("design:type", String)
], CreateCampaignCreatorRequestDto.prototype, "institutionName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Palestine',
        description: 'Country where institution is located (required for INSTITUTION type)',
        required: false,
    }),
    __metadata("design:type", String)
], CreateCampaignCreatorRequestDto.prototype, "institutionCountry", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Non-Profit Organization',
        description: 'Type of institution (required for INSTITUTION type)',
        required: false,
    }),
    __metadata("design:type", String)
], CreateCampaignCreatorRequestDto.prototype, "institutionType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2020-01-15',
        format: 'date',
        description: 'Date when institution was established (required for INSTITUTION type)',
        required: false,
    }),
    __metadata("design:type", String)
], CreateCampaignCreatorRequestDto.prototype, "institutionDateOfEstablishment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Registered NGO',
        description: 'Legal status of institution (required for INSTITUTION type)',
        required: false,
    }),
    __metadata("design:type", String)
], CreateCampaignCreatorRequestDto.prototype, "institutionLegalStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'TAX-123456',
        description: 'Tax identification number (required for INSTITUTION type)',
        required: false,
    }),
    __metadata("design:type", String)
], CreateCampaignCreatorRequestDto.prototype, "institutionTaxIdentificationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'REG-789012',
        description: 'Registration number (required for INSTITUTION type)',
        required: false,
    }),
    __metadata("design:type", String)
], CreateCampaignCreatorRequestDto.prototype, "institutionRegistrationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'John Doe',
        description: 'Name of institutional representative (required for INSTITUTION type)',
        required: false,
    }),
    __metadata("design:type", String)
], CreateCampaignCreatorRequestDto.prototype, "institutionRepresentativeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Director',
        description: 'Position of representative (required for INSTITUTION type)',
        required: false,
    }),
    __metadata("design:type", String)
], CreateCampaignCreatorRequestDto.prototype, "institutionRepresentativePosition", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ID-555',
        description: 'Registration number of representative (required for INSTITUTION type)',
        required: false,
    }),
    __metadata("design:type", String)
], CreateCampaignCreatorRequestDto.prototype, "institutionRepresentativeRegistrationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://www.example.org',
        description: 'Official institution website',
        required: false,
    }),
    __metadata("design:type", String)
], CreateCampaignCreatorRequestDto.prototype, "institutionWebsite", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '@johndoe',
        description: "Representative's social media handle",
        required: false,
    }),
    __metadata("design:type", String)
], CreateCampaignCreatorRequestDto.prototype, "institutionRepresentativeSocialMedia", void 0);
class UserInfo {
    id;
    firstName;
    lastName;
    email;
    role;
    country;
    phoneNumber;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user-uuid-123' }),
    __metadata("design:type", String)
], UserInfo.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John' }),
    __metadata("design:type", String)
], UserInfo.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Doe' }),
    __metadata("design:type", String)
], UserInfo.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john@example.com' }),
    __metadata("design:type", String)
], UserInfo.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'CAMPAIGN_CREATOR' }),
    __metadata("design:type", String)
], UserInfo.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Palestine', required: false }),
    __metadata("design:type", String)
], UserInfo.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+970123456789', required: false }),
    __metadata("design:type", String)
], UserInfo.prototype, "phoneNumber", void 0);
class AssetInfo {
    id;
    url;
    fileType;
    kind;
    createdAt;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'asset-uuid-1' }),
    __metadata("design:type", String)
], AssetInfo.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/license.pdf' }),
    __metadata("design:type", String)
], AssetInfo.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'application/pdf' }),
    __metadata("design:type", String)
], AssetInfo.prototype, "fileType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'INSTITUTION_COMMERCIAL_LICENSE' }),
    __metadata("design:type", String)
], AssetInfo.prototype, "kind", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-01-30T10:00:00.000Z' }),
    __metadata("design:type", Date)
], AssetInfo.prototype, "createdAt", void 0);
class CampaignCreatorResponseDto {
    id;
    userId;
    type;
    institutionName;
    institutionCountry;
    institutionType;
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
    user;
    assets;
}
exports.CampaignCreatorResponseDto = CampaignCreatorResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'creator-uuid-123' }),
    __metadata("design:type", String)
], CampaignCreatorResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user-uuid-123' }),
    __metadata("design:type", String)
], CampaignCreatorResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'INSTITUTION', enum: ['INDIVIDUAL', 'INSTITUTION'] }),
    __metadata("design:type", String)
], CampaignCreatorResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Hope Foundation' }),
    __metadata("design:type", String)
], CampaignCreatorResponseDto.prototype, "institutionName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Palestine' }),
    __metadata("design:type", String)
], CampaignCreatorResponseDto.prototype, "institutionCountry", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Non-Profit Organization' }),
    __metadata("design:type", String)
], CampaignCreatorResponseDto.prototype, "institutionType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2020-01-15T00:00:00.000Z' }),
    __metadata("design:type", Date)
], CampaignCreatorResponseDto.prototype, "institutionDateOfEstablishment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Registered NGO' }),
    __metadata("design:type", String)
], CampaignCreatorResponseDto.prototype, "institutionLegalStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'TAX-123456' }),
    __metadata("design:type", String)
], CampaignCreatorResponseDto.prototype, "institutionTaxIdentificationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'REG-789012' }),
    __metadata("design:type", String)
], CampaignCreatorResponseDto.prototype, "institutionRegistrationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Doe' }),
    __metadata("design:type", String)
], CampaignCreatorResponseDto.prototype, "institutionRepresentativeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Director' }),
    __metadata("design:type", String)
], CampaignCreatorResponseDto.prototype, "institutionRepresentativePosition", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ID-555' }),
    __metadata("design:type", String)
], CampaignCreatorResponseDto.prototype, "institutionRepresentativeRegistrationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://www.example.org' }),
    __metadata("design:type", String)
], CampaignCreatorResponseDto.prototype, "institutionWebsite", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '@johndoe' }),
    __metadata("design:type", String)
], CampaignCreatorResponseDto.prototype, "institutionRepresentativeSocialMedia", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-01-30T10:00:00.000Z' }),
    __metadata("design:type", Date)
], CampaignCreatorResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-01-30T10:00:00.000Z' }),
    __metadata("design:type", Date)
], CampaignCreatorResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Associated user information',
        type: UserInfo,
    }),
    __metadata("design:type", UserInfo)
], CampaignCreatorResponseDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Linked assets (documents, certificates, IDs)',
        type: [AssetInfo],
    }),
    __metadata("design:type", Array)
], CampaignCreatorResponseDto.prototype, "assets", void 0);
class CreateCreatorResponseWrapper {
    message;
    creator;
}
exports.CreateCreatorResponseWrapper = CreateCreatorResponseWrapper;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Campaign creator profile created successfully' }),
    __metadata("design:type", String)
], CreateCreatorResponseWrapper.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: CampaignCreatorResponseDto }),
    __metadata("design:type", CampaignCreatorResponseDto)
], CreateCreatorResponseWrapper.prototype, "creator", void 0);
class UpdateCampaignCreatorRequestDto {
    institutionName;
    institutionCountry;
    institutionType;
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
exports.UpdateCampaignCreatorRequestDto = UpdateCampaignCreatorRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Hope Foundation', required: false }),
    __metadata("design:type", String)
], UpdateCampaignCreatorRequestDto.prototype, "institutionName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Palestine', required: false }),
    __metadata("design:type", String)
], UpdateCampaignCreatorRequestDto.prototype, "institutionCountry", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Non-Profit Organization', required: false }),
    __metadata("design:type", String)
], UpdateCampaignCreatorRequestDto.prototype, "institutionType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2020-01-15', format: 'date', required: false }),
    __metadata("design:type", String)
], UpdateCampaignCreatorRequestDto.prototype, "institutionDateOfEstablishment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Registered NGO', required: false }),
    __metadata("design:type", String)
], UpdateCampaignCreatorRequestDto.prototype, "institutionLegalStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'TAX-123456', required: false }),
    __metadata("design:type", String)
], UpdateCampaignCreatorRequestDto.prototype, "institutionTaxIdentificationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'REG-789012', required: false }),
    __metadata("design:type", String)
], UpdateCampaignCreatorRequestDto.prototype, "institutionRegistrationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Doe', required: false }),
    __metadata("design:type", String)
], UpdateCampaignCreatorRequestDto.prototype, "institutionRepresentativeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Director', required: false }),
    __metadata("design:type", String)
], UpdateCampaignCreatorRequestDto.prototype, "institutionRepresentativePosition", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ID-555', required: false }),
    __metadata("design:type", String)
], UpdateCampaignCreatorRequestDto.prototype, "institutionRepresentativeRegistrationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://www.example.org', required: false }),
    __metadata("design:type", String)
], UpdateCampaignCreatorRequestDto.prototype, "institutionWebsite", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '@johndoe', required: false }),
    __metadata("design:type", String)
], UpdateCampaignCreatorRequestDto.prototype, "institutionRepresentativeSocialMedia", void 0);
//# sourceMappingURL=create-campaign-creator.swagger.dto.js.map