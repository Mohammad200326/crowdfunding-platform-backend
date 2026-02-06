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
exports.CreateCreatorResponseWrapper = exports.CampaignCreatorResponseDto = exports.CreateCampaignCreatorRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateCampaignCreatorRequestDto {
    userId;
    type;
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
    (0, swagger_1.ApiProperty)({ example: 'INSTITUTION', enum: ['INDIVIDUAL', 'INSTITUTION'] }),
    __metadata("design:type", String)
], CreateCampaignCreatorRequestDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Palestine' }),
    __metadata("design:type", String)
], CreateCampaignCreatorRequestDto.prototype, "institutionCountry", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Non-Profit Organization', required: false }),
    __metadata("design:type", String)
], CreateCampaignCreatorRequestDto.prototype, "institutionType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2020-01-15', format: 'date', required: false }),
    __metadata("design:type", String)
], CreateCampaignCreatorRequestDto.prototype, "institutionDateOfEstablishment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Registered NGO', required: false }),
    __metadata("design:type", String)
], CreateCampaignCreatorRequestDto.prototype, "institutionLegalStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'TAX-123456', required: false }),
    __metadata("design:type", String)
], CreateCampaignCreatorRequestDto.prototype, "institutionTaxIdentificationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'REG-789012', required: false }),
    __metadata("design:type", String)
], CreateCampaignCreatorRequestDto.prototype, "institutionRegistrationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Name Surname', required: false }),
    __metadata("design:type", String)
], CreateCampaignCreatorRequestDto.prototype, "institutionRepresentativeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Director', required: false }),
    __metadata("design:type", String)
], CreateCampaignCreatorRequestDto.prototype, "institutionRepresentativePosition", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ID-555', required: false }),
    __metadata("design:type", String)
], CreateCampaignCreatorRequestDto.prototype, "institutionRepresentativeRegistrationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://www.example.org', required: false }),
    __metadata("design:type", String)
], CreateCampaignCreatorRequestDto.prototype, "institutionWebsite", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '@johndoe', required: false }),
    __metadata("design:type", String)
], CreateCampaignCreatorRequestDto.prototype, "institutionRepresentativeSocialMedia", void 0);
class CampaignCreatorResponseDto {
    id;
    userId;
    type;
    institutionCountry;
    createdAt;
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
    (0, swagger_1.ApiProperty)({ example: 'INSTITUTION' }),
    __metadata("design:type", String)
], CampaignCreatorResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Palestine' }),
    __metadata("design:type", String)
], CampaignCreatorResponseDto.prototype, "institutionCountry", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-01-30T10:00:00.000Z' }),
    __metadata("design:type", String)
], CampaignCreatorResponseDto.prototype, "createdAt", void 0);
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
//# sourceMappingURL=create-campaign-creator.swagger.dto.js.map