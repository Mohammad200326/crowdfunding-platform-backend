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
exports.UpdateCampaignCreatorSwaggerDto = exports.CampaignCreatorResponseDto = exports.CreateInstitutionCreatorDto = exports.CreateIndividualCreatorDto = exports.BaseCreatorDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class BaseCreatorDto {
    userId;
    assetIds;
}
exports.BaseCreatorDto = BaseCreatorDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '550e8400-e29b-41d4-a716-446655440000',
        description: 'Existing User ID',
    }),
    __metadata("design:type", String)
], BaseCreatorDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['asset-uuid-1', 'asset-uuid-2'],
        description: 'Array of uploaded document IDs (IDs, Licenses)',
        required: false,
        type: [String],
    }),
    __metadata("design:type", Array)
], BaseCreatorDto.prototype, "assetIds", void 0);
class CreateIndividualCreatorDto extends BaseCreatorDto {
    type;
}
exports.CreateIndividualCreatorDto = CreateIndividualCreatorDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'INDIVIDUAL',
        enum: ['INDIVIDUAL'],
        description: 'Type of creator. Individual creators do not need institution details.',
    }),
    __metadata("design:type", String)
], CreateIndividualCreatorDto.prototype, "type", void 0);
class CreateInstitutionCreatorDto extends BaseCreatorDto {
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
}
exports.CreateInstitutionCreatorDto = CreateInstitutionCreatorDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'INSTITUTION',
        enum: ['INSTITUTION'],
        description: 'Type of creator.',
    }),
    __metadata("design:type", String)
], CreateInstitutionCreatorDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Hope Foundation' }),
    __metadata("design:type", String)
], CreateInstitutionCreatorDto.prototype, "institutionName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Palestine' }),
    __metadata("design:type", String)
], CreateInstitutionCreatorDto.prototype, "institutionCountry", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Non-Profit Organization' }),
    __metadata("design:type", String)
], CreateInstitutionCreatorDto.prototype, "institutionType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2020-01-15' }),
    __metadata("design:type", String)
], CreateInstitutionCreatorDto.prototype, "institutionDateOfEstablishment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Registered NGO' }),
    __metadata("design:type", String)
], CreateInstitutionCreatorDto.prototype, "institutionLegalStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'TAX-123456' }),
    __metadata("design:type", String)
], CreateInstitutionCreatorDto.prototype, "institutionTaxIdentificationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'REG-789012' }),
    __metadata("design:type", String)
], CreateInstitutionCreatorDto.prototype, "institutionRegistrationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Doe' }),
    __metadata("design:type", String)
], CreateInstitutionCreatorDto.prototype, "institutionRepresentativeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Director' }),
    __metadata("design:type", String)
], CreateInstitutionCreatorDto.prototype, "institutionRepresentativePosition", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ID-555' }),
    __metadata("design:type", String)
], CreateInstitutionCreatorDto.prototype, "institutionRepresentativeRegistrationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://www.example.org', required: false }),
    __metadata("design:type", String)
], CreateInstitutionCreatorDto.prototype, "institutionWebsite", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '@johndoe', required: false }),
    __metadata("design:type", String)
], CreateInstitutionCreatorDto.prototype, "institutionRepresentativeSocialMedia", void 0);
class CampaignCreatorResponseDto {
    id;
    userId;
    type;
    institutionName;
    institutionCountry;
    createdAt;
}
exports.CampaignCreatorResponseDto = CampaignCreatorResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CampaignCreatorResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CampaignCreatorResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['INDIVIDUAL', 'INSTITUTION'] }),
    __metadata("design:type", String)
], CampaignCreatorResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CampaignCreatorResponseDto.prototype, "institutionName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CampaignCreatorResponseDto.prototype, "institutionCountry", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], CampaignCreatorResponseDto.prototype, "createdAt", void 0);
class UpdateCampaignCreatorSwaggerDto {
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
exports.UpdateCampaignCreatorSwaggerDto = UpdateCampaignCreatorSwaggerDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 'Palestine Hope Foundation',
        description: 'Institution name',
    }),
    __metadata("design:type", String)
], UpdateCampaignCreatorSwaggerDto.prototype, "institutionName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 'Palestine',
        description: 'Country',
    }),
    __metadata("design:type", String)
], UpdateCampaignCreatorSwaggerDto.prototype, "institutionCountry", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 'Non-Profit Organization',
        description: 'Type of institution',
    }),
    __metadata("design:type", String)
], UpdateCampaignCreatorSwaggerDto.prototype, "institutionType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: '2020-01-15',
        description: 'Date of establishment (YYYY-MM-DD)',
    }),
    __metadata("design:type", String)
], UpdateCampaignCreatorSwaggerDto.prototype, "institutionDateOfEstablishment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 'Registered NGO',
        description: 'Legal status',
    }),
    __metadata("design:type", String)
], UpdateCampaignCreatorSwaggerDto.prototype, "institutionLegalStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 'TAX-PS-123456',
        description: 'Tax identification number',
    }),
    __metadata("design:type", String)
], UpdateCampaignCreatorSwaggerDto.prototype, "institutionTaxIdentificationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 'REG-NGO-789012',
        description: 'Registration number',
    }),
    __metadata("design:type", String)
], UpdateCampaignCreatorSwaggerDto.prototype, "institutionRegistrationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 'Ahmad Hassan',
        description: 'Representative name',
    }),
    __metadata("design:type", String)
], UpdateCampaignCreatorSwaggerDto.prototype, "institutionRepresentativeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 'Executive Director',
        description: 'Representative position',
    }),
    __metadata("design:type", String)
], UpdateCampaignCreatorSwaggerDto.prototype, "institutionRepresentativePosition", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 'ID-555-2020',
        description: 'Representative registration number',
    }),
    __metadata("design:type", String)
], UpdateCampaignCreatorSwaggerDto.prototype, "institutionRepresentativeRegistrationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 'https://www.palestinehope.org',
        description: 'Institution website (can be empty string)',
    }),
    __metadata("design:type", String)
], UpdateCampaignCreatorSwaggerDto.prototype, "institutionWebsite", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: '@ahmadhassan',
        description: 'Social media handle',
    }),
    __metadata("design:type", String)
], UpdateCampaignCreatorSwaggerDto.prototype, "institutionRepresentativeSocialMedia", void 0);
//# sourceMappingURL=create-campaign-creator.swagger.dto.js.map